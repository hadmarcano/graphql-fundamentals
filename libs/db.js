// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Database is connected"))
//   .catch((error) => console.log("Error!", error));

const { MongoClient } = require("mongodb");

const mongoUrl = `${process.env.MONGODB_URL}`;
let connection;

async function connectDB() {
  if (connection) return connection;

  let client;
  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
    });
    connection = client.db(process.env.DB_NAME);
  } catch (error) {
    console.error("No se pude conectar a la bd", mongoUrl, error);
    procces.exit(1);
  }

  return connection;
}

module.exports = connectDB;
