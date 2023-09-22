const express = require("express");
const { google, GoogleApis } = require("googleapis");
const path = require("path");
const axios = require("axios");
const bcrypt = require("bcrypt");

const user = "user name: user1\n\n";
// const link = "\nlink: 192.168.137.1:5000/login" + "\n\n";
const password = "1234";
const statement =
  "Do not give this password to anyone, even if they say they are from ZeroWaste.";

var go = [];

const API_KEY = "hAKoM_Z89ymJ10IMyb7rcfj1FzPXv1SQegpR";
const PROJECT_ID = "PJ30e271f2f84f09a2";
var telerivet = require('telerivet');

function sendSingleMessage(phone, message) {

var tr = new telerivet.API(API_KEY);
var project = tr.initProjectById(PROJECT_ID);

project.sendMessage({
    content: message, 
    to_number: phone
}, function(err, message) {
    console.log(message);
});
}

module.exports.checker_get = async (request, response) => {
  let p = request.cookies.admin;
  if (p) {
    const key = "4444";
    const isMatch2 = await bcrypt.compare(key, p);

    if (isMatch2) {
      const auth = new google.auth.GoogleAuth({
        keyFile: "loginFormCredential.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });

      // Create client instance for auth
      const client = await auth.getClient();

      // Instance of Google Sheets API
      const googleSheets = google.sheets({ version: "v4", auth: client });

      const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";

      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Hotels",
      });
      var name = [];
      var number = [];
      var address = [];
      var approve = "";
      var approved = [];
      var counter = 0;

      for (var i = 1; i <= getRows.data.values.length - 1; i++) {
        approve = getRows.data.values[i][4];
        if (approve != "approved" && approve != "disapproved") {
          name.push(getRows.data.values[i][0]);
          number.push(getRows.data.values[i][1]);
          address.push(getRows.data.values[i][2]);
          approved.push(approve);
          counter++;
        }
      }
      go.push(name, number, address);

      response.render("ZeroAdmin", {
        name: name,
        number: number,
        address: address,
        approved: approved,
        counter: counter,
      });
    } else {
      response.redirect("/admin");
    }
  } else {
    response.redirect("/admin");
  }
};

module.exports.checker_post = async (request, response) => {
  const { checker } = request.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "loginFormCredential.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Hotels",
  });

  var name = [];
  var number = [];
  var address = [];
  var approve = "";
  var approved = [];
  var counter = 0;

  for (var i = 1; i <= getRows.data.values.length - 1; i++) {
    approve = getRows.data.values[i][4];
    if (approve != "approved" && approve != "disapproved") {
      name.push(getRows.data.values[i][0]);
      number.push(getRows.data.values[i][1]);
      address.push(getRows.data.values[i][2]);
      approved.push(approve);
      counter++;
    }
  }
  // go.push(name, number, address,checker);
  var newGo = [];
  var newName = [];
  var newNumber = [];
  var newAddress = [];
  var LENGTH = name.length;
  var write;
  var a = 0;

  for (var i = 0; i < LENGTH; i++) {
    newGo.push([name[i], number[i], address[i], checker[i]]);
  }

  for (let j = 0; j < newGo.length; j++) {
    for (let i = 1; i < getRows.data.values.length; i++) {
      if (
        getRows.data.values[i][4] == undefined &&
        getRows.data.values[i][0] == newGo[j][0]
      ) {
        write = `Hotels!E${i + 1}`;
        console.log(write);
        const writeRow2 = await googleSheets.spreadsheets.values.update({
          auth,
          spreadsheetId,
          range: write,

          valueInputOption: "USER_ENTERED",
          resource: {
            values: [[newGo[j][3]]],
          },
        });

        console.log(newGo[j][3]);
        if (newGo[j][3] == "approved") {
          const phone = newGo[j][1];
          const SMS =
            "You have been verified to access our website by this:\n" +
            user +
            "login pasword: " +
            password +
            "\n\n" +
            statement;
          sendSingleMessage(phone, SMS);

          // axios
          //   .get(
          //     `https://hahu.io/api/get/sms.sent?secret=b9546f9313931030d46c441740e069fab49adfad&phone=+251982210108&message=${SMS}`
          //   )
          //   .then((res) => {
          //     console.log(res.data);
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        }
      }
    }
    // console.log(getRows.data.values[i][0]);
  }
  response.redirect("/admin");
};
