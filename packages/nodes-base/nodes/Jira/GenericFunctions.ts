import {
	OptionsWithUri,
 } from 'request';

import {
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-core';

import {
	ICredentialDataDecryptedObject,
	IDataObject,
} from 'n8n-workflow';

export async function jiraSoftwareCloudApiRequest(this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions, endpoint: string, method: string, body: any = {}, query?: IDataObject, uri?: string): Promise<any> { // tslint:disable-line:no-any
	let data; let domain;

	const jiraVersion = this.getNodeParameter('jiraVersion', 0) as string;

	let jiraCredentials: ICredentialDataDecryptedObject | undefined;
	if (jiraVersion === 'server') {
		jiraCredentials = this.getCredentials('jiraSoftwareServerApi');
	} else {
		jiraCredentials = this.getCredentials('jiraSoftwareCloudApi');
	}

	if (jiraCredentials === undefined) {
		throw new Error('No credentials got returned!');
	}

	if (jiraVersion === 'server') {
		domain = jiraCredentials!.domain;
		data = Buffer.from(`${jiraCredentials!.email}:${jiraCredentials!.password}`).toString('base64');
	} else {
		domain = jiraCredentials!.domain;
		data = Buffer.from(`${jiraCredentials!.email}:${jiraCredentials!.apiToken}`).toString('base64');
	}

	const options: OptionsWithUri = {
		headers: {
			Authorization: `Basic ${data}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method,
		qs: query,
		uri: uri || `${domain}/rest${endpoint}`,
		body,
		json: true,
	};

	try {
		return await this.helpers.request!(options);
	} catch (error) {

		let errorMessage = error.message;

		if (error.response.body) {
			if (error.response.body.errorMessages && error.response.body.errorMessages.length) {
				errorMessage = JSON.stringify(error.response.body.errorMessages);
			} else {
				errorMessage = error.response.body.message || error.response.body.error || error.response.body.errors || error.message;
			}
		}

		if (typeof errorMessage !== 'string') {
			errorMessage = JSON.stringify(errorMessage);
		}

		throw new Error(`Jira error response [${error.statusCode}]: ${errorMessage}`);
	}
}

export async function jiraSoftwareCloudApiRequestAllItems(this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions, propertyName: string, endpoint: string, method: string, body: any = {}, query: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any

	const returnData: IDataObject[] = [];

	let responseData;

	query.startAt = 0;
	body.startAt = 0;
	query.maxResults = 100;
	body.maxResults  = 100;

	do {
		responseData = await jiraSoftwareCloudApiRequest.call(this, endpoint, method, body, query);
		returnData.push.apply(returnData, responseData[propertyName]);
		query.startAt = responseData.startAt + responseData.maxResults;
		body.startAt = responseData.startAt + responseData.maxResults;
	} while (
		(responseData.startAt + responseData.maxResults < responseData.total)
	);

	return returnData;
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

export function eventExists (currentEvents : string[], webhookEvents: string[]) {
	for (const currentEvent of currentEvents) {
		if (!webhookEvents.includes(currentEvent)) {
			return false;
		}
	}
	return true;
}

export function getId (url: string) {
	return url.split('/').pop();
}

export const allEvents = [
	'board_created',
	'board_updated',
	'board_deleted',
	'board_configuration_changed',
	'comment_created',
	'comment_updated',
	'comment_deleted',
	'jira:issue_created',
	'jira:issue_updated',
	'jira:issue_deleted',
	'option_voting_changed',
	'option_watching_changed',
	'option_unassigned_issues_changed',
	'option_subtasks_changed',
	'option_attachments_changed',
	'option_issuelinks_changed',
	'option_timetracking_changed',
	'project_created',
	'project_updated',
	'project_deleted',
	'sprint_created',
	'sprint_deleted',
	'sprint_updated',
	'sprint_started',
	'sprint_closed',
	'user_created',
	'user_updated',
	'user_deleted',
	'jira:version_released',
	'jira:version_unreleased',
	'jira:version_created',
	'jira:version_moved',
	'jira:version_updated',
	'jira:version_deleted',
	'issuelink_created',
	'issuelink_deleted',
	'worklog_created',
	'worklog_updated',
	'worklog_deleted',
];
