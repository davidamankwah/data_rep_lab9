const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//mongodb+srv://admin:<password>@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority
// getting-started.js
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

//Define schema 
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});

const bookModel = mongoose.model('Booksgdfgdfgdfgsss', bookSchema); //bookModel allow interaction with database.

//send books
app.post('/api/books',(req,res)=>{
  console.log(req.body);

  bookModel.create({
    title: req.body.title,
    cover:req.body.cover,
    author:req.body.author
  })
  
  res.send('Data Recieved');
})

//a  route point that returns a book information
app.get('/api/books', (req, res) => {
  bookModel.find((error, data)=>{
    res.json(data);
  })
})


//listen for delete method
app.delete('/api/book/:id', (req, res) => {
  console.log("Deleting: "+req.params.id); //output deleted book id to console

  //find book by id to delete
  //go to database to find id and delete 
  bookModel.findByIdAndDelete({_id: req.params.id},(error, data)=>{
    res.json(data); //send back some data
  })
})

//a  route point that returns a book information by id
app.get('/api/book/:id', (req, res)=>{
  
  bookModel.findById(req.params.id,(error,data)=>{
    res.json(data);
  })
})

//listen request to change book by id
//override the record
app.put('/api/book/:id', (req, res)=>{
  console.log("Update: "+req.params.id); //output update book id to console

  bookModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
    (error,data)=>{
      res.send(data);
    })
})

//connect to port 4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})