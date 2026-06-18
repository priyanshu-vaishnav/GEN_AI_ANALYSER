const mongoose = require('mongoose')

async function connectDB() {
    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected 👍")
    } 
    catch(err){
        console.log("Cannot connect to db "+err)
    }
}
module.exports = connectDB