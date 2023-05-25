const path=require('path');
const fs=require('fs');
const Cart=require('../models/cart');
module.exports.cartPage=async function(req,res){
    let cartId = req.session.cartId;
    const data= await Cart.findOne({userId:cartId});
        // console.log("hellloooo",JSON.parse(data));
        let cartItems=data.items;
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
    let cartId = req.session.cartId;

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
