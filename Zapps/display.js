const { google } = require("googleapis");

module.exports.display = (req, res) => {
async function getDisplay(){
    
    const auth = new google.auth.GoogleAuth({
        keyFile: "loginFormCredential.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        //createclient instance for auth
    const client = await auth.getClient();

    //Instance of Googlesheets API

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1xLop7ZrEk53_PWe9-qlX_lUi5SnVgXC6pLsxDXHUyOM";

    const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "sheet2!J:L",
    });
    getDisplayData = getRows.data.values;
    console.log(getDisplayData);
    res.render('display', {getDisplayData: getDisplayData})
}
    getDisplay();
}