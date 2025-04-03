const {signup} = require('../Controllers/AuthController');
const { signUpValidation } = require('../Middlewares/Validation');

const router = require ('express').Router()

router.post('/sign-in', (req,res)=>{
    res.send("login success");
})

router.post('/sign-up',signUpValidation,signup)

module.exports= router;