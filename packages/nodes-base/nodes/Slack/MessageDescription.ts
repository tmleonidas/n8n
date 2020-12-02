import { INodeProperties } from 'n8n-workflow';

export const messageOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'message',
				],
			},
		},
		options: [
			{
				name: 'Post',
				value: 'post',
				description: 'Post a message into a channel',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Updates a message.',
			},
		],
		default: 'post',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const messageFields = [

/* -------------------------------------------------------------------------- */
/*                                message:post                                */
/* -------------------------------------------------------------------------- */
	{
		displayName: 'Channel',
		name: 'channel',
		type: 'string',
		default: '',
		placeholder: 'Channel name',
		displayOptions: {
			show: {
				operation: [
					'post',
				],
				resource: [
					'message',
				],
			},
		},
		required: true,
		description: 'The channel to send the message to.',
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
		default: '',
		displayOptions: {
			show: {
				operation: [
					'post',
				],
				resource: [
					'message',
				],
			},
		},
		description: 'The text to send.',
	},
	{
		displayName: 'As User',
		name: 'as_user',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				authentication: [
					'accessToken',
				],
				operation: [
					'post',
				],
				resource: [
					'message',
				],
			},
		},
		description: 'Post the message as authenticated user instead of bot. Works only with user token.',
	},
	{
		displayName: 'User Name',
		name: 'username',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				as_user: [
					false,
				],
				operation: [
					'post',
				],
				resource: [
					'message',
				],
			},
		},
		description: 'Set the bot\'s user name. This field will be ignored if you are using a user token.',
	},
	{
		displayName: 'JSON parameters',
		name: 'jsonParameters',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				operation: [
					'post',
				],
				resource: [
					'message',
				],
			},
		},
	},
	{
		displayName: 'Attachments',
		name: 'attachments',
		type: 'collection',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add attachment',
		},
		displayOptions: {
			show: {
				operation: [
					'post',
				],
				resource: [
					'message',
				],
			},
		},
		default: {}, // TODO: Remove comment: has to make default array for the main property, check where that happens in UI
		description: 'The attachment to add',
		placeholder: 'Add attachment item',
		options: [
			{
				displayName: 'Fallback Text',
				name: 'fallback',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Required plain-text summary of the attachment.',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Text to send.',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Title of the message.',
			},
			{
				displayName: 'Title Link',
				name: 'title_link',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Link of the title.',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#ff0000',
				description: 'Color of the line left of text.',
			},
			{
				displayName: 'Pretext',
				name: 'pretext',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Text which appears before the message block.',
			},
			{
				displayName: 'Author Name',
				name: 'author_name',
				type: 'string',
				default: '',
				description: 'Name that should appear.',
			},
			{
				displayName: 'Author Link',
				name: 'author_link',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Link for the author.',
			},
			{
				displayName: 'Author Icon',
				name: 'author_icon',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Icon which should appear for the user.',
			},
			{
				displayName: 'Image URL',
				name: 'image_url',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'URL of image.',
			},
			{
				displayName: 'Thumbnail URL',
				name: 'thumb_url',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'URL of thumbnail.',
			},
			{
				displayName: 'Footer',
				name: 'footer',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Text of footer to add.',
			},
			{
				displayName: 'Footer Icon',
				name: 'footer_icon',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Icon which should appear next to footer.',
			},
			{
				displayName: 'Timestamp',
				name: 'ts',
				type: 'dateTime',
				default: '',
				description: 'Time message relates to.',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				placeholder: 'Add Fields',
				description: 'Fields to add to message.',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						name: 'item',
						displayName: 'Item',
						values: [
							{
								displayName: 'Title',
								name: 'title',
								type: 'string',
								default: '',
								description: 'Title of the item.',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value of the item.',
							},
							{
								displayName: 'Short',
								name: 'short',
								type: 'boolean',
								default: true,
								description: 'If items can be displayed next to each other.',
							},
						],
					},
				],
			},
		],
	},
	{
		displayName: 'Other Options',
		name: 'otherOptions',
		type: 'collection',
		displayOptions: {
			show: {
				operation: [
					'post',
				],
				resource: [
					'message',
				],
			},
		},
		default: {},
		description: 'Other options to set',
		placeholder: 'Add options',
		options: [
			{
				displayName: 'Icon Emoji',
				name: 'icon_emoji',
				type: 'string',
				displayOptions: {
					show: {
						'/as_user': [
							false,
						],
						'/operation': [
							'post',
						],
						'/resource': [
							'message',
						],
					},
				},
				default: '',
				description: 'Emoji to use as the icon for this message. Overrides icon_url.',
			},
			{
				displayName: 'Icon URL',
				name: 'icon_url',
				type: 'string',
				displayOptions: {
					show: {
						'/as_user': [
							false,
						],
						'/operation': [
							'post',
						],
						'/resource': [
							'message',
						],
					},
				},
				default: '',
				description: 'URL to an image to use as the icon for this message.',
			},
			{
				displayName: 'Make Reply',
				name: 'thread_ts',
				type: 'string',
				default: '',
				description: 'Provide another message\'s ts value to make this message a reply.',
			},
			{
				displayName: 'Unfurl Links',
				name: 'unfurl_links',
				type: 'boolean',
				default: false,
				description: 'Pass true to enable unfurling of primarily text-based content.',
			},
			{
				displayName: 'Unfurl Media',
				name: 'unfurl_media',
				type: 'boolean',
				default: true,
				description: 'Pass false to disable unfurling of media content.',
			},
			{
				displayName: 'Markdown',
				name: 'mrkdwn',
				type: 'boolean',
				default: true,
				description: 'Use Slack Markdown parsing.',
			},
			{
				displayName: 'Reply Broadcast',
				name: 'reply_broadcast',
				type: 'boolean',
				default: false,
				description: 'Used in conjunction with thread_ts and indicates whether reply should be made visible to everyone in the channel or conversation.',
			},
			{
				displayName: 'Link Names',
				name: 'link_names',
				type: 'boolean',
				default: false,
				description: 'Find and link channel names and usernames.',
			},
		],
	},
