const express = require("express");
const app = express();
const { google } = require("googleapis");
const axios = require("axios");


app.use(express.json());

app.set("view engine", "ejs");

const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";
var moneyToBePayed = [25, 15, 15, 10, 10, 5, 10, 15, 5];



module.exports.Food_get = async (req, res) => {
  res.render("BuyFood");
};

module.exports.Compost_get = async (req, res) => {
  res.render("BuyCompost");
};

module.exports.Fuel_get = async (req, res) => {
    res.render("BuyFuel");
}

var time = new Date();
var Day = time.getDate().toString();
var month = (time.getUTCMonth() + 1).toString();
var year = time.getUTCFullYear().toString();
var keb;
var amoun;
var name;

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
var date2 = "THE TIME IN WHICH PAYMENT IS MADE: " + new Date() + "\n";
var payedvalue;
var sms;

var topay;
var type;

module.exports.Food_post = async (req, res) => {
  keb = req.body.kebele;
  amoun = req.body.amount;
  phone = req.body.pnum;
  name = req.body.name;
  type = req.body.type;
  console.log(amoun);
  console.log (keb);

  const auth = new google.auth.GoogleAuth({
    keyFile: "loginFormCredential.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";
  var currentDate = month + "/" + time.getDate()  + "/" + year;
   
  var getRows2 = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet2",
  });

  if((amoun < parseInt(getRows2.data.values[1][9]) && (type === "Food")) ){
    async function getDisplay() {
      const auth = new google.auth.GoogleAuth({
        keyFile: "loginFormCredential.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });
  
      const client = await auth.getClient();
  
      const googleSheets = google.sheets({ version: "v4", auth: client });
  
      
  
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "BUY!A:F",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[name, "251" + phone, keb, amoun, "Food", currentDate]],
        },
      });
      console.log(currentDate);
    

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "BUY",
    });

    // getRows = await googleSheets.spreadsheets.values.get({
    //   auth,
    //   spreadsheetId,
    //   range: "BUY",
    // });

    length = (getRows.data.values.length) - 1;
  
    for (var a = length; a >= 1; a--) {
      sheetphone = getRows.data.values[a][1];
      sheetPhones.push(sheetphone);
    }
    console.log(sheetPhones,"bro")
  }
  getDisplay();
   
    var billing = [];

    getRowsBilling = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "billing",
    });
   
    for(var i = 0; i < 9; i++){
      billing.push(getRowsBilling.data.values[((getRowsBilling.data.values.length) - 1)][i]);

    }
    // console.log(billing, "bro")


    switch (keb) {
      case "1":
        topay = billing[0] * amoun;
        break;
      case "2":
        topay = billing[1] * amoun;
        break;
      case "3":
        topay = billing[2] * amoun;
        break;
      case "4":
        topay = billing[3] * amoun;
        break;
      case "5":
        topay = billing[4] * amoun;
        break;
      case "6":
        topay = billing[5] * amoun;
        break;
      case "7":
        topay = billing[6] * amoun;
        break;
      case "8":
        topay = billing[7] * amoun;
        break;
      case "9":
        topay = billing[8] * amoun;
        break;
      default:
        topay = 200;
    }
  
    console.log(topay);
  
  
    axios.post(`https://sms.hahucloud.com/api/get/received?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&limit=100` )
      .then((res) => {
        for (var i = 0; i < 10; i++) {
          var messageReceveid = [];
          var mess = res.data.data[i].message.split(" ");
          messageReceveid.push(mess);
          if (messageReceveid[0].length > 17) {
            transactionNumber = messageReceveid[0][19];
            payedvalue = messageReceveid[0][6];
            smsphone = messageReceveid[0][10];
          }
          message10.push(transactionNumber);
          money.push(payedvalue);
          telephonearr.push(smsphone);
        }
        
        // console.log (message10, money ,telephonearr);
      })
      .catch((err) => {
        console.log(err);
      });
    
    res.render("index", { topay: topay , keb: keb, amoun: amoun, name: name, phone: phone, type: type});
   
  }else{
    res.render('tryPayment');
  }
};

