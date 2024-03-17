
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as session from 'express-session';


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


async function run() {

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
    const accessToken = await client.getToken(tokenParams);
  } catch (error) {
    console.log('Access Token Error', error.message);
  }
}

//一覧取得
app.get("/oauth", (req: express.Request, res: express.Response) => {

  run();
  
  res.send(JSON.stringify(users));
});


//一覧取得
app.get("/users", (req: express.Request, res: express.Response) => {

     res.send(JSON.stringify(users));
});