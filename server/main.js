const express = require("express");
const cors = require("cors");
const port = 5000;

const app = express();
app.use(cors());
const urlencodedParser = express.urlencoded({ extended: false });
app.use(express.json());

const listeDeCours = [
  { sigle: "LOG2990", credits: 4 },
  { sigle: "LOG4420", credits: 3 },
  { sigle: "LOG1000", credits: 3 },
  { sigle: "MTH1102", credits: 2 },
];

app.get("/obtenirCours", function (req, res) {
  res.send(listeDeCours);
});

app.get("/obtenirCours/:sigle", function (req, res) {
  const cours = listeDeCours.find((c) => {
    return c.sigle === req.params.sigle;
  });
  res.send(cours);
});

app.post("/ajouterCours", urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const cours = { sigle: req.body.sigle, credits: parseInt(req.body.credits) };
  listeDeCours.push(cours);
  res.status(201).send(cours.sigle + " a été ajouté");
});

app.delete("/supprimerCours/:sigle", function (req, res) {
  const taille = listeDeCours.length;
  listeDeCours = listeDeCours.filter((c) => c.sigle !== req.params.sigle);
  if (taille > listeDeCours.length) res.send("Cours supprimé.");
  else res.status(400).send("Echec de suppression : cours introuvable dans la liste");
});

app.patch("/modifierCours/", urlencodedParser, function (req, res) {
  const cours = listeDeCours.find((c) => {
    return c.sigle === req.body.sigle;
  });
  if (!cours) return res.status(400).send("Ce cours n'existe pas");
  cours.credits = req.body.credits;
  res.send("Cours modifié");
});

app.listen(port);
