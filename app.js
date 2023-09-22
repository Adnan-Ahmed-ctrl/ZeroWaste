const express = require("express");
const { google } = require("googleapis");

// const path = require("path");
// const fs = require("fs");

// const multer = require("multer");
// const { uptime } = require("process");

const app = express();


const CLIENT_ID = '306548742427-cauaclm7jdvqj7feg3doskft7dfs85qp.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REFRESH_TOKEN = '1//04vx1Zyd3BIxFCgYIARAAGAQSNwF-L9Irihk8lqGORIp6XY3IBj3_T78Bt3ZOnJCWm_YdDNlVZxMezpRsq1Cv116188PbDgKLFHU';

const REDIRECT_URL = 'https://developers.google.com/oauthplayground';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

// const { drive } = require("googleapis/build/src/apis/drive");

// app.get("/", async (req, res) => {
  async function generatePublicUrl() {
    try {
      const fileId = '1FvbJT9vl1WG4h9BMHC9DNt2pmz_LWSvV';
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  generatePublicUrl();
// });

// app.listen(4000, function () {
//   console.log("Server up running");
// });
