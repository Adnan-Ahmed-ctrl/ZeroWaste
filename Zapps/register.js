const multer = require("multer");
const { google } = require("googleapis");
let fileName = "";
const path = require('path');
const fs = require("fs");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const axios = require("axios");

const API_KEY = "hAKoM_Z89ymJ10IMyb7rcfj1FzPXv1SQegpR";
const PROJECT_ID = "PJ30e271f2f84f09a2";
const telerivet = require('telerivet');


// app.use(cookieParser());

const phone = 251977710203;

const GOOGLE_API_FOLDER_ID = "1FvbJT9vl1WG4h9BMHC9DNt2pmz_LWSvV";

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../images");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });

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

let loc = path.join(__dirname, "../", "views/provide.html");
module.exports.provide = (req,res) =>{
    res.sendFile  (loc); 
}

module.exports.provide_post = async (req,res) =>{
      const { name, number, address} = req.body;

      res.cookie("name", name, {maxAge: 1000 * 60 * 60 * 24 * 7 * 2 , secure: true});
      res.cookie("number", number, {maxAge: 1000 * 60 * 60 * 24 * 7 * 2 , secure: true});
      res.cookie("address", address, {maxAge: 1000 * 60 * 60 * 24 * 7 * 2 , secure: true});

      console.log(req.cookies);
      
        fileName = req.file.filename;
        console.log(fileName);
      
        async function uploadFile() {
          try {
            const auth = new google.auth.GoogleAuth({
              keyFile: "./google drive credential.json",
              scopes: ["https://www.googleapis.com/auth/drive"],
            });
            const driveService = google.drive({
              version: "v3",
              auth,
            });
            const fileMetaData = {
              name: fileName,
              parents: [GOOGLE_API_FOLDER_ID],
            };
            const media = {
              mimeType: "image/*",
              body: fs.createReadStream("../ZeroWaste/images/Hotel/" + fileName.toString()),
            };
      
            const response = await driveService.files.create({
              resource: fileMetaData,
              media: media,
              field: "id",
            });
            return response.data.id;
          } catch (err) {
            console.log("Upload file error", err);
          }
        }
        uploadFile().then((data) => {
          console.log(data);
        });
      
        const auth = new google.auth.GoogleAuth({
          keyFile: "loginFormCredential.json",
          scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
      
        // const { name, number, address} = req.body;
      
        //createclient instance for auth
      
        const client = await auth.getClient();
      
        //Instance of Googlesheets API
      
        const googleSheets = google.sheets({ version: "v4", auth: client });
      
        const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";
      
        //Get metadata about spreadsheet
      
        // const metaData = await googleSheets.spreadsheets.get ({
      
        // auth,
        // spreadsheetId,
        // });
      
        let time = new Date();
        let date1 =
          time.getFullYear().toString() +
          "-" +
          time.getMonth().toString() +
          "-" +
          time.getDate().toString() +
          "-" +
          time.getHours().toString() +
          "-" +
          time.getMinutes().toString() +
          "-" +
          time.getSeconds().toString();
      
        //read rows from spread sheet
      
        const getRows = await googleSheets.spreadsheets.values.get({
          auth,
          spreadsheetId,
          range: "Hotels",
        });
      
        //write row(s) to spreadsheet
      
        await googleSheets.spreadsheets.values.append({
          auth,
          spreadsheetId,
          range: "Hotels!A:D",
          valueInputOption: "USER_ENTERED",
          resource: {
            values: [[name, "251" + number, address, date1]],
          },
        });
      
        const Header = "\t\t\tZeroWaste\nNew Hotel have registered\n";
        const CustomerNameInfo = "Customer: " + name.toString() + "\n" ;
        const CustomerDriveFileNameInfo = "Drive File Name: " + fileName.toString() + "\n" ;
        const CustomerPhoneNumber = "Phone Number: " + "251" + number.toString() + "\n" ;
        const Address = "Address: " + address.toString();
        const AdminphoneNubmer = parseInt("+251977710203");
      
        const SMS = Header + CustomerNameInfo + CustomerDriveFileNameInfo + CustomerPhoneNumber + Address; 

        sendSingleMessage(AdminphoneNubmer, SMS);

        // console.log(AdminphoneNubmer, SMS);

        // axios.get(`https://hahu.io/api/send?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&phone=+251977710203&message=${SMS}`)
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      
        // axios.get(`https://sms.hahucloud.com/api/send?key=3a8d4d959e7c2a269c91e5bb32e90ab1101d48d0&phone=+251977710203&message=${SMS}`)
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        
        // axios.get(`https://hahu.io/api/get/sms.sent?secret=b9546f9313931030d46c441740e069fab49adfad&phone=+251982210108&message=${SMS}`)
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });

        // axios.get(`https://hahu.io/api/send?key=b9546f9313931030d46c441740e069fab49adfad&phone=+251982210108&message=${SMS}`)
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });

      
        res.redirect("/successful");
}
module.exports.success = (req, res) => {
  res.render('successful');
}
