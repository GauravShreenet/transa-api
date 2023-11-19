import "dotenv/config";
import express from 'express'
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 8000;

// routers
import userRouter from "./src/router/userRouter.js"

//middlewares
app.use(express.json());
app.use(cors());

import {connectMongoDb} from './src/router/config/dbConfig.js';
connectMongoDb();



app.use("/api/v1/transa", (req, res)=> {
    res.json({
        message: "You called transaction api"
    });
});


app.use("/api/v1/user", userRouter);

app.get("/", (req, res)=>{
    res.json({
        message: 'server is live'
    })
})
app.use("*", (req, res, next)=> {
    const obj = {
        message: "404 page not found",
        errorCode: 404
    }
    next(obj)
});

// error handling at one place
app.use((error, req, res, next)=>{
    console.log(error);
    //log -- \
    const errorCode = error.errorCode || 500

    res.status(errorCode).json({
        status: "error",
        message: error.message,
    })
})

app.listen(PORT, error=>{
    error 
    ? console.log(error) 
    : console.log(`Server is running at http://localhost:${PORT}`);
});