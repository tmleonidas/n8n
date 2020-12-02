import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	linkFields,
	linkOperations
} from './LinkDescription';

import {
	bitlyApiRequest,
	bitlyApiRequestAllItems,
} from './GenericFunctions';

export class Bitly implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bitly',
		name: 'bitly',
		icon: 'file:bitly.png',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Bitly API',
		defaults: {
			name: 'Bitly',
			color: '#d3643b',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'bitlyApi',
				required: true,
				displayOptions: {
					show: {
						authentication: [
							'accessToken',
						],
					},
				},
			},
			{
				name: 'bitlyOAuth2Api',
				required: true,
				displayOptions: {
					show: {
						authentication: [
							'oAuth2',
						],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Access Token',
						value: 'accessToken',
					},
					{
						name: 'OAuth2',
						value: 'oAuth2',
					},
				],
				default: 'accessToken',
				description: 'The resource to operate on.',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: ' Link',
						value: 'link',
					},
				],
				default: 'link',
				description: 'Resource to consume.',
			},
			...linkOperations,
			...linkFields,
		],
	};

	methods = {
		loadOptions: {
			// Get all the available groups to display them to user so that he can
			// select them easily
			async getGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const groups = await bitlyApiRequestAllItems.call(this, 'groups', 'GET', '/groups');
				for (const group of groups) {
					const groupName = group.name;
					const groupId = group.guid;
					returnData.push({
						name: groupName,
						value: groupId,
					});
				}
				return returnData;
			},
			// Get all the available tags to display them to user so that he can
			// select them easily
			async getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const groupId = this.getCurrentNodeParameter('group') as string;
				const returnData: INodePropertyOptions[] = [];
				const tags = await bitlyApiRequestAllItems.call(this, 'tags', 'GET', `groups/${groupId}/tags`);
				for (const tag of tags) {
					const tagName = tag;
					const tagId = tag;
					returnData.push({
						name: tagName,
						value: tagId,
					});
				}
				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const length = items.length as unknown as number;
		const qs: IDataObject = {};
		let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		for (let i = 0; i < length; i++) {
			if (resource === 'link') {
				if (operation === 'create') {
					const longUrl = this.getNodeParameter('longUrl', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const body: IDataObject = {
						long_url: longUrl,
					};
					if (additionalFields.title) {
						body.title = additionalFields.title as string;
					}
					if (additionalFields.domain) {
						body.domain = additionalFields.domain as string;
					}
					if (additionalFields.group) {
						body.group = additionalFields.group as string;
					}
					if (additionalFields.tags) {
						body.tags = additionalFields.tags as string[];
					}
					const deeplinks = (this.getNodeParameter('deeplink', i) as IDataObject).deeplinkUi as IDataObject[];
					if (deeplinks) {
						for (const deeplink of deeplinks) {
							//@ts-ignore
							body.deeplinks.push({
								app_uri_path: deeplink.appUriPath,
								install_type: deeplink.installType,
								install_url: deeplink.installUrl,
								app_id: deeplink.appId,
							});
						}
					}
					responseData = await bitlyApiRequest.call(this, 'POST', '/bitlinks', body);
				}
				if (operation === 'update') {
					const linkId = this.getNodeParameter('id', i) as string;
					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
					const body: IDataObject = {};
					if (updateFields.longUrl) {
						body.long_url = updateFields.longUrl as string;
					}
					if (updateFields.title) {
						body.title = updateFields.title as string;
					}
					if (updateFields.archived !== undefined) {
						body.archived = updateFields.archived as boolean;
					}
					if (updateFields.group) {
						body.group = updateFields.group as string;
					}
					if (updateFields.tags) {
						body.tags = updateFields.tags as string[];
					}
					const deeplinks = (this.getNodeParameter('deeplink', i) as IDataObject).deeplinkUi as IDataObject[];
					if (deeplinks) {
						for (const deeplink of deeplinks) {
							//@ts-ignore
							body.deeplinks.push({
								app_uri_path: deeplink.appUriPath,
								install_type: deeplink.installType,
								install_url: deeplink.installUrl,
								app_id: deeplink.appId,
							});
						}
					}
					responseData = await bitlyApiRequest.call(this, 'PATCH', `/bitlinks/${linkId}`, body);
				}
				if (operation === 'get') {
					const linkId = this.getNodeParameter('id', i) as string;
					responseData = await bitlyApiRequest.call(this, 'GET', `/bitlinks/${linkId}`);
				}
			}
			if (Array.isArray(responseData)) {
				returnData.push.apply(returnData, responseData as IDataObject[]);
			} else {
				returnData.push(responseData as IDataObject);
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
