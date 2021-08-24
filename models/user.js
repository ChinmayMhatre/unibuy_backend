const mongoose =  require('mongoose');
const Schema  = mongoose.Schema;
const { createHmac } = require('crypto');
const { v4: uuidv4 } = require('uuid');


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

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv4();
        this.encrypt_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

userSchema.method = {
    authenticate: function(plainPassword){
        return this.securePassword(plainPassword) === this.encrypt_password
    },
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