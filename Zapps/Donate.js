// const express = require ("express");
// const app = express();

// IMPORTING GOOGLE APIS MODULE
const { google } = require("googleapis");

// INITIALIZATION AND DECLARING GOOGLE SHEET APIS SPREADSHEET ID
const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";

// INITIALIZATION INFORMATION ARRAY
var name = [];
var phone = [];
var email = [];
var address = [];
var person = [];
var account = [];
var type = [];
var note = [];
var approved = [];

// EXPORT FUND MODULE
module.exports.Fund = (req, res) => {
    async function getDisplay() {
          const auth = new google.auth.GoogleAuth({
            keyFile: "loginFormCredential.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
          });
      
          const client = await auth.getClient();
      
          const googleSheets = google.sheets({ version: "v4", auth: client });
      
          const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "ORGANIZATION!A:I",
          });

          var Length = (getRows.data.values.length - 1);
          var list = 0;

          for (var i = 1; i <= Length; i++){
            type.push(getRows.data.values[i][6]);
            if(getRows.data.values[i][8] == "approved" && (getRows.data.values[i][6] == "Fund")){
                list ++;
                
                name.push(getRows.data.values[i][0]);
                
                phone.push(getRows.data.values[i][1]);
                
                email.push(getRows.data.values[i][2]);
                
                address.push(getRows.data.values[i][3]);
                
                person.push(getRows.data.values[i][4]);
                
                account.push(getRows.data.values[i][5]);
                
                note.push(getRows.data.values[i][7]);
                
                approved.push(getRows.data.values[i][8]);
            }
          }
          
          res.render("FundDonate", { list: list, name: name, phone: phone, email: email, address: address, person: person, account: account, type: type, note: note , Length: Length});
        }
        getDisplay();
}

// EXPORT FOOD MODULE
module.exports.Food = (req, res) => {
    async function getDisplay() {

          const auth = new google.auth.GoogleAuth({
            keyFile: "loginFormCredential.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
          });
      
          const client = await auth.getClient();
      
          const googleSheets = google.sheets({ version: "v4", auth: client });
      
          const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "ORGANIZATION!A:I",
          });

          var Length = (getRows.data.values.length - 1);
          var list = 0;

          for (var i = 1; i <= Length; i++){
            type.push(getRows.data.values[i][6]);
            
            if(getRows.data.values[i][8] == "approved" && (getRows.data.values[i][6] == "Food")){
                list ++;
                
                name.push(getRows.data.values[i][0]);
                
                phone.push(getRows.data.values[i][1]);
                
                email.push(getRows.data.values[i][2]);
                
                address.push(getRows.data.values[i][3]);
                
                person.push(getRows.data.values[i][4]);
                
                account.push(getRows.data.values[i][5]);
                
                note.push(getRows.data.values[i][7]);
                
                approved.push(getRows.data.values[i][8]);
            }
          }

          res.render("FoodDonate", { list: list, name: name, phone: phone, email: email, address: address, person: person, account: account, type: type, note: note , Length: Length});
        }
        getDisplay();
}
// EXPORT CLOTH MODULE
module.exports.Cloth = (req, res) => {
    async function getDisplay() {
          const auth = new google.auth.GoogleAuth({
            keyFile: "loginFormCredential.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
          });
      
          const client = await auth.getClient();
      
          const googleSheets = google.sheets({ version: "v4", auth: client });
      
          const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "ORGANIZATION!A:I",
          });

          var Length = (getRows.data.values.length - 1);
          var list = 0;

          for (var i = 1; i <= Length; i++){
            type.push(getRows.data.values[i][6]);
            if(getRows.data.values[i][8] == "approved" && (getRows.data.values[i][6] == "Cloth")){
                list ++;
                
                name.push(getRows.data.values[i][0]);
                
                phone.push(getRows.data.values[i][1]);
                
                email.push(getRows.data.values[i][2]);
                
                address.push(getRows.data.values[i][3]);
                
                person.push(getRows.data.values[i][4]);
                
                account.push(getRows.data.values[i][5]);
                
                note.push(getRows.data.values[i][7]);
                
                approved.push(getRows.data.values[i][8]);
            }
          }
          
          res.render("ClothDonate", { list: list, name: name, phone: phone, email: email, address: address, person: person, account: account, type: type, note: note , Length: Length});
        }
        getDisplay();
}
// EXPORT OTHER MODULE
module.exports.Other = (req, res) => {
    async function getDisplay() {
          const auth = new google.auth.GoogleAuth({
            keyFile: "loginFormCredential.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
          });
      
          const client = await auth.getClient();
      
          const googleSheets = google.sheets({ version: "v4", auth: client });
      
          const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "ORGANIZATION!A:I",
          });

          var Length = (getRows.data.values.length - 1);
          var list = 0;

          for (var i = 1; i <= Length; i++){
            type.push(getRows.data.values[i][6]);
            if(getRows.data.values[i][8] == "approved" && (getRows.data.values[i][6] == "Other")){
                list ++;
                
                name.push(getRows.data.values[i][0]);
                
                phone.push(getRows.data.values[i][1]);
                
                email.push(getRows.data.values[i][2]);
                
                address.push(getRows.data.values[i][3]);
                
                person.push(getRows.data.values[i][4]);
                
                account.push(getRows.data.values[i][5]);
                
                note.push(getRows.data.values[i][7]);
                
                approved.push(getRows.data.values[i][8]);
            }
          }
          res.render("OtherDonate", { list: list, name: name, phone: phone, email: email, address: address, person: person, account: account, type: type, note: note , Length: Length});
        }
        getDisplay();
}