/* ----------------------------------------------------------------------- */
/*                                 message:update                          */
/* ----------------------------------------------------------------------- */
	{
		displayName: 'Channel',
		name: 'channelId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getChannels',
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'update',
				],
			},
		},
		description: 'Channel containing the message to be updated.',
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'update',
				],
			},
		},
		description: `New text for the message, using the default formatting rules. It's not required when presenting attachments.`,
	},
	{
		displayName: 'TS',
		name: 'ts',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'update',
				],
			},
		},
		description: `Timestamp of the message to be updated.`,
	},
	{
		displayName: 'As User',
		name: 'as_user',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				authentication: [
					'accessToken',
				],
				operation: [
					'update',
				],
				resource: [
					'message',
				],
			},
		},
		description: 'Pass true to update the message as the authed user. Works only with user token.',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'update',
				],
			},
		},
		options: [
			{
				displayName: 'Link Names',
				name: 'link_names',
				type: 'boolean',
				default: false,
				description: 'Find and link channel names and usernames.',
			},
			{
				displayName: 'Parse',
				name: 'parse',
				type: 'options',
				options: [
					{
						name: 'Client',
						value: 'client',
					},
					{
						name: 'Full',
						value: 'full',
					},
					{
						name: 'None',
						value: 'none',
					},
				],
				default: 'client',
				description: 'Change how messages are treated',
			},
		],
	},
	{
		displayName: 'Blocks',
		name: 'blocksUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Block',
		},
		displayOptions: {
			show: {
				operation: [
					'post',
				],
				resource: [
					'message',
				],
				jsonParameters: [
					false,
				],
			},
		},
		default: {},
		description: 'The blocks to add',
		placeholder: 'Add Block',
		options: [
			{
				name: 'blocksValues',
				displayName: 'Block',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Actions',
								value: 'actions',
							},
							{
								name: 'Section',
								value: 'section',
							},
						],
						default: 'actions',
					},
					{
						displayName: 'Block ID',
						name: 'blockId',
						type: 'string',
						displayOptions: {
							show: {
								type: [
									'actions',
								],
							},
						},
						default: '',
						description: `A string acting as a unique identifier for a block.</br>
								You can use this block_id when you receive an interaction payload to</br>
								identify the source of the action. If not specified, a block_id will be generated.</br>
								Maximum length for this field is 255 characters.`,
					},
					{
						displayName: 'Elements',
						name: 'elementsUi',
						placeholder: 'Add Element',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: true,
						},
						displayOptions: {
							show: {
								type: [
									'actions',
								],
							},
						},
						default: {},
						options: [
							{
								name: 'elementsValues',
								displayName: 'Element',
								values: [
									{
										displayName: 'Type',
										name: 'type',
										type: 'options',
										options: [
											{
												name: 'Button',
												value: 'button',
											},
										],
										default: 'button',
										description: 'The type of element',
									},
									{
										displayName: 'Text',
										name: 'text',
										type: 'string',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										default: '',
										description: 'The text for the block.',
									},
									{
										displayName: 'Emoji',
										name: 'emoji',
										type: 'boolean',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										default: false,
										description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format.',
									},
									{
										displayName: 'Action ID',
										name: 'actionId',
										type: 'string',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										default: '',
										description: `An identifier for this action. You can use this when you receive an interaction</br>
												payload to identify the source of the action. Should be unique among all other action_ids used</br>
												elsewhere by your app. `,
									},
									{
										displayName: 'URL',
										name: 'url',
										type: 'string',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										default: '',
										description: `A URL to load in the user's browser when the button is clicked.</br>
												Maximum length for this field is 3000 characters. If you're using url, you'll still</br>
												receive an interaction payload and will need to send an acknowledgement response.`,
									},
									{
										displayName: 'Value',
										name: 'value',
										type: 'string',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										default: '',
										description: 'The value to send along with the interaction payload.',
									},
									{
										displayName: 'Style',
										name: 'style',
										type: 'options',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										options: [
											{
												name: 'Danger',
												value: 'danger',
											},
											{
												name: 'Default',
												value: 'default',
											},
											{
												name: 'Primary',
												value: 'primary',
											},
										],
										default: 'default',
										description: 'Decorates buttons with alternative visual color schemes.',
									},
									{
										displayName: 'Confirm',
										name: 'confirmUi',
										placeholder: 'Add Confirm',
										type: 'fixedCollection',
										typeOptions: {
											multipleValues: false,
										},
										default: {},
										options: [
											{
												name: 'confirmValue',
												displayName: 'Confirm',
												values: [
													{
														displayName: 'Title',
														name: 'titleUi',
														placeholder: 'Add Title',
														type: 'fixedCollection',
														typeOptions: {
															multipleValues: false,
														},
														default: {},
														options: [
															{
																name: 'titleValue',
																displayName: 'Title',
																values: [
																	{
																		displayName: 'Text',
																		name: 'text',
																		type: 'string',
																		default: '',
																		description: 'Text of the title.',
																	},
																	{
																		displayName: 'Emoji',
																		name: 'emoji',
																		type: 'boolean',
																		default: false,
																		description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format',
																	},
																],
															},
														],
														description: `Defines the dialog's title.`,
													},
													{
														displayName: 'Text',
														name: 'textUi',
														placeholder: 'Add Text',
														type: 'fixedCollection',
														typeOptions: {
															multipleValues: false,
														},
														default: {},
														options: [
															{
																name: 'textValue',
																displayName: 'Text',
																values: [
																	{
																		displayName: 'Text',
																		name: 'text',
																		type: 'string',
																		default: '',
																		description: 'The text for the block',
																	},
																	{
																		displayName: 'Emoji',
																		name: 'emoji',
																		type: 'boolean',
																		default: false,
																		description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format',
																	},
																],
															},
														],
														description: `Defines the explanatory text that appears in the confirm dialog.`,
													},
													{
														displayName: 'Confirm',
														name: 'confirmTextUi',
														placeholder: 'Add Confirm',
														type: 'fixedCollection',
														typeOptions: {
															multipleValues: false,
														},
														default: {},
														options: [
															{
																name: 'confirmValue',
																displayName: 'Confirm',
																values: [
																	{
																		displayName: 'Text',
																		name: 'text',
																		type: 'string',
																		default: '',
																		description: `Defines the explanatory text that appears in the confirm dialog.`,
																	},
																	{
																		displayName: 'Emoji',
																		name: 'emoji',
																		type: 'boolean',
																		default: false,
																		description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format',
																	},
																],
															},
														],
														description: 'Defines the text of the button that confirms the action',
													},
													{
														displayName: 'Deny',
														name: 'denyUi',
														placeholder: 'Add Deny',
														type: 'fixedCollection',
														typeOptions: {
															multipleValues: false,
														},
														default: {},
														options: [
															{
																name: 'denyValue',
																displayName: 'Deny',
																values: [
																	{
																		displayName: 'Text',
																		name: 'text',
																		type: 'string',
																		default: '',
																		description: 'Defines the text of the button that cancels the action',
																	},
																	{
																		displayName: 'Emoji',
																		name: 'emoji',
																		type: 'boolean',
																		default: false,
																		description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format',
																	},
																],
															},
														],
														description: 'Defines the text of the button that cancels the action',
													},
													{
														displayName: 'Style',
														name: 'style',
														type: 'options',
														options: [
															{
																name: 'Danger',
																value: 'danger',
															},
															{
																name: 'Default',
																value: 'default',
															},
															{
																name: 'Primary',
																value: 'primary',
															},
														],
														default: 'default',
														description: 'Defines the color scheme applied to the confirm button.',
													},
												],
											},
										],
										description: 'Defines an optional confirmation dialog after the button is clicked.',
									},
								],
							},
						],
					},
					{
						displayName: 'Block ID',
						name: 'blockId',
						type: 'string',
						displayOptions: {
							show: {
								type: [
									'section',
								],
							},
						},
						default: '',
						description: `A string acting as a unique identifier for a block.</br>
								You can use this block_id when you receive an interaction payload to</br>
								identify the source of the action. If not specified, a block_id will be generated.</br>
								Maximum length for this field is 255 characters.`,
					},
					{
						displayName: 'Text',
						name: 'textUi',
						placeholder: 'Add Text',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: false,
						},
						displayOptions: {
							show: {
								type: [
									'section',
								],
							},
						},
						default: {},
						options: [
							{
								name: 'textValue',
								displayName: 'Text',
								values: [
									{
										displayName: 'Type',
										name: 'type',
										type: 'options',
										options: [
											{
												name: 'Markdowm',
												value: 'mrkwdn',
											},
											{
												name: 'Plain Text',
												value: 'plainText',
											},
										],
										default: 'mrkwdn',
										description: 'The formatting to use for this text object.',
									},
									{
										displayName: 'Text',
										name: 'text',
										type: 'string',
										default: '',
										description: 'The text for the block. This field accepts any of the standard text formatting markup when type is mrkdwn.',
									},
									{
										displayName: 'Emoji',
										name: 'emoji',
										displayOptions: {
											show: {
												type: [
													'plainText',
												],
											},
										},
										type: 'boolean',
										default: false,
										description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format. This field is only usable when type is plain_text.',
									},
									{
										displayName: 'Verbatim',
										name: 'verbatim',
										displayOptions: {
											show: {
												type: [
													'mrkwdn',
												],
											},
										},
										type: 'boolean',
										default: false,
										description: 'When set to false (as is default) URLs will be auto-converted into links, conversation names will be link-ified, and certain mentions will be automatically parsed. ',
									},
								],
							},
						],
						description: 'Define the text of the button that cancels the action',
					},
					{
						displayName: 'Fields',
						name: 'fieldsUi',
						placeholder: 'Add Fields',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: true,
						},
						displayOptions: {
							show: {
								type: [
									'section',
								],
							},
						},
						default: {},
						options: [
							{
								name: 'fieldsValues',
								displayName: 'Text',
								values: [
									{
										displayName: 'Type',
										name: 'type',
										type: 'options',
										options: [
											{
												name: 'Markdowm',
												value: 'mrkwdn',
											},
											{
												name: 'Plain Text',
												value: 'plainText',
											},
										],
										default: 'mrkwdn',
										description: 'The formatting to use for this text object.',
									},
									{
										displayName: 'Text',
										name: 'text',
										type: 'string',
										default: '',
										description: 'The text for the block. This field accepts any of the standard text formatting markup when type is mrkdwn.',
									},
									{
										displayName: 'Emoji',
										name: 'emoji',
										type: 'boolean',
										displayOptions: {
											show: {
												type: [
													'plainText',
												],
											},
										},
										default: false,
										description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format. This field is only usable when type is plain_text.',
									},
									{
										displayName: 'Verbatim',
										name: 'verbatim',
										displayOptions: {
											show: {
												type: [
													'mrkwdn',
												],
											},
										},
										type: 'boolean',
										default: false,
										description: 'When set to false (as is default) URLs will be auto-converted into links, conversation names will be link-ified, and certain mentions will be automatically parsed. ',
									},
								],
							},
						],
						description: `An array of text objects. Any text objects included with</br>
								fields will be rendered in a compact format that allows for 2 columns of</br>
								side-by-side text. Maximum number of items is 10.`,
					},
					{
						displayName: 'Accessory',
						name: 'accessoryUi',
						placeholder: 'Add Accessory',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: false,
						},
						displayOptions: {
							show: {
								type: [
									'section',
								],
							},
						},
						default: {},
						options: [
							{
								name: 'accessoriesValues',
								displayName: 'Accessory',
								values: [
									{
										displayName: 'Type',
										name: 'type',
										type: 'options',
										options: [
											{
												name: 'Button',
												value: 'button',
											},
										],
										default: 'button',
										description: 'The type of element',
									},
									{
										displayName: 'Text',
										name: 'text',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										type: 'string',
										default: '',
										description: 'The text for the block.',
									},
									{
										displayName: 'Emoji',
										name: 'emoji',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										type: 'boolean',
										default: false,
										description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format.',
									},
									{
										displayName: 'Action ID',
										name: 'actionId',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										type: 'string',
										default: '',
										description: `An identifier for this action. You can use this when you receive an interaction</br>
												payload to identify the source of the action. Should be unique among all other action_ids used</br>
												elsewhere by your app. `,
									},
									{
										displayName: 'URL',
										name: 'url',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										type: 'string',
										default: '',
										description: `A URL to load in the user's browser when the button is clicked.</br>
												Maximum length for this field is 3000 characters. If you're using url, you'll still</br>
												receive an interaction payload and will need to send an acknowledgement response.`,
									},
									{
										displayName: 'Value',
										name: 'value',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										type: 'string',
										default: '',
										description: 'The value to send along with the interaction payload.',
									},
									{
										displayName: 'Style',
										name: 'style',
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										type: 'options',
										options: [
											{
												name: 'Danger',
												value: 'danger',
											},
											{
												name: 'Default',
												value: 'default',
											},
											{
												name: 'Primary',
												value: 'primary',
											},
										],
										default: 'default',
										description: 'Decorates buttons with alternative visual color schemes.',
									},
									{
										displayName: 'Confirm',
										name: 'confirmUi',
										placeholder: 'Add Confirm',
										type: 'fixedCollection',
										typeOptions: {
											multipleValues: false,
										},
										displayOptions: {
											show: {
												type: [
													'button',
												],
											},
										},
										default: {},
										options: [
											{
												name: 'confirmValue',
												displayName: 'Confirm',
												values: [
													{
														displayName: 'Title',
														name: 'titleUi',
														placeholder: 'Add Title',
														type: 'fixedCollection',
														typeOptions: {
															multipleValues: false,
														},
														default: {},
														options: [
															{
																name: 'titleValue',
																displayName: 'Title',
																values: [
																	{
																		displayName: 'Text',
																		name: 'text',
																		type: 'string',
																		default: '',
																		description: 'Text of the title.',
																	},
																	{
																		displayName: 'Emoji',
																		name: 'emoji',
																		type: 'boolean',
																		default: false,
																		description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format',
																	},
																],
															},
														],
														description: 'Defines an optional confirmation dialog after the button is clicked.',
													},
													{
														displayName: 'Text',
														name: 'textUi',
														placeholder: 'Add Text',
														type: 'fixedCollection',
														typeOptions: {
															multipleValues: false,
														},
														default: {},
														options: [
															{
																name: 'textValue',
																displayName: 'Text',
																values: [
																	{
																		displayName: 'Text',
																		name: 'text',
																		type: 'string',
																		default: '',
																		description: 'The text for the block',
																	},
																	{
																		displayName: 'Emoji',
																		name: 'emoji',
																		type: 'boolean',
																		default: false,
																		description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format',
																	},
																],
															},
														],
														description: `Defines the explanatory text that appears in the confirm dialog.`,
													},
													{
														displayName: 'Confirm',
														name: 'confirmTextUi',
														placeholder: 'Add Confirm',
														type: 'fixedCollection',
														typeOptions: {
															multipleValues: false,
														},
														default: {},
														options: [
															{
																name: 'confirmValue',
																displayName: 'Confirm',
																values: [
																	{
																		displayName: 'Text',
																		name: 'text',
																		type: 'string',
																		default: '',
																		description: `Defines the explanatory text that appears in the confirm dialog.`,
																	},
																	{
																		displayName: 'Emoji',
																		name: 'emoji',
																		type: 'boolean',
																		default: false,
																		description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format',
																	},
																],
															},
														],
														description: `Defines the explanatory text that appears in the confirm dialog.`,
													},
													{
														displayName: 'Deny',
														name: 'denyUi',
														placeholder: 'Add Deny',
														type: 'fixedCollection',
														typeOptions: {
															multipleValues: false,
														},
														default: {},
														options: [
															{
																name: 'denyValue',
																displayName: 'Deny',
																values: [
																	{
																		displayName: 'Text',
																		name: 'text',
																		type: 'string',
																		default: '',
																		description: 'Define the text of the button that cancels the action',
																	},
																	{
																		displayName: 'Emoji',
																		name: 'emoji',
																		type: 'boolean',
																		default: false,
																		description: 'Indicates whether emojis in a text field should be escaped into the colon emoji format',
																	},
																],
															},
														],
														description: 'Define the text of the button that cancels the action',
													},
													{
														displayName: 'Style',
														name: 'style',
														type: 'options',
														options: [
															{
																name: 'Danger',
																value: 'danger',
															},
															{
																name: 'Default',
																value: 'default',
															},
															{
																name: 'Primary',
																value: 'primary',
															},
														],
														default: 'default',
														description: 'Defines the color scheme applied to the confirm button.',
													},
												],
											},
										],
										description: 'Defines an optional confirmation dialog after the button is clicked.',
									},
								],
							},
						],
					},
				],
			},
		],
	},
	{
		displayName: 'Attachments',
		name: 'attachmentsJson',
		type: 'json',
		default: '',
		required: false,
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'post',
				],
				jsonParameters: [
					true,
				],
			},
		},
		description: 'The attachments to add',
	},
	{
		displayName: 'Blocks',
		name: 'blocksJson',
		type: 'json',
		default: '',
		required: false,
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
		displayOptions: {
			show: {
				resource: [
					'message',
				],
				operation: [
					'post',
				],
				jsonParameters: [
					true,
				],
			},
		},
		description: 'The blocks to add',
	},
	{
		displayName: 'Attachments',
		name: 'attachments',
		type: 'collection',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add attachment',
		},
		displayOptions: {
			show: {
				jsonParameters: [
					false,
				],
				operation: [
					'update',
				],
				resource: [
					'message',
				],
			},
		},
		default: {}, // TODO: Remove comment: has to make default array for the main property, check where that happens in UI
		description: 'The attachment to add',
		placeholder: 'Add attachment item',
		options: [
			{
				displayName: 'Fallback Text',
				name: 'fallback',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Required plain-text summary of the attachment.',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Text to send.',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Title of the message.',
			},
			{
				displayName: 'Title Link',
				name: 'title_link',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Link of the title.',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#ff0000',
				description: 'Color of the line left of text.',
			},
			{
				displayName: 'Pretext',
				name: 'pretext',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Text which appears before the message block.',
			},
			{
				displayName: 'Author Name',
				name: 'author_name',
				type: 'string',
				default: '',
				description: 'Name that should appear.',
			},
			{
				displayName: 'Author Link',
				name: 'author_link',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Link for the author.',
			},
			{
				displayName: 'Author Icon',
				name: 'author_icon',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Icon which should appear for the user.',
			},
			{
				displayName: 'Image URL',
				name: 'image_url',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'URL of image.',
			},
			{
				displayName: 'Thumbnail URL',
				name: 'thumb_url',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'URL of thumbnail.',
			},
			{
				displayName: 'Footer',
				name: 'footer',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Text of footer to add.',
			},
			{
				displayName: 'Footer Icon',
				name: 'footer_icon',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				description: 'Icon which should appear next to footer.',
			},
			{
				displayName: 'Timestamp',
				name: 'ts',
				type: 'dateTime',
				default: '',
				description: 'Time message relates to.',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				placeholder: 'Add Fields',
				description: 'Fields to add to message.',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						name: 'item',
						displayName: 'Item',
						values: [
							{
								displayName: 'Title',
								name: 'title',
								type: 'string',
								default: '',
								description: 'Title of the item.',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Value of the item.',
							},
							{
								displayName: 'Short',
								name: 'short',
								type: 'boolean',
								default: true,
								description: 'If items can be displayed next to each other.',
							},
						],
					},
				],
			},
		],
	},
] as INodeProperties[];
