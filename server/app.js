const express = require("express");
const cors = require("cors");
require("dotenv").config();
const analyzeRouter = require("./routes/analyze.js");
const grammarCheck = require("./routes/grammarChecker.js");
const spellChecker = require("./routes/spellChecker.js");

const app = express();
const port = 5000;

//config cors
app.use(cors());
app.use(express.json()); //for parsing application/json

//routes
app.use("/api/analyze", analyzeRouter);
app.use("/api/grammarcheck", grammarCheck);
app.use("/api/spellcheck", spellChecker);
//start server
app.listen(port, () => {
  console.log(`AI Writing app listening at http://localhost:${port}`);
});
