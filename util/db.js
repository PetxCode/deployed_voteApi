const mongoose = require("mongoose");

const url = "mongodb://localhost/votersDB";
const newURL =
  "mongodb+srv://AuthClass:AuthClass@codelab.u4drr.mongodb.net/VotersDB?retryWrites=true&w=majority";
const urlOnline =
  "mongodb+srv://OneChurch:<OneChurch@cluster0.q3zol.mongodb.net/youthCouncil?retryWrites=true&w=majority";

const url2 =
  "mongodb+srv://newStudent:newStudent@cluster0.gkpjkup.mongodb.net/voterDB?retryWrites=true&w=majority";

mongoose.connect(newURL, () => {
  console.log("database is now connected...!");
});

module.export = mongoose;
