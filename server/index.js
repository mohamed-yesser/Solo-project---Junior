const express=require("express")
const app=express()
const db = require('./models/index')
const cors = require('cors')

const port = 1128


app.listen(port,()=>console.log("server is running on port",port))