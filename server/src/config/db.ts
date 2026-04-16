import mongoose from "mongoose"

export const connectDB = async () => {
  try {

    await mongoose.connect("mongodb+srv://ritikamaheshwari_db_user:rR0aRB5qo5m3RzZX@cluster0.y0vtvdz.mongodb.net/autonomous-vault?retryWrites=true&w=majority")

    console.log("MongoDB Connected")

  } catch (error) {

    console.error("MongoDB Error:", error)
    process.exit(1)

  }
}