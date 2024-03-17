"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express = __importStar(require("express"));
const session = __importStar(require("express-session"));
const request = __importStar(require("request-promise"));
// const express = require('express')
// const session = require('express-session')
// const request = require('request-promise')
dotenv.config();
//TODO simple token
const config = {
    client: {
        client_id: process.env.PRINTER_CLIENT_ID,
        client_secret: process.env.PRINTER_CLIENT_SECRET,
    },
    auth: {
        //tokenHost: 'https://api.oauth.com',
        tokenHost: process.env.PRINTER_REDIRECT_URI,
    }
};
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_here',
    resave: false,
    saveUninitialized: true
}));
//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log("Start on port ${PORT} .", PORT);
});
const users = [
    { id: 1, name: "User1", email: "user1@test.local" },
    { id: 2, name: "User2", email: "user2@test.local" },
    { id: 3, name: "User3", email: "user3@test.local" },
];
app.get('/login', (req, res) => {
    const authEndpoint = process.env.PRINTER_REDIRECT_URI;
    const queryParams = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.PRINTER_CLIENT_ID,
        redirect_uri: process.env.PRINTER_CLIENT_SECRET
    });
    const authUrl = `${authEndpoint}?${queryParams}`;
    res.redirect(authUrl);
});
app.get('/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //resource API
    const tokenEndpoint = process.env.PRINTER_TOKEN_URI;
    const { code } = req.query;
    const requestBody = {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI
    };
    const options = {
        method: 'POST',
        uri: tokenEndpoint,
        form: requestBody,
        json: true
    };
    try {
        const response = yield request(options);
        req.session.accessToken = response.access_token;
        req.session.refreshToken = response.refresh_token;
        res.redirect('/user');
    }
    catch (err) {
        res.send('Error retrieving access token');
    }
}));
app.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEndpoint = 'https://oauth2-provider.com/userinfo';
    const options = {
        headers: {
            Authorization: Bearer, $
        }
    }, { req, session, accessToken };
}), json, true);
try {
    const response = await request.get(userEndpoint, options);
    res.send(response);
}
catch (err) {
    res.send('Error retrieving user info');
}
;
//一覧取得
app.get("/users", (req, res) => {
    res.send(JSON.stringify(users));
});
