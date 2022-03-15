const router = require("express").Router();
let data = require("./data").data;

router.get("/obtenirCours", function (req, res) {
  res.send(data.map((x) => x.cours));
});

router.get("/obtenirCours/:sigle", function (req, res) {
  const cours = data.find((c) => {
    return c.cours.sigle === req.params.sigle;
  });
  res.send(cours);
});

router.post("/ajouterCours", function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const cours = { sigle: req.body.sigle, credits: parseInt(req.body.credits) };
  data.push({ prenom: "Jean", nom: "Tremblay", cours });
  res.status(201).send(cours.sigle + " a été ajouté");
});

router.delete("/supprimerCours/:sigle", function (req, res) {
  const taille = data.length;
  data = data.filter((c) => c.cours.sigle !== req.params.sigle);
  if (taille > data.length) res.send("Cours supprimé.");
  else res.status(400).send("Echec de suppression : cours introuvable dans la liste");
});

router.patch("/modifierCours/", function (req, res) {
  const cours = data.find((c) => {
    return c.cours.sigle === req.body.sigle;
  });
  if (!cours) return res.status(400).send("Ce cours n'existe pas");
  cours.cours.credits = req.body.credits;
  res.send("Cours modifié");
});

module.exports = { router };
