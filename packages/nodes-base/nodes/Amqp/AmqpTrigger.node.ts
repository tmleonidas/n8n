import { ContainerOptions } from 'rhea';

import { ITriggerFunctions } from 'n8n-core';
import {
	IDataObject,
	INodeType,
	INodeTypeDescription,
	ITriggerResponse,
} from 'n8n-workflow';


export class AmqpTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AMQP Trigger',
		name: 'amqpTrigger',
		icon: 'file:amqp.png',
		group: ['trigger'],
		version: 1,
		description: 'Listens to AMQP 1.0 Messages',
		defaults: {
			name: 'AMQP Trigger',
			color: '#00FF00',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [{
			name: 'amqp',
			required: true,
		}],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Queue / Topic',
				name: 'sink',
				type: 'string',
				default: '',
				placeholder: 'topic://sourcename.something',
				description: 'name of the queue of topic to listen to',
			},
			{
				displayName: 'Clientname',
				name: 'clientname',
				type: 'string',
				default: '',
				placeholder: 'for durable/persistent topic subscriptions, example: "n8n"',
				description: 'Leave empty for non-durable topic subscriptions or queues. ',
			},
			{
				displayName: 'Subscription',
				name: 'subscription',
				type: 'string',
				default: '',
				placeholder: 'for durable/persistent topic subscriptions, example: "order-worker"',
				description: 'Leave empty for non-durable topic subscriptions or queues',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Convert Body To String',
						name: 'jsonConvertByteArrayToString',
						type: 'boolean',
						default: false,
						description: 'Convert JSON Body content (["body"]["content"]) from Byte Array to string. Needed for Azure Service Bus.',
					},
					{
						displayName: 'JSON Parse Body',
						name: 'jsonParseBody',
						type: 'boolean',
						default: false,
						description: 'Parse the body to an object.',
					},
					{
						displayName: 'Only Body',
						name: 'onlyBody',
						type: 'boolean',
						default: false,
						description: 'Returns only the body property.',
					},
					{
						displayName: 'Messages per Cicle',
						name: 'pullMessagesNumber',
						type: 'number',
						default: 100,
						description: 'Number of messages to pull from the bus for every cicle',
					},
					{
						displayName: 'Sleep Time',
						name: 'sleepTime',
						type: 'number',
						default: 10,
						description: 'Milliseconds to sleep after every cicle.',
					},
				],
			},
		],
	};


	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {

		const credentials = this.getCredentials('amqp');
		if (!credentials) {
			throw new Error('Credentials are mandatory!');
		}

		const sink = this.getNodeParameter('sink', '') as string;
		const clientname = this.getNodeParameter('clientname', '') as string;
		const subscription = this.getNodeParameter('subscription', '') as string;
		const options = this.getNodeParameter('options', {}) as IDataObject;
		const pullMessagesNumber = options.pullMessagesNumber || 100;

		if (sink === '') {
			throw new Error('Queue or Topic required!');
		}

		let durable = false;

		if (subscription && clientname) {
			durable = true;
		}

		const container = require('rhea');
		const connectOptions: ContainerOptions = {
			host: credentials.hostname,
			hostname: credentials.hostname,
			port: credentials.port,
			reconnect: true,		// this id the default anyway
			reconnect_limit: 50,	// try for max 50 times, based on a back-off algorithm
			container_id: (durable ? clientname : null),
		};
		if (credentials.username || credentials.password) {
			// Old rhea implementation. not shure if it is neccessary
			container.options.username = credentials.username;
			container.options.password = credentials.password;
			connectOptions.username = credentials.username;
			connectOptions.password = credentials.password;
		}
		if (credentials.transportType) {
			connectOptions.transport = credentials.transportType;
		}

		let lastMsgId: number | undefined = undefined;
		const self = this;

		container.on('receiver_open', (context: any) => { // tslint:disable-line:no-any
			context.receiver.add_credit(pullMessagesNumber);
		});

		container.on('message', (context: any) => { // tslint:disable-line:no-any
			// ignore duplicate message check, don't think it's necessary, but it was in the rhea-lib example code
			if (context.message.message_id && context.message.message_id === lastMsgId) {
				return;
			}
			lastMsgId = context.message.message_id;

			let data = context.message;

			if (options.jsonConvertByteArrayToString === true && data.body.content !== undefined) {
				// The buffer is not ready... Stringify and parse back to load it.
				const cont = JSON.stringify(data.body.content);
				data.body = String.fromCharCode.apply(null, JSON.parse(cont).data);
			}

			if (options.jsonConvertByteArrayToString === true && data.body.content !== undefined) {
				// The buffer is not ready... Stringify and parse back to load it.
				const content = JSON.stringify(data.body.content);
				data.body = String.fromCharCode.apply(null, JSON.parse(content).data);
			}

			if (options.jsonParseBody === true) {
				data.body = JSON.parse(data.body);
			}
			if (options.onlyBody === true) {
				data = data.body;
			}


			self.emit([self.helpers.returnJsonArray([data])]);

			if (context.receiver.credit === 0) {
				setTimeout(() => {
					context.receiver.add_credit(pullMessagesNumber);
				}, options.sleepTime as number || 10);
			}
		});

		const connection = container.connect(connectOptions);
		let clientOptions = undefined;
		if (durable) {
			clientOptions = {
				name: subscription,
				source: {
					address: sink,
					durable: 2,
					expiry_policy: 'never',
				},
				credit_window: 0,	// prefetch 1
			};
		} else {
			clientOptions = {
				source: {
					address: sink,
				},
				credit_window: 0,	// prefetch 1
			};
		}
		connection.open_receiver(clientOptions);


		// The "closeFunction" function gets called by n8n whenever
		// the workflow gets deactivated and can so clean up.
		async function closeFunction() {
			container.removeAllListeners('receiver_open');
			container.removeAllListeners('message');
			connection.close();
		}

		// The "manualTriggerFunction" function gets called by n8n
		// when a user is in the workflow editor and starts the
		// workflow manually.
		// for AMQP it doesn't make much sense to wait here but
		// for a new user who doesn't know how this works, it's better to wait and show a respective info message
		async function manualTriggerFunction() {
			await new Promise((resolve, reject) => {
				const timeoutHandler = setTimeout(() => {
					reject(new Error('Aborted, no message received within 30secs. This 30sec timeout is only set for "manually triggered execution". Active Workflows will listen indefinitely.'));
				}, 30000);
				container.on('message', (context: any) => { // tslint:disable-line:no-any
					// Check if the only property present in the message is body
					// in which case we only emit the content of the body property
					// otherwise we emit all properties and their content
					if (Object.keys(context.message)[0] === 'body' && Object.keys(context.message).length === 1) {
						self.emit([self.helpers.returnJsonArray([context.message.body])]);
					} else {
						self.emit([self.helpers.returnJsonArray([context.message])]);
					}
					clearTimeout(timeoutHandler);
					resolve(true);
				});
			});
		}

		return {
			closeFunction,
			manualTriggerFunction,
		};

	}
}
