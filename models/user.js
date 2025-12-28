const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    });
    // some module systems expose the plugin as a default property
    const plm = passportLocalMongoose && passportLocalMongoose.default ? passportLocalMongoose.default : passportLocalMongoose;
    userSchema.plugin(plm);
    module.exports=mongoose.model("User",userSchema);
