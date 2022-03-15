const router = require("express").Router();
let data = require("./data").data;

router.use((request, response, next) => {
  console.log(`Une requete est lancée pour les professeurs a ${new Date().toLocaleTimeString()}`);
  next();
});

router.get("/", (req, res) => {
  res.send(data);
});

router.get("/obtenirProf/:nom", (req, res) => {
  const prof = data.find((c) => c.nom === req.params.nom);
  if (prof) {
    res.send({ nom: prof.nom, prenom: prof.prenom });
  } else {
    res.status(404).send("Professeur introuvable dans la liste");
  }
});

router.get("/obtenirCours/:nom", (req, res) => {
  const prof = data.find((c) => c.nom === req.params.nom);
  if (prof) {
    res.send(prof.cours);
  } else {
    res.status(404).send("Cours introuvable dans la liste");
  }
});

router.get("/responsable/:sigle", (req, res) => {
  const prof = data.find((c) => {
    return c.cours.sigle === req.params.sigle;
  });

  if (prof) {
    res.send({
      nom: prof.nom,
      prenom: prof.prenom,
    });
  } else {
    res.status(400).send("Professeur introuvable dans la liste");
  }
});

module.exports = { router };
