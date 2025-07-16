import mongoose from "mongoose";

const url = process.env.DB_URL;

const connection = {};

async function connect() {

  if (connection.isconnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isconnected = mongoose.connections[0].readyState;
    if (connection.isconnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
  });
  console.log("connection ON");
 
}

async function disconnect() {
  if (connection.isconnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isconnected = false;
    } else {
      console.log("Not disconnected");
    }
  }
}

const db = { connect, disconnect };
export default db;
