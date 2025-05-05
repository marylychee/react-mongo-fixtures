import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

// MongoDB Mongoose connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Express Server
const app = express();
const port = process.env.PORT || 9000
  
app.get('/', (request, response)=>{
  response.status(200);
    response.send("This is from root");
});
  
app.listen(port, (error) =>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port "+ port)
    else 
        console.log("Error occurred, server can't start", error);
    }
);