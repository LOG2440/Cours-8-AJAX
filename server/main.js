const express = require("express");
const router = require("./router.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cours", router);

const port = 5000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
