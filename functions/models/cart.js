const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
      },
    items:{
        type: [Object],
        sparse: true,
      },
},{timestamps:true});
const Cart=mongoose.model('Cart',cartSchema);
module.exports=Cart;