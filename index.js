const express = require("express");
const cors = require("cors");
// const DB = require("./util/db");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const user = require("./router/userRoute");
const organisation = require("./router/organisationRoute");

const president = require("./router/presidentRoute");
const vicepresident = require("./router/vicePresidentRoute");
const secretary = require("./router/secretaryRoute");
const socialSecretary = require("./router/socialSecretaryRoute");
const pro = require("./router/proRoute");
const legal = require("./router/legalRoute");

const presVote = require("./router/voters/votersRouter");
const viceVote = require("./router/voters/viceVote");
const secVote = require("./router/voters/secVote");
const socialVote = require("./router/voters/socialVote");
const proVote = require("./router/voters/proVoter");
const legalVote = require("./router/voters/legalVote");

const port = 2233;
const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const url = "mongodb://localhost/votersDB";
const newURL =
  "mongodb+srv://AuthClass:AuthClass@codelab.u4drr.mongodb.net/VotersDB?retryWrites=true&w=majority";
const urlOnline =
  "mongodb+srv://OneChurch:OneChurch@cluster0.q3zol.mongodb.net/youthCouncil?retryWrites=true&w=majority";

const url2 =
  "mongodb+srv://newStudent:newStudent@cluster0.gkpjkup.mongodb.net/voterDB?retryWrites=true&w=majority";

mongoose.connect(urlOnline).then(() => {
  console.log("Database is now well connected!");
});

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ message: "This is the Voting API" });
});

app.use("/api/user", user);
app.use("/api/organisation", organisation);

app.use("/api/president", president);
app.use("/api/vicepresident", vicepresident);
app.use("/api/secretary", secretary);
app.use("/api/socialSecretary", socialSecretary);
app.use("/api/pro", pro);
app.use("/api/legal", legal);

app.use("/api/presVote", presVote);
app.use("/api/viceVote", viceVote);
app.use("/api/secVote", secVote);
app.use("/api/socialVote", socialVote);
app.use("/api/proVote", proVote);
app.use("/api/legalVote", legalVote);

const db = mongoose.connection;

db.on("open", () => {
  const observer = db.collection("candidates").watch();

  observer.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      io.emit("candidate");
    }
  });
});

db.on("open", () => {
  const observer = db.collection("legalVotes").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      io.emit("legal");
    }
  });
});

db.on("open", () => {
  const observer = db.collection("pross").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      io.emit("pro");
    }
  });
});

db.on("open", () => {
  const observer = db.collection("secretaryVotes").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      io.emit("secretary");
    }
  });
});

db.on("open", () => {
  const observer = db.collection("socialSecs").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      io.emit("social");
    }
  });
});

db.on("open", () => {
  const observer = db.collection("vicePresys").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      io.emit("vicepresident");
    }
  });
});

db.on("open", () => {
  const observer = db.collection("presys").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      io.emit("president");
    }
  });
});

db.on("open", () => {
  const observer = db.collection("voters").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      io.emit("voter");
    }
  });
});

server.listen(process.env.PORT || port, () => {
  console.log("");
  console.log("server is now ready...!");
  console.log("");
});
