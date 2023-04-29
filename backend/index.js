const express=require('express');
const app = express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const path=require('path');
const fs =require('fs');
const flash = require('connect-flash')
const session=require('express-session');
const cookieParser = require('cookie-parser');
// @ts-ignore
const toastr=require('express-toastr');
const toastrMiddleware=require('./config/middleware');
// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
//   }
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'../frontend')));
app.use(express.static(__dirname));
app.use(expressLayouts);
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie:{maxAge:10000}
}));
app.use(flash());
app.use(toastr({
    closeButton: true
}));
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine','ejs');
app.set('views','./views');
app.use(toastrMiddleware.checkUrl);
app.use('/',require('./routes/index'));
    app.listen(8000,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("listening on port 8000 succesfully");
})

// var createCustomer= function(){
//     var param={}
//     param.email="raghav@gmail.com";
//     param.name="Raghav";
//     param.description="from node";

//     stripe.customers.create(param,function(err,customer){
//         if(err){
//             console.log(err);
//         }
//         if(customer){
//             console.log("success",customer);
//         }
//         else{
//             console.log("something wrong");
//         }
//     })
// }
// createCustomer();