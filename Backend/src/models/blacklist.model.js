const mongoose=require ("mongoose");

const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in blacklist"]
    }
},{
    timestamps:true
})

const tokenBlackListModel=mongoose.model("blacklist",blacklistTokenSchema);

module.exports=tokenBlackListModel