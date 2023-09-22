const express = require ("express");
const { google, GoogleApis } = require("googleapis");
const path = require('path');
const axios = require("axios");
const bcrypt = require('bcrypt');



const user = "user name: user1\n\n";
const link = "\nlink: 192.168.137.1:3000/login" + "\n\n";
const password = "1234";
const statement = "Do not give this password to anyone, even if they say they are from ZeroWaste.";

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

module.exports.checker_get =  async (request , response) =>{
    let p  = request.cookies.admin;
    if (p){
    const key = "4444"
    const isMatch2 =  await bcrypt.compare(key, p);
    
    if (isMatch2){
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
          range: "ORGANIZATION",
        });
        var name = [];
        var number = [];
        var address = [];
        var email= [];
        var person= [];
        var type = [];
        var account= [];
        var note= [];
    
        var approve = "";
        var approved = [];
        var counter = 0;
       
        for (var i = 1; i <= getRows.data.values.length - 1; i++){
            approve = getRows.data.values[i][8];     
            if((approve != "approved") && (approve != "disapproved")){
                name.push(getRows.data.values[i][0]);
                number.push(getRows.data.values[i][1]);
                email.push(getRows.data.values[i][2]);
                address.push(getRows.data.values[i][3]);
                person.push(getRows.data.values[i][4]);
                account.push(getRows.data.values[i][5]);
                type.push(getRows.data.values[i][6]);
                note.push(getRows.data.values[i][7]);
    
                approved.push(approve);
                counter ++;
            }
          }
          go.push(name, number, email, address, person, account, type, note);
          console.log(go); 
      
      response.render("HOP_ADMIN", {name: name, number: number, email: email, address: address, person: person , account: account, type: type, note: note,approved: approved, counter: counter});
    }
    else{
        response.redirect('/admin')
    }
    }
    else{
        response.redirect('/admin')
    }
        
}


module.exports.checker_post =  async (request , response) =>{
    const {checker} = request.body;

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
        range: "ORGANIZATION",
    });   

    

    var name = [];
    var number = [];
    var address = [];
    var email= [];
    var person= [];
    var type = [];
    var account= [];
    var note= [];

    var approve = "";
    var approved = [];
   
    for (var i = 1; i <= getRows.data.values.length - 1; i++){
        approve = getRows.data.values[i][8];     
        if((approve != "approved") && (approve != "disapproved")){
            name.push(getRows.data.values[i][0]);
            number.push(getRows.data.values[i][1]);
            email.push(getRows.data.values[i][2]);
            address.push(getRows.data.values[i][3]);
            person.push(getRows.data.values[i][4]);
            account.push(getRows.data.values[i][5]);
            type.push(getRows.data.values[i][6]);
            note.push(getRows.data.values[i][7]);

            approved.push(approve);
        }
      }
    var newGo = [];
    var LENGTH = name.length; 
    var write ;
    for (var i = 0; i < LENGTH; i++){
        newGo.push([name[i], number[i], email[i], address[i], person[i], address[i], person[i], account[i], type[i], note[i], checker[i]]);
    }    
    // console.log(newGo[0][10]);
    for (let j = 0; j < newGo.length; j++){ 
        for (let i = 1; i < getRows.data.values.length; i++){    
            if((getRows.data.values[i][8] ==  undefined) && (getRows.data.values[i][0] == newGo[j][0])){
                write = `ORGANIZATION!I${i+1}`;
                console.log(write);
                const writeRow2 = await googleSheets.spreadsheets.values.update({
                    auth,  
                    spreadsheetId,
                    range: write,
                
                    valueInputOption: "USER_ENTERED",
                    resource:{
                        values: [
                            [newGo[j][10]]
                        ],
                    },

                })
                if(newGo[j][10] == "approved"){
                    const phone = newGo[j][1];
                    const SMS ="You have been verified to join our service go check out the website and Contact us for more information.\n";
                        // axios.get(`https://sms.hahucloud.com/api/send?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&phone=${phone}&message=${SMS}`)
                        //     .then((res) => {
                        //         console.log(res.data);
                        //     })
                        //     .catch((err) => {
                        //         console.log(err);
                        // });
                    sendSingleMessage(phone, SMS);
                    
                }
            }
    }
    }
    response.redirect("/admin");
}