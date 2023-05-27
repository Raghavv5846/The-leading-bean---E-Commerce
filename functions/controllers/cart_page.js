const path=require('path');
const fs=require('fs');
const Cart=require('../models/cart');
const { cartItems } = require('./home_controller');
module.exports.cartPage=async function(req,res){
    let cartId = req.cookies.cartId;
    const data= await Cart.findOne({userId:cartId});
    let cartItems;
    if(data){
        // console.log("hellloooo",JSON.parse(data));
        cartItems=data.items;
    }
    else{
        cartItems=[];
    }
        let quantity;
        if(cartItems.length==0){
            quantity=0
        }
        else{
            quantity=cartItems.length;
        }
        res.render('cartPage',{
            quantity:quantity,
            cartItems:cartItems,

        });
    };
module.exports.remove=async function(req,res){
    let cartId = req.cookies.cartId;

    let data=JSON.parse(req.body.data);
    let index=data.findIndex(e=>e.name===req.body.removed);
    if(!index){
        clearTimeout(setTimeout(() => {
            // send an error response or close the connection
            res.status(504).send('Gateway Timeout');
        }, 5000));
        
    }
    if(index!=-1){
        data.splice(index,1);
    }
    await Cart.findOneAndUpdate({userId:cartId},{items:data});
    res.redirect('back');
}
