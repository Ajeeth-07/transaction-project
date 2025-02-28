const express = require("express");
const rootRouter = require("./routes/index.js"); 
const app = express();
const cors = require("cors");
const JWT_SECRET = require("./config.js")


app.use(cors({origin : "http://localhost:5173"}));
app.use(express.json());


app.use("/api/v1", rootRouter);


app.listen(3000);

