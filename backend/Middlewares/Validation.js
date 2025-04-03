const joi = require ("joi")

const signUpValidation = (req,res,next)=>{
    const schema = joi.object({
        name : joi.string().min(3).max(100).required(),
        email : joi.string().email().required(),
        password : joi.string().min(8).max(100).required(),
    });

    const {error} = schema.validate(req.body);
    if (error){
        return res.status(400)
        .json({message :"Bad Request ",e})
    }
    next();
}

const signInValidation = (req,res,next)=>{
    const schema = joi.object({
        email : joi.string.email().required(),
        password : joi.string.min(8).max(100).required(),
    });

    const {e} = schema.validate(req.body);
    if (e){
        return res.status(400)
        .json({message :"Bad Request ",e})
    }
    next();
}
module.exports ={
    signUpValidation,
    signInValidation
}