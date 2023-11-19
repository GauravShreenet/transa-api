import mongoose from "mongoose";

export const connectMongoDb = async() => {
    try {
        if(!process.env.MONGO_URL){
            return console.log("No mongobd connection")
        }
        const con = await mongoose.connect(process.env.MONGO_URL);
        con && console.log("MongoDb connected")
    } catch (error) {
        console.log(error)
    }
}