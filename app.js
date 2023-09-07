const express=require('express');
const errorHandler = require('./2-Controllers/middlewares/errorHandler');
const app=express();
const bodyparser =require("body-parser")
const config=require('./config/index');
const connectdb=require('./4-Models/db/connectdb');
const cookieParser = require('cookie-parser');
const cors=require('cors');
app.use(bodyparser.json())
const port =config.PORT;
const host=config.HOST;
const DataBase=config.DATABASE_URL;
const UserRoutes = require('./1-Routes/UserRoutes');
const ProductRoutes = require('./1-Routes/ProductRoutes');
const bodyParser = require('body-parser');
app.use(
    require("cors")({
      origin: "*"
    })
  );
app.use(cookieParser());
app.use(express.static(__dirname + "/public/files"));
app.use(express.static("public"));
connectdb(DataBase);
app.use(express.json());
app.use("/user",UserRoutes);
app.use("/product",ProductRoutes)
app.use(errorHandler);
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.listen(port,host,()=>{
    console.log(`http://${host}:${port}`);
})

