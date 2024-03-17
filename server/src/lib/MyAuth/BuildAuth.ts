

// curl --location --request POST 'https://partners-staging.baitime.cn/v1/auth/token' \
// --header 'Content-Type: application/x-www-form-urlencoded' \
// --data-urlencode 'scope=ping' \
// --data-urlencode 'grant_type=client_credentials' \
// --data-urlencode 'client_id=[APPLICATION_ID]' \
// --data-urlencode 'client_secret=[CLIENT_SECRET]'

const BuildAuth = ({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}) => {
  return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
};


const BuildFormParams = (params: Record<string, string | number | boolean>) => {
  let formBody = [];
  for (const param in params) {
    const encodedKey = encodeURIComponent(param);
    const encodedValue = encodeURIComponent(params[param]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  const body = formBody.join("&");
  return body;
};


export {BuildAuth, BuildFormParams};