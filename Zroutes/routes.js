const { Router } = require('express');
const accounts = require('../Zapps/accounts');
const display = require('../Zapps/display');
const register = require('../Zapps/register');
const home_Zero = require('../Zapps/home_Zero');
const home_HOP = require('../Zapps/home_HOP');
const seller = require('../Zapps/seller');
const Form = require('../Zapps/Form');
const ZeroAdmin = require("../Zapps/ZeroAdmin");
const charity = require("../Zapps/charity");
const home = require("../Zapps/home");
const Donate = require('../Zapps/Donate');
const HOP_ADMIN = require('../Zapps/HOP_ADMIN');

const multer = require("multer");


const routes = Router();
routes.get('/', home_Zero.get_home);
routes.get('/try', home_Zero.try);
routes.get('/ZeroWaste', home_Zero.get_home);
routes.get('/about', home_Zero.get_about);
routes.get('/HOP', home_HOP.get_home);
routes.get('/help', charity.help);
routes.get('/login', accounts.login);
routes.get('/logout', accounts.logout);
routes.get('/logedin', accounts.logedin);

routes.get('/admin', accounts.admin);
routes.get('/admin_logedin', accounts.admin_logedin);
routes.post('/admin', accounts.admin_login_post);

routes.post('/login', accounts.login_post);

routes.get('/donation', home.get_home);

routes.get('/FundDonate', Donate.Fund);
routes.get('/FoodDonate', Donate.Food);
routes.get('/ClothDonate', Donate.Cloth);
routes.get('/OtherDonate', Donate.Other);

routes.get('/billing', seller.billing_get);
routes.post('/billing', seller.billing_post);


routes.get('/HOP_AD', HOP_ADMIN.checker_get);
routes.post('/HOP_AD', HOP_ADMIN.checker_post);

routes.get('/ZeroAdmin', ZeroAdmin.checker_get);
routes.post('/ZeroAdmin', ZeroAdmin.checker_post);

routes.get('/display', display.display);
routes.get('/BuyFood', Form.Food_get);
routes.get('/BuyCompost', Form.Compost_get);
routes.get('/BuyFuel', Form.Fuel_get);

routes.get('/provide', register.provide);

routes.get('/successful', register.success);
routes.get('/seller', seller.seller);
routes.post('/seller', seller.seller_post);
routes.post('/BuyFood', Form.Food_post);
routes.post('/BuyCompost', Form.Compost_post);
routes.post('/BuyFuel', Form.Fuel_post);


// routes.get('/payment', Form.payment_get);
routes.post('/payment', Form.payment_post);

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../ZeroWaste/images/Hotel");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
const upload = multer({ storage: fileStorageEngine });
routes.post('/single', upload.single("image"), register.provide_post);

const fileStorageEngine2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../ZeroWaste/images/organization");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload2 = multer({ storage: fileStorageEngine2 });
const path = require('path');

routes.post('/help', upload2.single("image"), charity.help_post);


module.exports = routes;