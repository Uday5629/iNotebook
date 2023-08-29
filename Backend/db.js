const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/i-notebook"

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log("connected to mongoose successfully");
    })
}

module.exports =connectToMongo;