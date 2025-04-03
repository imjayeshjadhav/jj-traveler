const express = require('express')
const app = express()
require('dotenv').config()
const cors = require("cors")
require('./Models/db')
const bodyParser = require('body-parser')
const AuthRouter = require('./Routes/AuthRouter')
const TravelRouter = require('./Routes/TravelRouter')

const PORT = process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.use(bodyParser.json());
app.use(cors())
app.use('/auth',AuthRouter)
app.use('/travel', TravelRouter )

app.listen(PORT, ()=>{
    console.log("server is running")
})