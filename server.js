require("dotenv").config()
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const router = require("./routes/Router")
require("./models/user")
require("./models/post")
const path = require("path")

const app = express();
const port = process.env.PORT || 5001;


app.use(express.json())
app.use(bodyParser.json({limit: "30mb"}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors({origin: true}));
app.use("/api", router);


mongoose.connect(process.env.ATLAS_URI).then((saved) => {
  console.log(`Database connected to localhost: ${port}`);
})

if(process.env.NODE_ENV === "production") {
  app.use(express.static("Client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"Client","build","index.html"));
  })
}

app.listen(port, (req, res) => {
    console.log(`server connected to -> localHost: ${port}`);
  });