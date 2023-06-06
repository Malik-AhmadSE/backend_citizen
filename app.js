const express=require('express');
const errorHandler = require('./middlewares/errorHandler');
const app=express();
const config=require('./config/index');
const connectdb=require('./db/connectdb');
const cookieParser = require('cookie-parser');
const cors=require('cors');
const port =config.PORT;
const host=config.HOST;
const DataBase=config.DATABASE_URL;
const routes = require('./routes/routes');
app.use(cors());
app.use(cookieParser());
connectdb(DataBase);
app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.listen(port,host,()=>{
    console.log(`http://${host}:${port}`);
})

