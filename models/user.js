const mongoose =  require('mongoose');
const Schema  = mongoose.Schema;
const { createHmac } = require('crypto');

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
    encrypt_password:{
        type:String,
        require:true
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

userSchema.method = {
    securePassword: function(password){
        if(!password) return ""
        try {
            return createHmac('sha256', this.salt)
                    .update(password)
                    .digest('hex');
        } catch (error) {
            return "";
        }
    }
}

module.exports = mongoose.model('User',userSchema)