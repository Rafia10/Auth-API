const http = require("http");
const mongoose = require("mongoose");
const { UpdateUserEmail } = require("./api/controller/test");
const app = require("./app");

const server = http.createServer(app);
const port = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://Rafia:088gCbJcZmubKsJp@cluster0.yatyr.mongodb.net/Cluster0?retryWrites=true&w=majority"
    );
    server.listen(port, console.log("Server is up and running"));
  } catch (error) {
    console.log("Connection failed");
  }
}

start();
