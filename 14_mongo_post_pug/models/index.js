import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
	console.log("Connected to MongoDB")
})

export default mongoose