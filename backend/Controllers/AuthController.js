const UserModel = require("../Models/User");
const bcrypt = require ('bcrypt')
const signup= async (req,res) =>{
    try {
        const {name ,email ,password} = req.body;
        const user = await UserModel.findOne({email})
        if (user){
            return res.status(409).json({message:'User is already exists you  can login', success:false})
        }
        const userModel = new UserModel({name, email,password});
        userModel.password = await bcrypt.hash (password,10)
        await userModel.save();
        res.status(201) .json({
            message:"Sign-Up succesfully",
            success :true
        })
    } catch (e) {
        res.status(500)
        .json({
            message:"Internal server error",
            success:false
        })
        console.log(e)
    }
}

module.exports = {signup,}