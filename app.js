import express from "express"
import config from "config"
import userRouter from "./controllers/Users/index.js"
import "./utils/dbConnect.js"

const app=express();
const PORT = config.get("PORT")

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send("<h1>Hello Server is Running 🚀</h1>");
})

//calling route post 

app.use("/users",userRouter)

app.listen(PORT,()=>{
    console.log(`Sever is running on port ${PORT}`);
    
})