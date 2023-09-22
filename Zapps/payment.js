const express = require("express");
const ejs = require("ejs");
const { google } = require("googleapis");
const bodyParser = require("body-parser");

const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var sender;
var accepter;
var transactionNumber;
var message10 = [];
var money = [];
var telephonearr = [];
var smsphone;
var telephone;
var amount;
var length;
var sheetphone;
var sheetPhones = [];

var sheetname;
var sheetaddress;
var sheetamount;
var getRows;

var completeMessage = false;
var indexOfPhone;
var indexOfPhonesheet;

var payedamount;
var name = "CUSTOMERS NAME: " + sheetname + "\n";
var amount = "ORDERED AMOUNT: " + sheetamount + "\n";
var address = "THE LOCATION OF OUR CUSTOMER: " + sheetaddress + "\n";
var date = "THE TIME IN WHICH PAYMENT IS MADE: " + new Date() + "\n";
var payedvalue;
var sms;

const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";


var moneyToBePayed = [25, 15, 15, 10, 10, 5, 10, 15, 5];
var topay;

module.exports.payment_get = async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "loginFormCredential.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });
    
      const client = await auth.getClient();
    
      const googleSheets = google.sheets({ version: "v4", auth: client });
      const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";
    
      getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "BUY",
      });
    
      length = getRows.data.values.length - 1;
    
      for (var a = 1; a <= length; a++) {
        sheetphone = getRows.data.values[a][1];
        sheetPhones.push(sheetphone);
      }
      console.log (sheetPhones);
    
    
    
      switch (keb) {
        case "1":
          topay = moneyToBePayed[0] * amoun;
          break;
        case "2":
          topay = moneyToBePayed[1] * amoun;
          break;
        case "3":
          topay = moneyToBePayed[2] * amoun;
          break;
        case "4":
          topay = moneyToBePayed[3] * amoun;
          break;
        case "5":
          topay = moneyToBePayed[4] * amoun;
          break;
        case "6":
          topay = moneyToBePayed[5] * amoun;
          break;
        case "7":
          topay = moneyToBePayed[6] * amoun;
          break;
        case "8":
          topay = moneyToBePayed[7] * amoun;
          break;
        case "9":
          topay = moneyToBePayed[8] * amoun;
          break;
        default:
          topay = 200;
      }
    
      console.log(topay, sheetPhones);
    
      axios
        .post(
          `https://sms.hahucloud.com/api/get/received?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&limit=100`
        )
        .then((res) => {
          for (var i = 0; i < 10; i++) {
            var messageReceveid = [];
            var mess = res.data.data[i].message.split(" ");
            messageReceveid.push(mess);
            if (messageReceveid[0].length > 17) {
              transactionNumber = messageReceveid[0][17];
              payedvalue = messageReceveid[0][7];
              smsphone = messageReceveid[0][9];
            }
            message10.push(transactionNumber);
            money.push(payedvalue);
            telephonearr.push(smsphone);
          }
          console.log (message10);
        })
        .catch((err) => {
          console.log(err);
        });
        
      res.render("index", { topay: topay , keb: keb, amoun: amoun, name: name, phone: phone, type: type});
}

module.exports.payment_post = async (req, res) => {
    let transaction_number = req.body.transaction + ".";
  if (transaction_number != undefined ){
    transaction_number = transaction_number.trim();
  }
  console.log(transaction_number);  
  const message = req.body.message.trim ();
  var senderMessage = [];
  var string = message.toString().split(" ");
  senderMessage.push(string);
  sender = senderMessage[0][17];
  console.log(sender);


  for (var j = 0; j < 10; j++) {
    if (message10[j] == sender || message10[j] == transaction_number) {
      console.log("THE TRANSACTION NUMBER IS THE SAME");
      payedamount = money[j];
      console.log(payedamount);
      telephone = telephonearr[j];
      console.log(telephone);
      // break;
    }
  }

  for (var v = 0; v < length; v++) {
    sheetname = getRows.data.values[v + 1][0];
    sheetaddress = getRows.data.values[v + 1][2];
    sheetamount = getRows.data.values[v + 1][3];

    var name = "CUSTOMERS NAME: " + sheetname + "\n";
    var typereq = "THE TYPE OF PRODUCT REQUIRED FROM THE CUSTOMER IS : " + type + "\n";
    var amount = "ORDERED AMOUNT: " + sheetamount + "\n";
    var address = "THE LOCATION OF OUR CUSTOMER: " + sheetaddress + "\n";
    var phone = "THE PHONE NUMBER OF OUR CUSTOMER: " + telephone + "\n";
    var amount2 = "PAYED VALUE: " + payedamount + "\n";
    sms = name + typereq +amount + amount2 + address + phone + date;
    
    // console.log(sheetPhones, telephone);

    if (topay == payedamount) {
      console.log(sheetPhones[v], telephone);
      if (sheetPhones[v] == telephone) {
        console.log ('phone number is found')
        completeMessage = true;
        indexOfPhone = v + 2;
        indexOfPhonesheet = "B" + indexOfPhone;
        axios
          .post(
            `https://sms.hahucloud.com/api/send?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&phone=+251977710203&message=${sms}`
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(indexOfPhone);
        console.log(indexOfPhonesheet);
        const auth = new google.auth.GoogleAuth({
          keyFile: "loginFormCredential.json",
          scopes: "https://www.googleapis.com/auth/spreadsheets",
        });

        const client = await auth.getClient();

        const googleSheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";

        writeRows = await googleSheets.spreadsheets.values.update({
          auth,
          spreadsheetId,
          range: "BUY!" + indexOfPhonesheet,
          valueInputOption: "USER_ENTERED",
          resource: {
            values: [["message send"]],
          },
        });
        console.log ('fitted');
        res.render("redirect");
        break;
      }
    } else if (topay < payedamount) {
      console.log(sheetPhones[v], telephone);
      if (sheetPhones[v] == telephone) {
        completeMessage = true;
        indexOfPhone = v + 2;
        indexOfPhonesheet = "B" + indexOfPhone;
        axios
          .post(
            `https://sms.hahucloud.com/api/send?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&phone=+251977710203&message=${sms}`
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(indexOfPhone);
        console.log(indexOfPhonesheet);
        const auth = new google.auth.GoogleAuth({
          keyFile: "loginFormCredential.json",
          scopes: "https://www.googleapis.com/auth/spreadsheets",
        });

        const client = await auth.getClient();

        const googleSheets = google.sheets({ version: "v4", auth: client });
        const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";

        writeRows = await googleSheets.spreadsheets.values.update({
          auth,
          spreadsheetId,
          range: "BUY!" + indexOfPhonesheet,
          valueInputOption: "USER_ENTERED",
          resource: {
            values: [["message send"]],
          },
        });
        console.log ('more');
        res.render("redirect2");
        break;
      }
    } else if (topay > payedamount) {
        console.log ('less');
      console.log(sheetPhones[v], telephone);
        res.render("redirect3");
        break;
    }
  }
}