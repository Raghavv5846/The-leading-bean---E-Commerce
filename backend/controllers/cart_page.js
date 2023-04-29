const path=require('path');
const fs=require('fs');

module.exports.cartPage=function(req,res){
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
        res.render('cartPage',{
            quantity:quantity,
            cartItems:cartItems,

        });
    });

}

module.exports.remove=function(req,res){
    
    let data=JSON.parse(req.body.data);
    let index=data.findIndex(e=>e.name===req.body.removed);
    if(!index){
        clearTimeout(setTimeout(() => {
            // send an error response or close the connection
            res.status(504).send('Gateway Timeout');
        }, 5000));
        console.log("hello");
    }
    if(index!=-1){
        data.splice(index,1);
    }
    
    const cart=path.join(__dirname,'../cart');
    fs.writeFileSync(cart,JSON.stringify(data));
    res.redirect('back');
}
