const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')();

io.on('connection', socket => {
  console.log('Ok');
  socket.on('connectRom', box =>{
    socket.join(box);
  })
  
})

mongoose.connect('mongodb+srv://calleu:653676@cluster0-of8i8.mongodb.net/omnistack?retryWrites=true',{
  useNewUrlParser: true
})

app.use((req,res, next) => {
  req.io = io;

  return next();
})

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes.js'));

app.listen(3333);