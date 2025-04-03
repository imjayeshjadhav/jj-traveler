const UserModel = require("../Models/User");
const bcrypt = require ('bcrypt')
const jwt = require("jsonwebtoken")
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

const signin= async (req,res) =>{
    try {
        const {email ,password} = req.body;
        const user = await UserModel.findOne({email})
        const errmsg = "Email or password is wrong"

        if (!user){
            return res.status(403).json({message:errmsg, success:false})
        }

        const isPassEqual = await bcrypt.compare(password,user.password)
        if(!isPassEqual){
            return res.status(403).json({message:errmsg, success:false})
        }
        const jwtToken = jwt.sign({email:user.email, _id : user._id},
            process.env.JWT_SECRET,
            {expiresIn :'24h'}
        )


        res.status(200) .json({
            message:"Login succesfully",
            success :true,
            jwtToken,
            name : user.name,
            email
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

module.exports = {signup,
    signin
}