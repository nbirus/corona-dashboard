export default {
	session: {
		maxAlertDuration: 2.5,
		maxInactivity: 30,
	},
	auth: {
		baseUrl: process.env.VUE_APP_OKTA_BASE_URL,
		clientId: process.env.VUE_APP_OKTA_CLIENT_ID,
		issuer: process.env.VUE_APP_OKTA_ISSUER,
		redirectUri: process.env.VUE_APP_OKTA_REDIRECT_URI,
		authParams: {
			responseType: ['token', 'id_token'],
			scopes: ['openid', 'profile', 'email', 'roles'],
			issuer: process.env.VUE_APP_OKTA_ISSUER,
		},
		idpDisplay: 'PRIMARY',
		idps: [
			{
				text: 'Login With iTrust',
				id: process.env.VUE_APP_OKTA_IDP_ID,
			},
		],
		i18n: {
			en: {
				'primaryauth.title': `Log in to ${process.env.VUE_APP_PROJECT_TITLE}`,
			},
		},
	},
	listenerTypes: ['mousedown'],
}
