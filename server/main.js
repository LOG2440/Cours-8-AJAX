const express = require("express");
const router = require("./router.js");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de gestion des cours",
      version: "1.0.0",
      description: "API pour gérer des cours avec des opérations CRUD",
    },
  },
  apis: ["./router.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);


const app = express();
app.use(cors());
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { operationsSorter: "alpha" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cours", router);

const port = 5000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
