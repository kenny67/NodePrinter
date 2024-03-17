import {BuildAuth, BuildFormParams} from './BuildAuth';


const ORIGIN = 'https://partners-staging.baitime.cn/v1/auth/token';

// client_id
// client_secret




const body = BuildFormParams({ 
  grant_type: "client_credentials",
  scope: "orders.create",
  grant_type: "client_credentials",
 });
const auth = BuildAuth({
  clientId: process.env.CLIENT_ID || "",
  clientSecret: process.env.CLIENT_SECRET || "",
});

const res = await fetch(`${ORIGIN}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${auth}`,
    "X-Application-Id": '${CLIENT_ID}', 
  },
  body: body,
});
const json = await res.json();
const token = json["access_token"] as string;