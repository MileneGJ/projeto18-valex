import express from "express";
import 'express-async-errors';
import cors from 'cors';
import router from "./routers";
import errorHandler from "./middlewares/errorHandler";
import './application/setup';

const app = express()

app.use(express.json());
app.use(cors());

app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})