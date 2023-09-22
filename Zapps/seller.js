const { google } = require("googleapis");
const path = require("path");
const axios = require("axios");
const bodyParser = require("body-parser");
const { Console } = require("console");
const bcrypt = require("bcrypt");

const API_KEY = "hAKoM_Z89ymJ10IMyb7rcfj1FzPXv1SQegpR";
const PROJECT_ID = "PJ30e271f2f84f09a2";
var telerivet = require("telerivet");

function sendSingleMessage(phone, message) {
  var tr = new telerivet.API(API_KEY);
  var project = tr.initProjectById(PROJECT_ID);

  project.sendMessage(
    {
      content: message,
      to_number: phone,
    },
    function (err, message) {
      console.log(message);
    }
  );
}

module.exports.seller = (req, res) => {
  let loc = path.join(__dirname, "..", "/views/seller.html");
  res.sendFile(loc);
};

module.exports.seller_post = async (request, response) => {
  const { amount, date, type } = request.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "loginFormCredential.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";
  let time = new Date();
  let year = time.getUTCFullYear();
  let month = time.getMonth();
  let date1 = time.getDate();
  var currentDate = month + 1 + "/" + date1 + "/" + year;

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Hotels",
  });
  var write = "";
  var cookies = request.cookies;
  var name = "";
  var number = "";
  var address = "";
  var costumer = false;

  for (var i = 1; i <= getRows.data.values.length - 1; i++) {
    name = getRows.data.values[i][0];
    number = "+" + getRows.data.values[i][1];
    address = getRows.data.values[i][2];

    // if((cookies.number == number))console.log(i,name, number, address);

    // console.log(i,cookies.name, cookies.number, cookies.address);

    if (
      cookies.name == name &&
      "+251" + cookies.number == number &&
      cookies.address == address
    ) {
      console.log(i, name, number, address);
      costumer = true;

      write = `Hotels!G${i + 1}:I${i + 1}`;

      const writeRow = await googleSheets.spreadsheets.values.update({
        auth,

        spreadsheetId,

        range: write,

        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[amount, type, date]],
        },
      });
    }
    if (costumer) {
      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet2",
      });

      var index = getRows.data.values.length + 1;
      console.log(index);

      var sheet2 = `Sheet2!A${index}:E${index}`;

      const writeRow2 = await googleSheets.spreadsheets.values.append({
        auth,

        spreadsheetId,

        range: sheet2,

        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[amount, type, date, "", currentDate]],
        },
      });
    }
    var form = "\t\t\tZeroWaste\n";
    var name = "CUSTOMER NAME: " + name + "\n";
    var phone = "PHONE NUMBER: " + number + "\n";
    var address = "KEBELE: " + address + "\n";
    var amoun = "AMOUNT: " + amount + "\n";
    var sms = form + name + phone + amoun + address + address + phone;
    var adminphone = "+251977710203";

    // axios.post(`https://sms.hahucloud.com/api/send?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&phone=+251977710203&message=${sms}`)
    //       .then((res) => {
    //         console.log(res.data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    sendSingleMessage(adminphone, sms);
  }

  response.redirect("successful");
};

module.exports.billing_get = async (req, res) => {
  let p = req.cookies.admin;
  if (p) {
    const key = "4444";
    const isMatch2 = await bcrypt.compare(key, p);

    if (isMatch2) {
      res.render("billing");
    } else {
      res.redirect("/admin");
    }
  } else {
    res.redirect("/admin");
  }
};

module.exports.billing_post = async (req, res) => {
  const { Kebele } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "loginFormCredential.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";

  var billing = [];

  var getRowsBilling = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "billing",
  });

  for (var i = 0; i < 9; i++) {
    billing.push(
      getRowsBilling.data.values[getRowsBilling.data.values.length - 1][i]
    );
  }

  console.log(billing, Kebele, "bro");

  // var indexValue = "";

  for (var i = 0; i < Kebele.length; i++) {
    // indexValue = Kebele.indexOf(Kebele[i]);
    if (Kebele[i] == "") {
      console.log(Kebele[i], "gog");
      Kebele[i] = billing[i];
    }
  }

  var writeRows = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "billing!A:I",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          Kebele[0],
          Kebele[1],
          Kebele[2],
          Kebele[3],
          Kebele[4],
          Kebele[5],
          Kebele[6],
          Kebele[7],
          Kebele[8],
        ],
      ],
    },
  });

  console.log(Kebele, "corrected");
  res.redirect("/admin");
};
