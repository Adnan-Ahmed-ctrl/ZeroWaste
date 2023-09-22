/** IMPORTING REQUIRED MODULES*/

// IMPORTING AXIOS
const axios = require("axios");

// IMPORTING EXPRESS MODULE
const express = require("express");

// IMPORTING GOOGLE APIS MODULE
const { google } = require("googleapis");

// IMPORTING MULTER MODULE
const multer = require("multer");

// IMPORTING PROCESS MODULE
const { uptime } = require("process");

// IMPORTING FILE SYSTEM MODULE
const fs = require("fs");

// IMPORTING PATH MODULE
const path = require("path");

/** DECLARING FUNCTION */

// DECLARING EXPRESS FUNCTION APPLICATION
const app = express();

// INITIALIZATION AND DECLARING GOOGLE DRIVE APIS FOLDER ID
const GOOGLE_API_FOLDER_ID = "1caNh-4NaMppQ0Zn4SV_CFTqmRyWQ_nn5";

// INITIALIZATION AND DECLARING GOOGLE SHEET APIS SPREADSHEET ID
const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";

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

// SETTING EJS FILE SYSTEM
app.set("view engine", "ejs");

/** EXPORT DONATION MODULE */
module.exports.donation = (req, res) => {
  res.render("donation");
};

/** EXPORT HELPING MODULE */
module.exports.help = (req, res) => {
  res.render("help");
};

//INITIALIZATION FILE NAME
var fileName;

/** EXPORT HELPING POST MODULE */
module.exports.help_post = async (req, res) => {

  // INITIALIZATION AND DECLARING USER INPUTS
  const { name, number, email, address, person, account, type, note } = req.body;

  // DECLARING USER FILE INPUT
  fileName = req.file.filename;
  
  console.log(fileName);

  // ASYNC FUCTION FOR UPLOAD FILE TO GOOGLE DRIVE
  async function uploadFile() {
    
    try {
      // AUTHENTICATION GOOGLE DRIVE CREDENTAIL
      const auth = new google.auth.GoogleAuth({
        keyFile: "./google drive credential.json",
        scopes: ["https://www.googleapis.com/auth/drive"],
      });

      // ADD PROPERTY GOOGLE DRIVE VERSION AND DECLARING AUTHENTICATION
      const driveService = google.drive({
        version: "v3",
        auth,
      });

      // ADD PROPERTY OF FILE NAME AND GOOGLE DRIVE APIS FOLDER ID
      const fileMetaData = {
        name: fileName,
        parents: [GOOGLE_API_FOLDER_ID],
      };

      // UPLOAD IMAGE FILE INTO LOCAL STOREAGE TO IMAGE/ORGANIZATION FOLDER
      const media = {
        mimeType: "image/*",
        body: fs.createReadStream(
          "./images/organization/" + fileName.toString()
        ),
      };

      // UPLOAD IMAGE FILE INTO GOOGLE DRIVE FROM IMAGE/ORGANIZATION FOLDER
      const response = await driveService.files.create({
        resource: fileMetaData,
        media: media,
        field: "id",
      });
      
      // RETURN RESPONSE DATAS AND ID
      return response.data.id;
    } catch (err) {
      console.log("Upload file error", err);
    }
  }

  // CALLING UPLOAD FUNCTION
  uploadFile().then((data) => {
    console.log(data);
  });

  const auth = new google.auth.GoogleAuth({
    keyFile: "loginFormCredential.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // CREATE CLIENT INSTANCE FOR AUTHENTICATION
  const client = await auth.getClient();

  // INSTANCE OF GOOGLE SHEETS API
  const googleSheets = google.sheets({ version: "v4", auth: client });


  // APPEND USER INPUT TO GOOGLE SHEET
  const writeRow = await googleSheets.spreadsheets.values.append({
    auth,

    spreadsheetId,

    range: "ORGANIZATION!A:G",

    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[name,"+251" + number, email, address, person, account, type, note]],
    },
  });

  console.log(name, number, email, address, person, account, type, note);

  // NOTIFICATION SMS MESSAGING FOR H.O.P
  const Headers = "\t\t\tH.O.P\nNew Organization have registered\n";
  const CustomerNameInfo = "Organization: " + name.toString() + "\n";
  
  const CustomerDriveFileNameInfo = "Drive File Name: " + fileName.toString() + "\n";

  const CustomerPhoneNumber = "Phone Number: " + "+251" + number.toString() + "\n";

  const Address = "Address: " + address.toString() + '\n';

  const SMS = Headers + CustomerNameInfo + CustomerPhoneNumber + CustomerDriveFileNameInfo + Address;

  const adminPhone = "+251977710203";

  // SEND NOTIFICATION FOR H.O.P
  // axios.get(`https://sms.hahucloud.com/api/send?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&phone=+251977710203&message=${SMS}`)
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

sendSingleMessage(adminPhone, SMS);


  // REDIRECTING TO HOME PAGE
  res.redirect('/');
};
