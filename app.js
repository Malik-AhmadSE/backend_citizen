const express=require('express');
const errorHandler = require('./middlewares/errorHandler');
const app=express();
const bodyparser =require("body-parser")
const config=require('./config/index');
const connectdb=require('./db/connectdb');
const cookieParser = require('cookie-parser');
const cors=require('cors');
app.use(bodyparser.json())
const port =config.PORT;
const host=config.HOST;
const DataBase=config.DATABASE_URL;
const routes = require('./routes/routes');
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
app.use(routes);
app.use(errorHandler);
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.listen(port,host,()=>{
    console.log(`http://${host}:${port}`);
})

