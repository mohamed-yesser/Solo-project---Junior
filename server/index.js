const express=require("express")

const dotenv = require("dotenv");
dotenv.config();
const UserRoutes = require('./routes/user.routes')
const PostRoutes = require('./routes/post.routes')
const CommentRoutes = require('./routes/comment.routes')

const app=express()
const db = require('./models/index')
const cors = require('cors')


app.use(express.json())
app.use(cors())


app.use('/users',UserRoutes)
app.use('/posts',PostRoutes)
app.use('/comment',CommentRoutes)




const port = 1128


app.listen(port,()=>console.log("server is running on port",port))