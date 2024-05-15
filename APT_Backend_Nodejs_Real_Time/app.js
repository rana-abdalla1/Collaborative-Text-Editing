const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");
const CRDTStructure = require("./CRDTStructure");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const documentModel = require("./models/documentModel");

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // for parsing application/json
const DB =
  "mongodb+srv://husseinhadidy1:JB0C36l5FuHYEYOD@clusterapt.cpkqxyk.mongodb.net/APTDatabase";

let crdts = new Map();

app.get("/document", (req, res) => {
  let nodes = Array.from(crdt.nodes._elements);
  res.json(nodes);
});
const socketPort = 3001;
const socketServer = http.createServer(); // Create a new HTTP server for the Socket.IO server
const io = new Server(socketServer, {
  pingTimeout: 600000,
  cors: {
    origin: "*", // removed a /   to test
  },
});
mongoose.connect(DB).then(() => {
  console.log("db connection success");
  io.on("connection", async (socket) => {
    console.log("User connected");
    const userId = socket.handshake.query.userId;
    const documentId = socket.handshake.query.documentId;
    const document = await documentModel.findById(documentId);
    const user = await userModel.findById(userId);
    if (!document || !user) {
      console.log("Document or user not found");
      return socket.disconnect();
    }
    if (crdts.has(documentId)) {
      console.log("document already loaded in memory");
    } else {
      console.log("loading document from database");
      let crdt = new CRDTStructure();
      crdt.myFromArray(document.nodes);
      crdts.set(documentId, crdt);
    }
    const tmp = crdts.get(documentId).myToArray();
    console.log("Sending document to user", crdts.get(documentId).myToString());
    console.log("Sending document to user", tmp);
    socket.emit("receive document", tmp);

    const permission = document.users.get(userId);
    socket.join(documentId);
    socket.on("insert", (node) => {
      if (permission !== "editor") {
        return;
      }
      console.log("Node added", node);
      socket.in(documentId).emit("nodeInserted", node);
      let crdt = crdts.get(documentId);
      crdt.addNode(node);
      crdts.set(documentId, crdt);
      console.log("Node inserted", crdt.myToString());
    });
    socket.on("Edit", (nodes) => {
      if (permission !== "editor") {
        return;
      }
      console.log("Node Edited", nodes);
      socket.in(documentId).emit("nodeEdited", nodes);
      let crdt = crdts.get(documentId);
      for (let i = 0; i < nodes.length; i++) {
        crdt.updateNode(nodes[i]);
      }
      crdts.set(documentId, crdt);
    });

    socket.on("delete", (node) => {
      if (permission !== "editor") {
        return;
      }
      console.log("Node deleted", node);
      socket.in(documentId).emit("nodeDeleted", node);
      let crdt = crdts.get(documentId);
      crdt.removeNode(node);
      crdts.set(documentId, crdt);
    });

    socket.on("disconnect", async () => {
      let room = io.sockets.adapter.rooms[documentId];
      if (!room || room.length === 0) {
        console.log("Room is empty");
        let crdt = crdts.get(documentId);
        crdt.cleanup();
        await documentModel.findByIdAndUpdate(documentId, {
          nodes: crdt.myToArray(),
        });
      }
    });
  });
});

socketServer.listen(socketPort, () => {
  // Start the Socket.IO server on port 3005
  console.log(`Socket.IO server running on port ${socketPort}...`);
});
