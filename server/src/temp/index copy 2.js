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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new AuthorizationCode(config);
        const authorizationUri = client.authorizeURL({
            redirect_uri: 'http://localhost:3000/callback',
            scope: 'orders.create',
            state: '<state>',
            customParam: 'foo', // non-standard oauth params may be passed as well
        });
        // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
        res.redirect(authorizationUri);
        const tokenParams = {
            code: '<code>',
            redirect_uri: 'http://localhost:3000/callback',
            scope: 'orders.create',
        };
        try {
            const accessToken = yield client.getToken(tokenParams);
        }
        catch (error) {
            console.log('Access Token Error', error.message);
        }
    });
}
//一覧取得
app.get("/oauth", (req, res) => {
    run();
    res.send(JSON.stringify(users));
});
//一覧取得
app.get("/users", (req, res) => {
    res.send(JSON.stringify(users));
});
