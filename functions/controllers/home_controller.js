const path=require('path');
const fs=require('fs');
const User=require('../models/reservation');
const Cart=require('../models/cart');
// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
// initializeApp();

// const db = getFirestore();

const { name } = require('ejs');
const { json } = require('express');
const { error } = require('console');
function generateCartId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base 36 string
    const randomChars = Math.random().toString(36).substring(2, 8); // Generate random characters
  
    return timestamp + randomChars;
  }

module.exports.menu=async function(req,res){
  let cartId = req.cookies.cartId;
    if (!cartId) {
    // Generate a new cart identifier
    cartId = generateCartId();
    // Set the cartId cookie with the identifier
    // req.session.cartId=cartId;
    res.setHeader('Set-Cookie', `cartId=${cartId}; Max-Age=86400000;secure`);
    // res.cookie('cartId', cartId, { maxAge: 86400000 }); // expiration time for the cookie (ie., 24 hours)

    // Create a new cart for the user
    newCart = await Cart.create({
      userId: cartId,
      items: [] // Empty items array for now
    });
    
    newCart.save()
    .then(() => {
      console.log('Cart created successfully for user:', cartId);
      })
      .catch((error) => {
        console.error('Error creating cart for user:', cartId);
      });
  }else{
    console.log("helooooo");
    newCart=await Cart.findOne({userId:cartId});
  }
  
        let cartItems= newCart.items;
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

    }

module.exports.cartItems=async function(req,res){
    
    let cartId = req.cookies.cartId;
    console.log(cartId);
    // const cart=path.join(__dirname,'../cart');
    // fs.writeFileSync(cart,req.body.data);
     await Cart.findOneAndUpdate({userId:cartId},{items:JSON.parse(req.body.data)});

    // fileRef.uploadBytes(new Blob([req.body.data]));
    let data=await Cart.findOne({userId:cartId});
    
        // Do something with the data
        let cartItems=data.items;
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

            return res.redirect('back');
    }
module.exports.reservation=function(req,res){
    const keys=Object.keys(req.body)[0];
    const parsedData=JSON.parse(keys);
    
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