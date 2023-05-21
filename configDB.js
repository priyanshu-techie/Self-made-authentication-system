const mongoose=require('mongoose');

module.exports= function connectDb(){
    mongoose.connect("mongodb://localhost:27017/learningAuth", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('db connected'))
        .catch(err => console.error('Could not connect to MongoDB', err));
}