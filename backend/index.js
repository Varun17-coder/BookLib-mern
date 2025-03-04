import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import booksRoute from './routes/booksRoute.js'
import mongoose from 'mongoose';
import cors from 'cors';

const app= express();

// Middle for parsing the body when we use thunderClient to test the APIs
app.use(express.json());

//Middelware for handling CORS policy
//Option 1: Allow all origins with default of cors(*)
app.use(cors());

//Option 2: Allow custom Origins
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//     methods: ['GET','POST','PUT','DELETE'],
//     allowHeaders: ['Content-Type']
//     })
// );

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send("Welcome to Book Store using MERN stack")
})

// app.use(cors());
// handle the routes with prefix as /books from booksRoute.js
app.use('/books',booksRoute); 



// mongoose from here to connect to mongoDB
//mongoose is a famous object data monitoringg library for mongoDB
mongoose
 .connect(mongoDBURL)
 .then(()=>{

   console.log("App connected to database");

   //the app is listened only when database is connected
   app.listen(PORT, ()=>{
    console.log(`App is listening to port ${PORT}`);    
});
 })
 .catch((error)=>{
    console.log(error)
 })