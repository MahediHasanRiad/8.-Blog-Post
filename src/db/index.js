import mongoose from "mongoose";

async function connectDB() {

  const PASSWORD = process.env.DB_USER_PASSWORD;
  const connectURL = process.env.DB_URL.replace('<db_password>', PASSWORD)

  const db = await mongoose.connect(
    `${connectURL}/${process.env.DB_NAME}`,
  );

  return db
}

module.exports = connectDB
