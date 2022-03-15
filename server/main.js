const express = require("express");
const cors = require("cors");
const profRouter = require("./prof");
const coursRouter = require("./cours");
const port = 5000;

const app = express();
const urlencodedParser = express.urlencoded({ extended: false });

// Middlewares utilitaires
app.use(cors());
app.use(express.json());
app.use(urlencodedParser);

// Configuration des routeurs
app.use("/cours", coursRouter.router);
app.use("/prof", profRouter.router);

app.listen(port);
