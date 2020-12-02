import { OptionsWithUri } from 'request';

import {
	BINARY_ENCODING,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
} from 'n8n-core';

import {
	IDataObject,
} from 'n8n-workflow';

export async function payPalApiRequest(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions | IWebhookFunctions, endpoint: string, method: string, body: any = {}, query?: IDataObject, uri?: string): Promise<any> { // tslint:disable-line:no-any
	const credentials = this.getCredentials('payPalApi');
	const env = getEnviroment(credentials!.env as string);
	const tokenInfo =  await getAccessToken.call(this);
	const headerWithAuthentication = Object.assign({ },
		{ Authorization: `Bearer ${tokenInfo.access_token}`, 'Content-Type': 'application/json' });
	const options = {
		headers: headerWithAuthentication,
		method,
		qs: query || {},
		uri: uri || `${env}/v1${endpoint}`,
		body,
		json: true,
	};
	try {
		return await this.helpers.request!(options);
	} catch (error) {

		if (error.response.body) {
			let errorMessage = error.response.body.message;
			if (error.response.body.details) {
				errorMessage += ` - Details: ${JSON.stringify(error.response.body.details)}`;
			}
			throw new Error(errorMessage);
		}

		throw error;
	}
}

function getEnviroment(env: string): string {
	// @ts-ignore
	return {
		'sanbox': 'https://api.sandbox.paypal.com',
		'live': 'https://api.paypal.com',
	}[env];
}

async function getAccessToken(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions | IWebhookFunctions): Promise<any> { // tslint:disable-line:no-any
	const credentials = this.getCredentials('payPalApi');
	if (credentials === undefined) {
		throw new Error('No credentials got returned!');
	}
	const env = getEnviroment(credentials!.env as string);
	const data = Buffer.from(`${credentials!.clientId}:${credentials!.secret}`).toString(BINARY_ENCODING);
	const headerWithAuthentication = Object.assign({},
		{ Authorization: `Basic ${data}`, 'Content-Type': 'application/x-www-form-urlencoded' });
		const options: OptionsWithUri = {
			headers: headerWithAuthentication,
			method: 'POST',
			form: {
				grant_type: 'client_credentials',
			},
			uri: `${env}/v1/oauth2/token`,
			json: true,
		};
	try {
		return await this.helpers.request!(options);
	} catch (error) {
		const errorMessage = error.response.body.message || error.response.body.Message;

		if (errorMessage !== undefined) {
			throw new Error(errorMessage);
		}
		throw new Error(error.response.body);
	}
}

/**
 * Make an API request to paginated paypal endpoint
 * and return all results
 */
export async function payPalApiRequestAllItems(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, propertyName: string, endpoint: string, method: string, body: any = {}, query?: IDataObject, uri?: string): Promise<any> { // tslint:disable-line:no-any

	const returnData: IDataObject[] = [];

	let responseData;

	query!.page_size = 1000;

	do {
		responseData = await payPalApiRequest.call(this, endpoint, method, body, query, uri);
		uri = getNext(responseData.links);
		returnData.push.apply(returnData, responseData[propertyName]);
	} while (
		getNext(responseData.links) !== undefined
	);

	return returnData;
}

function getNext(links: IDataObject[]): string | undefined {
	for (const link of links) {
		if (link.rel === 'next') {
			return link.href as string;
		}
	}
	return undefined;
}

export function validateJSON(json: string | undefined): any { // tslint:disable-line:no-any
	let result;
	try {
		result = JSON.parse(json!);
	} catch (exception) {
		result = '';
	}
	return result;
}

export function upperFist(s: string): string {
	return s.split('.').map(e => {
		return e.toLowerCase().charAt(0).toUpperCase() + e.toLowerCase().slice(1);
	}).join(' ');
}
