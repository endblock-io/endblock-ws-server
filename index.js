const express = require("express");
const { Web3 } = require("web3");
const cors = require("cors");
require("dotenv").config();

// const autoPools = require("./services/autoPools");
const autoPoolsOnly = require("./services/autoPoolsOnly");
// const pools = require("./services/pools");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const web3 = new Web3(process.env.RPC);

app.use(cors());
app.use(express.static(__dirname + "/public"));

// let response = {};
let responseAutoPools = {};
// let poolsData = {}

setInterval(async () => {

    try {
      responseAutoPools = await autoPoolsOnly.autoPoolsAllData(web3);
      console.log(responseAutoPools)
    } catch (error) {
      console.log(error);
    }
  }, 3000);

// setInterval(async () => {

//   try {
//     response = await autoPools.allDatas(web3);
//     // console.log(response)
//   } catch (error) {
//     console.log(error);
//   }
// }, 2500);




// pools v3
// setInterval(async () => {
//   try {
//     poolsData = await pools.poolDatas(web3);
//   } catch (error) {
//     console.log(error);
//   }
// }, 6000);

io.on("connection", (socket) => {
  console.log(socket.id);
});

setInterval(async () => {
  try {
    io.emit("get-pools", JSON.stringify({...responseAutoPools}));
  } catch (error) {
    console.log(error);
  }
}, 2000);

// setInterval(async () => {
//   try {
//     io.emit("get-pools", JSON.stringify(poolsData));
//     // console.log("emited", poolsData);
//   } catch (error) {
//     console.log(error);
//   }
// }, 6000);

server.listen(process.env.PORT, async () => {
  console.log("port:", process.env.PORT);
});
