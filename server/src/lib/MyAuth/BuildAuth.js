"use strict";
// curl --location --request POST 'https://partners-staging.baitime.cn/v1/auth/token' \
// --header 'Content-Type: application/x-www-form-urlencoded' \
// --data-urlencode 'scope=ping' \
// --data-urlencode 'grant_type=client_credentials' \
// --data-urlencode 'client_id=[APPLICATION_ID]' \
// --data-urlencode 'client_secret=[CLIENT_SECRET]'
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildFormParams = exports.BuildAuth = void 0;
const BuildAuth = ({ clientId, clientSecret, }) => {
    return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
};
exports.BuildAuth = BuildAuth;
const BuildFormParams = (params) => {
    let formBody = [];
    for (const param in params) {
        const encodedKey = encodeURIComponent(param);
        const encodedValue = encodeURIComponent(params[param]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    const body = formBody.join("&");
    return body;
};
exports.BuildFormParams = BuildFormParams;
