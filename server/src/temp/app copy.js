'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const createApplication = require('./');
const { AuthorizationCode } = require('./../');
createApplication(({ app, callbackUrl }) => {
    const client = new AuthorizationCode({
        client: {
            id: process.env.CLIENT_ID,
            secret: process.env.CLIENT_SECRET,
        },
        auth: {
            tokenHost: 'https://api.dropbox.com',
            authorizeHost: 'https://dropbox.com',
            tokenPath: '/oauth2/token',
            authorizePath: '/oauth2/authorize',
        },
        options: {
            authorizationMethod: 'body',
        },
    });
    // Authorization uri definition
    const authorizationUri = client.authorizeURL({
        redirect_uri: callbackUrl,
        state: '3(#0/!~',
    });
    // Initial page redirecting to Github
    app.get('/auth', (req, res) => {
        console.log(authorizationUri);
        res.redirect(authorizationUri);
    });
    // Callback service parsing the authorization token and asking for the access token
    app.get('/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { code } = req.query;
        const options = {
            code,
            redirect_uri: callbackUrl,
        };
        try {
            const accessToken = yield client.getToken(options);
            console.log('The resulting token: ', accessToken.token);
            return res.status(200).json(accessToken.token);
        }
        catch (error) {
            console.error('Access Token Error', error.message);
            return res.status(500).json('Authentication failed');
        }
    }));
    app.get('/', (req, res) => {
        res.send('Hello<br><a href="/auth">Log in with Dropbox</a>');
    });
});
