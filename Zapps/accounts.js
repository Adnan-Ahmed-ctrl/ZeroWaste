const { google } = require("googleapis");
const bcrypt = require('bcrypt');

const hashedKey = "$2b$10$UV4PJD.iCpOYzzz.FR7tOebqmCz0Cmzk9Ta8s2H/fE0XVhO4dBQfa";

const adminKey = "$2b$10$kTNDST479gtQUuYfvmKSaO1Gzzea5lmLYbmvQ6iLYFY584OXEi92i";
const admin = "$2b$10$wU7OjQyuxDB4hlgR.iVttuLT6xING.N6Ly8kfNifQiqwzfbYs.Lz2";

const path = require('path');
var userAndpass;

// Nodejs encryption with CTR
const crypto = require('crypto');
const secret = 'adnan';
const secret_key  = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0,32);


   
function decrypt(encryptedData, IV, secret_key) {
    let iv = Buffer.from(IV, 'hex');
    let encryptedText = Buffer.from(encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secret_key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports.login = async (req,res) => {
    const p  = req.cookies.bcrypt;
    if (p){
    const key = "1235"
    const isMatch2 =  await bcrypt.compare(key, p);
    if (isMatch2){
    res.redirect('logedin')
    }
    else{
        res.render('login')
    }
    }
    else{
        res.render('login')
    }

    async function getPasswords(){
    
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
        range: "sheet3",
      });
    userAndpass =  getRows.data.values;
    }
    getPasswords();
}

module.exports.logout = (req,res) => {
    res.cookie('bcrypt', '', {maxAge: 1});
    res.redirect("/login")
}
module.exports.logedin = async (req,res) => {
    let loc = path.join(__dirname, ".." , "/views/seller.html")
        const p  = req.cookies.bcrypt;
        console.log(p)
        if (p){
        const key = "1235"
    
        const isMatch2 =  await bcrypt.compare(key, p);
        if (isMatch2){
        res.sendFile(loc)
        }
        else {
            res.redirect('/login')
        }
    }
        else{
            res.redirect('/login')
        }
}

module.exports.login_post = async (req,res) =>{
    const {passowrd,name} = req.body;
    let isMatchPassword = false;
    let isMatchUsername = false;
    
     for (let i = 0; i < userAndpass.length; i++){
         const hashUserName = userAndpass[i][0];
         const hashPassword = userAndpass[i][1];
         const s_ivn = userAndpass[i][2];
         const s_ivp = userAndpass[i][3];
        
        // console.log(decrypt(s_ivn, s_ivp)); 
        // console.log(name, passowrd, "name and Password")
        // console.log(hashPassword, hashUserName, "from sheet name and password")
        console.log(hashUserName, s_ivn);
        console.log(hashPassword, s_ivp);
        // console.log("hi");
        // console.log(decrypt(hashPassword,s_ivp, secret_key) , decrypt(hashUserName,s_ivn, secret_key))
         if (passowrd === decrypt(hashPassword,s_ivp, secret_key) && name === decrypt(hashUserName,s_ivn, secret_key)){
            isMatchPassword = true;
            isMatchUsername = true;
         }
         else{
            isMatchPassword = false;
            isMatchUsername = false;
            
         }
        //   isMatchPassword =  await bcrypt.compare(passowrd, hashPassword);
        //   isMatchUsername = await bcrypt.compare(name, hashUserName);
        //   console.log(isMatchPassword,isMatchUsername);
         if (isMatchPassword && isMatchUsername){
         res.cookie('bcrypt',hashedKey, {httpOnly:true, maxAge: 1000 * 60 * 60 * 24 * 7} )
         res.json({success : true})
         break;
         }
     }
     if  (!isMatchPassword || !isMatchUsername){
        res.json({success : false}) 
    }

}

module.exports.admin = async (req,res) => {
    

    let p  = req.cookies.admin;
    if (p){
    const key = "4444"
    const isMatch2 =  await bcrypt.compare(key, p);
    
    if (isMatch2){
    res.redirect('admin_logedin')
    }
    else{
        res.render('admin_login')
    }
    }
    else{
        res.render('admin_login')
    }

    // res.render('admin_login');
    async function getPasswords(){
    
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
        range: "admin",
      });
    userAndpass =  getRows.data.values;
    }
    getPasswords();
}

module.exports.admin_logedin = async (req,res) => {

    // const salt = await bcrypt.genSalt();
    // const keyed = await bcrypt.hash("admin",salt);
    // res.cookie('bubu',keyed, {httpOnly:true, maxAge: 1000 * 60 * 60 * 24 * 7} )
    // console.log(1,keyed);
        
        const p  = req.cookies.admin;
        console.log(p);
        if (p){
        const key = "4444"
    
        const isMatch2 =  await bcrypt.compare(key, p);
        if (isMatch2){
        res.render('admin_logedin')
        }
        else {
            res.redirect('/admin')
        }
    }
        else{
            res.redirect('/admin')
        }

}

module.exports.admin_login_post = async (req,res) => {
    // console.log(userAndpass);
    const {passowrd,name} = req.body;
        let isMatchPassword = false;
        let isMatchUsername = false;
         for (let i = 0; i < userAndpass.length; i++){
             const hashPassword = userAndpass[i][1];
             const hashUserName = userAndpass[i][0];
            // console.log(hashPassword,hashUserName)
              isMatchPassword =  await bcrypt.compare(passowrd, hashPassword);
              isMatchUsername = await bcrypt.compare(name, hashUserName);
              console.log(isMatchPassword,isMatchUsername, "hi");
             if (isMatchPassword && isMatchUsername){
             res.cookie('admin',adminKey, {httpOnly:true, maxAge: 1000 * 60 * 60 * 24 * 7} )
             res.json({success : true})
             break;
             }
         }
         if  (!isMatchPassword || !isMatchUsername){
            res.json({success : false}) 
        }

    
}

