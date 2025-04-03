const ensureAuthenticated = require('../Middlewares/Auth');

const router  = require('express').Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    res.status(200).json([
        {
            place:'Lonavala',
            season:'Monsoon',

        },
        {
            place:'Mumbai',
            season:'winter'
        }
    ])
})

module.exports = router;