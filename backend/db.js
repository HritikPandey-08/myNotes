// We are using common js module as we are in node.js 
const mongoose = require('mongoose');
const mongoURI = 'mongodb://0.0.0.0:27017/inotebook' //connection string we get from mongo compress


//Now for connection we will create a arrow function

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB server'))
  .catch(err => console.error('Error connecting to MongoDB server', err));
}

//Exporting the module 

module.exports = connectToMongo