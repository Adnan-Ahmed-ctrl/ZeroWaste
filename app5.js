const express = require ("express");
const app = express();
const cookiePraser = require('cookie-parser');
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;


const multer = require("multer");
const { google } = require("googleapis");
const authRoutes = require('./Zroutes/routes')
const fs = require("fs");
const { uptime } = require("process");
const path = require("path");
const axios = require("axios");
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));
app.use(cookiePraser());
app.use(express.json())

app.set("view engine" , "ejs")

app.listen(port, function(){
    console.log('Server up running')
});

app.use(authRoutes);
