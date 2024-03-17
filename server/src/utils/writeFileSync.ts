
// https://typescriptbook.jp/reference/builtin-api/map

const fs = require('fs');

// create a JSON object
const user = {
  "id": 1,
  "name": "John Doe",
  "age": 22
};

// 同步
// convert JSON object to string
const data = JSON.stringify(user);
try {
  fs.writeFileSync('user.json', data);
  console.log("JSON data is saved.");
} catch (error) {
  console.error(err);
}

// 异步
// // write JSON string to a file
// fs.writeFile('user.json', data, (err) => {
//   if (err) {
//       throw err;
//   }
//   console.log("JSON data is saved.");
// });

// write(user);