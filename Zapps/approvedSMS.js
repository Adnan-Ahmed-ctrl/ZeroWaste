// const axios = require("axios");
// const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";

// const user = "user name: user1\n\n";
// const link = "\nlink: 192.168.137.1:3000/login" + "\n\n";
// const password = "1234";
// const statement =
//   "Do not give this password to anyone, even if they say they are from ZeroWaste";

// module.exports()={
//   const auth = new google.auth.GoogleAuth({
//         keyFile: "loginFormCredential.json",
//         scopes: "https://www.googleapis.com/auth/spreadsheets",
//       });
    
//       const client = await auth.getClient();
    
//       //instance
//       const googleSheets = google.sheets({ version: "v4", auth: client });
    
//       //read rows from spreadsheet
//       const getRow = await googleSheets.spreadsheets.values.get({
//         auth,
//         spreadsheetId,
//         range: "Sheet1",
//       });
    
//     //   for(var i = 0; i < )  
//       const phone = 251 + getRow.data.values[1][1];
//       const SMS =
//         "You have been verified to access our website by this:\n" +
//         link +
//         user +
//         "login pasword: " +
//         password + "\n\n" + statement;
//       axios
//         .get(
//           `https://sms.hahucloud.com/api/send?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&phone=${phone}&message=${SMS}`
//         )
//         .then((res) => {
//           console.log(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       res.send("send succesfull!");

// }