
const dotenv=-require('dotenv').config();
const PORT=process.env.PORT;
const HOST=process.env.HOST;
const DATABASE_URL = process.env.DATABASE_URL;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH;
const DATABASE_OPTIONS ={
    // 'user': process.env. DATABASE_USER,
    // 'pass': process.env.DATABASE_PASS,
    'dbName':process.env. DATABASE_NAME,
    // 'authSource': process.env.DATABASE_AUTH   
};

module.exports={
    PORT,
    HOST,
    DATABASE_URL,
    DATABASE_OPTIONS,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    BACKEND_SERVER_PATH
}