const {signup, signin} = require('../Controllers/AuthController');
const { signUpValidation, signInValidation } = require('../Middlewares/Validation');

const router = require ('express').Router()

router.post('/sign-in', signInValidation, signin)

router.post('/sign-up',signUpValidation,signup)

module.exports= router;