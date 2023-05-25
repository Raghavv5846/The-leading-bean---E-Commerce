
const onRequest = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const util = require('util');
const express=require('express');
const app = express();
const expressLayouts=require('express-ejs-layouts');
// require('./config/view-helpers')(app);
const db=require('./config/mongoose');
const path=require('path');
const fs =require('fs');
const flash = require('connect-flash')
const session=require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const toastr=require('express-toastr');
const toastrMiddleware=require('./config/middleware');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
console.log(path.join(__dirname,'../frontend/css'));
app.use(express.static(path.join(__dirname,'../public')));
app.use(expressLayouts);
app.use(session({
    name:"tlb",
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:86400000
           },
    store: MongoStore.create(
        {
            mongoUrl: `mongodb+srv://raghavpareek5846:Raghav5846@tlb.7lfempd.mongodb.net/?retryWrites=true&w=majority`,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
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
// app.listen(8000,function(err){
//     if(err){
//         console.log(`error while running on 8000`);
//     }
//     console.log(`800 Server has been succesfully started`);
// })

exports.app = functions.https.onRequest(app);