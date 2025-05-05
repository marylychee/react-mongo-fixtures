import express from 'express';

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