module.exports.Compost_post = async (req, res) => {
  keb = req.body.kebele;
  amoun = req.body.amount;
  phone = req.body.pnum;
  name = req.body.name;
  type = req.body.type;
  console.log(amoun);
  console.log (keb);

  const auth = new google.auth.GoogleAuth({
    keyFile: "loginFormCredential.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";
  var currentDate = month + "/" + time.getDate()  + "/" + year;
   
  var getRows2 = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet2",
  });

  if((amoun < parseInt(getRows2.data.values[1][10]) && (type === "Compost")) ){
    async function getDisplay() {
      const auth = new google.auth.GoogleAuth({
        keyFile: "loginFormCredential.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });
  
      const client = await auth.getClient();
  
      const googleSheets = google.sheets({ version: "v4", auth: client });
  
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "BUY!A:F",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[name, "251" + phone, keb, amoun, "Compost", currentDate]],
        },
      });
      console.log(currentDate);
    
      const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "BUY",
      });

    // getRows = await googleSheets.spreadsheets.values.get({
    //   auth,
    //   spreadsheetId,
    //   range: "BUY",
    // });

    

    length = (getRows.data.values.length) - 1;
  
    for (var a = length; a >= 1; a--) {
      sheetphone = getRows.data.values[a][1];
      sheetPhones.push(sheetphone);
    }
    console.log(sheetPhones,"bro")
  }
  getDisplay();

    var billing = [];

    getRowsBilling = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "billing",
    });

    for(var i = 0; i < 9; i++){
      billing.push(getRowsBilling.data.values[((getRowsBilling.data.values.length) - 1)][i]);

    }
    // console.log(billing, "bro")


    switch (keb) {
      case "1":
        topay = billing[0] * amoun;
        break;
      case "2":
        topay = billing[1] * amoun;
        break;
      case "3":
        topay = billing[2] * amoun;
        break;
      case "4":
        topay = billing[3] * amoun;
        break;
      case "5":
        topay = billing[4] * amoun;
        break;
      case "6":
        topay = billing[5] * amoun;
        break;
      case "7":
        topay = billing[6] * amoun;
        break;
      case "8":
        topay = billing[7] * amoun;
        break;
      case "9":
        topay = billing[8] * amoun;
        break;
      default:
        topay = 200;
    }
  
    console.log(topay);
  
  
    axios.post(`https://sms.hahucloud.com/api/get/received?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&limit=100` )
      .then((res) => {
        for (var i = 0; i < 10; i++) {
          var messageReceveid = [];
          var mess = res.data.data[i].message.split(" ");
          messageReceveid.push(mess);
          if (messageReceveid[0].length > 17) {
            transactionNumber = messageReceveid[0][19];
            payedvalue = messageReceveid[0][6];
            smsphone = messageReceveid[0][10];
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
   
  }else{
    res.render('tryPayment');
  }
  
};

module.exports.Fuel_post = async (req, res) => {
  keb = req.body.kebele;
  amoun = req.body.amount;
  phone = req.body.pnum;
  name = req.body.name;
  type = req.body.type;
  console.log(amoun);
  console.log (keb);

    const auth = new google.auth.GoogleAuth({
      keyFile: "loginFormCredential.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    const client = await auth.getClient();
  
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";
    var currentDate = month + "/" + time.getDate()  + "/" + year;
     
    var getRows2 = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet2",
    });
  
    if((amoun < parseInt(getRows2.data.values[1][11]) && (type === "Fuel")) ){
      async function getDisplay() {
        const auth = new google.auth.GoogleAuth({
          keyFile: "loginFormCredential.json",
          scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
    
        const client = await auth.getClient();
    
        const googleSheets = google.sheets({ version: "v4", auth: client });
    
        await googleSheets.spreadsheets.values.append({
          auth,
          spreadsheetId,
          range: "BUY!A:F",
          valueInputOption: "USER_ENTERED",
          resource: {
            values: [[name, "251" + phone, keb, amoun, "Fuel", currentDate]],
          },
        });
        console.log(currentDate);

        const getRows = await googleSheets.spreadsheets.values.get({
          auth,
          spreadsheetId,
          range: "BUY",
        });

      
      // getRows = await googleSheets.spreadsheets.values.get({
      //   auth,
      //   spreadsheetId,
      //   range: "BUY",
      // });
  
      length = (getRows.data.values.length) - 1;
    
      for (var a = length; a >= 1; a--) {
        sheetphone = getRows.data.values[a][1];
        sheetPhones.push(sheetphone);
      }

    }
    getDisplay();


      var billing = [];

    getRowsBilling = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "billing",
    });
   
    for(var i = 0; i < 9; i++){
      billing.push(getRowsBilling.data.values[((getRowsBilling.data.values.length) - 1)][i]);
    }
     
  
      switch (keb) {
        case "1":
          topay = billing[0] * amoun;
          break;
        case "2":
          topay = billing[1] * amoun;
          break;
        case "3":
          topay = billing[2] * amoun;
          break;
        case "4":
          topay = billing[3] * amoun;
          break;
        case "5":
          topay = billing[4] * amoun;
          break;
        case "6":
          topay = billing[5] * amoun;
          break;
        case "7":
          topay = billing[6] * amoun;
          break;
        case "8":
          topay = billing[7] * amoun;
          break;
        case "9":
          topay = billing[8] * amoun;
          break;
        default:
          topay = 200;
      }
    
      console.log(topay);
    
    
      axios.post(`https://sms.hahucloud.com/api/get/received?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&limit=100` )
        .then((res) => {
          for (var i = 0; i < 10; i++) {
            var messageReceveid = [];
            var mess = res.data.data[i].message.split(" ");
            messageReceveid.push(mess);
            if (messageReceveid[0].length > 17) {
              transactionNumber = messageReceveid[0][19];
              payedvalue = messageReceveid[0][6];
              smsphone = messageReceveid[0][10];
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
     
    }else{
      res.render('tryPayment');
    }

  
};

module.exports.payment_post = async (req, res) => {

  // keb = req.body.kebele;
  // amoun = req.body.amount;
  // phone = req.body.pnum;
  // name = req.body.name;
  // type = req.body.type;

  const auth = new google.auth.GoogleAuth({
    keyFile: "loginFormCredential.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";

  var transaction_number = req.body.transaction;
if (transaction_number != undefined ){
  transaction_number = (transaction_number.trim())  + ".";
}
console.log(transaction_number);  const message = req.body.message.trim ();
var senderMessage = [];
var string = message.toString().split(" ");
senderMessage.push(string);
sender = senderMessage[0][18];
console.log(sender, transaction_number,"boya'o");


for (var j = 0; j < 10; j++) {
  if (message10[j] == sender || message10[j] == transaction_number) {
    console.log("THE TRANSACTION NUMBER IS THE SAME");
    payedamount = money[j];
    console.log(payedamount);
    telephone = telephonearr[j];
    console.log(telephone);
    break;
  }
}

getRows = await googleSheets.spreadsheets.values.get({
  auth,
  spreadsheetId,
  range: "BUY",
});

for (var v = 0; v < length; v++) {
  sheetname = getRows.data.values[length - v][0];
  sheetaddress = getRows.data.values[length - v][2];
  sheetamount = getRows.data.values[length - v][3];

  var name = "CUSTOMER NAME: " + sheetname + "\n";
  var typereq = "TYPE: " + type + "\n";
  var amount = "AMOUNT: " + sheetamount + "\n";
  var address = "LOCATION: Kebele " + sheetaddress + "\n";
  var phone = "PHONE NUMBER: " + telephone + "\n";
  var amount2 = "PAYED VALUE: " + payedamount + "\n";
  sms = name + typereq +amount + amount2 + address + phone + date2;
  
  console.log(sheetPhones[1], telephone);
  if (topay == payedamount) {
    if ((sheetPhones[v] + ")") == telephone) {
      console.log ('phone number is found')
      completeMessage = true;
      indexOfPhone = length - v + 1;
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
      res.render("redirect3");
      break;
  }
}
async function getDisplay() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "loginFormCredential.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  // const getRows = await googleSheets.spreadsheets.values.get({
  //   auth,
  //   spreadsheetId,
  //   range: "BUY!A:E",
  // });

  var SheetIndex = "";

  if(type == "Food"){
    SheetIndex = "Sheet2!N2";
  }
  else if(type == "Compost"){
    SheetIndex = "Sheet2!P2";
  }
  else if(type == "Fuel"){
    SheetIndex = "Sheet2!R2";
  }



  console.log(type);

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: SheetIndex,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[amoun]],
    },
  });
  
  console.log(amoun);
}
getDisplay();
}