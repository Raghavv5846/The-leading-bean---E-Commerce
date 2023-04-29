const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    first_name:{
        type:'String',
        required:true,
    },
    email:{
        type:'String',
        required:true,
    },
    Date:{
        type:Date,
        required:true,
    },
    time:{
        type:"String",
        required:true,
    },
    phone_no:{
        type:'String',
        required:true,
    },
    party_size:{
        type:'String',
        required:true,
    }
},{timestamps:true});
const User=mongoose.model('User',userSchema);
module.exports=User;