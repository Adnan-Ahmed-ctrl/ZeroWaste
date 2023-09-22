const path = require('path');
module.exports.get_home = (req,res)=>{
    let loc = path.join(__dirname , ".." , '/views/index.html')
    res.sendFile(loc)
    // res.render('index');
}
module.exports.get_about = (req,res)=>{
    res.render('about us');
}
module.exports.try = (req,res)=>{
    res.render('tryPayment');
}