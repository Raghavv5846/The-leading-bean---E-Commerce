const path=require('path');
const fs=require('fs');
const User=require('../models/reservation');
const { name } = require('ejs');
const { json } = require('express');
module.exports.home=function(req,res){
    res.sendFile(path.join(__dirname,'../frontend/index.html'));
}
module.exports.menu=function(req,res){
    console.log("helooooo");
    const cart=path.join(__dirname,'../cart');
    fs.readFile(cart,"utf8",(err,data)=>{
        if(err){
            throw err;
        }
        // console.log("hellloooo",JSON.parse(data));
        let cartItems=JSON.parse(data);
        let quantity;
        if(cartItems.length==0){
            quantity=0
        }
        else{
            quantity=cartItems.length;
        }
        res.render('section',{
            quantity:quantity,
            cartItems:cartItems,
            req:req,
            flash:req.flash()
        });
    });
}

module.exports.cartItems=function(req,res){
    console.log("hello",req.body.data);
    const cart=path.join(__dirname,'../cart');
    fs.writeFileSync(cart,req.body.data);
    fs.readFile(cart,"utf8",(err,data)=>{
        if(err){
                throw err;
            }
            let cartItems=JSON.parse(data);
            let quantity;
            if(cartItems.length==0){
                console.log("yessssssssss");
                quantity=0
            }
            else{
                quantity=cartItems.length;
            }

            req.flash('success', 'Item added to your cart');
            console.log(req.flash().success);
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        flash:req.flash()
                    }
                })
            }
            console.log("helooooooooooo");
            return res.redirect('back');
        });
}
module.exports.reservation=function(req,res){
    const keys=Object.keys(req.body)[0];
    const parsedData=JSON.parse(keys);
    console.log(parsedData);
    User.create({Date: parsedData.Date,first_name: parsedData.first_name,time:parsedData.time,email: parsedData.email,phone_no:parsedData.phone_no,
    party_size: parsedData.party_size}).then((result) => {
        console.log(result);
        res.cookie('flash_message', 'Your reservation has been successfully recieved', { maxAge: 30000 });
        res.send({msg: 'Đã thêm thành công' })
      })
      .catch((err) => {
        console.log("err while saving",err);
      })
}
module.exports.about=function(req,res){
    res.render('about');
}