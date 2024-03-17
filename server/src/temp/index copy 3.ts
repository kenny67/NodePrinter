
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as session from 'express-session';

import * as request from 'request-promise';

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



const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: 'your_secret_here',
  resave: false,
  saveUninitialized: true
}))

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  }
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Start on port ${PORT} .", PORT);
});

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: "User1", email: "user1@test.local" },
  { id: 2, name: "User2", email: "user2@test.local" },
  { id: 3, name: "User3", email: "user3@test.local" },
];

app.get('/login', (req: express.Request, res: express.Response) => {

  const authEndpoint = process.env.PRINTER_REDIRECT_URI;

  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.PRINTER_CLIENT_ID,
    redirect_uri: process.env.PRINTER_CLIENT_SECRET
  });

  const authUrl = `${authEndpoint}?${queryParams}`;

  res.redirect(authUrl);
})

app.get('/callback', async (req: express.Request, res: express.Response) => {

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
    const response = await request(options);

    req.session.accessToken = response.access_token;
    req.session.refreshToken = response.refresh_token;

    res.redirect('/user');

  } catch (err) {
    res.send('Error retrieving access token')
  }
})



app.get('/user', async ( req: express.Request, res: express.Response) => {

    const userEndpoint = 'https://oauth2-provider.com/userinfo';

    const options = {
        headers: {
          Authorization: Bearer ${ req.session.accessToken }
    },
      json: true
    };

    try {
      const response = await request.get(userEndpoint, options);
      res.send(response);
    } catch (err) {
      res.send('Error retrieving user info');
    }
  }
);


//一覧取得
app.get("/users", (req: express.Request, res: express.Response) => {

  res.send(JSON.stringify(users));
});