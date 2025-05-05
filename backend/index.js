import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import csvtojson from 'csvtojson';
import 'dotenv/config';
import Fixture from './model.js';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 9000

const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'text/csv' || path.extname(file.originalname).toLowerCase() !== '.csv') {
      return cb(new Error('Only CSV files are allowed'), false)
    }
    cb(null, true)
  },
})

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).send(error.message)
  }
  next(error)
})

app.post('/upload', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }

  csvtojson()
  .fromFile(req.file.path)
  .then((source)=>{
    var arrayToInsert = [];  
    for (var i = 0; i < source.length; i++) {
      var oneRow = {
          fixtureMid: source[i]['fixture_mid'],
          season: source[i]['season'],
          competitionName: source[i]['competition_name'],
          fixtureDatetime: source[i]['fixture_datetime'],
          fixtureRound: source[i]['fixture_round'],
          homeTeam: source[i]['home_team'],
          awayTeam: source[i]['away_team'], 
      };
      arrayToInsert.push(oneRow);
    }
    Fixture.insertMany(arrayToInsert).then(function(){
      console.log(Fixture)
      res.status(200).send({
          message: "Successfully Uploaded!"
      });
    }).catch(function(error){
      console.log('ther', error);
      res.status(500).send({
          message: "failure",
          error
      });
    });
  }).catch((error) => {
    res.status(500).send({
        message: "failure",
        error
    });
})

})
  
app.listen(port, (error) =>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port "+ port)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

// MongoDB Mongoose connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});