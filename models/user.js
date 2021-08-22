const mongoose =  require('mongoose');
const Schema  = mongoose.Schema;

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:32
    },
    lastname:{
        type:String,
        trim:true,
        maxLength:32
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    // TODO: password hashing remaining
    password:{
        type:String,
        trim:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
});

module.exports = mongoose.model('user',userSchema)