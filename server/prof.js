const router = require("express").Router();

const listeDeProfs = [
  { prenom: "Sylvain", nom: "Martel", cours: { sigle: "INF1500", titre: "Logique des sytèmes numériques" } },
  { prenom: "Nikolay", nom: "Radoev", cours: { sigle: "LOG2440", titre: "Méthodes de dévelopemmrnt et conception d'applications Web" } },
  { prenom: "Levis", nom: "Thériault", cours: { sigle: "LOG2810", titre: "Structures Discrètes" } },
  { prenom: "Michel", nom: "Gagnon", cours: { sigle: "LOG2990", titre: "Projet de logiciel d'application Web" } },
];

router.use((request, response, next) => {
  console.log("Une requete est lancée pour les professeurs");
  next();
});

router.get("/", (req, res) => {
  res.send(listeDeProfs);
});

router.get("/obtenirProf/:nom", (req, res) => {
  const prof = listeDeProfs.find((c) => c.nom === req.params.nom);
  if (prof) {
    res.send(prof);
  } else {
    res.status(404).send("Professeur introuvable dans la liste");
  }
});

router.get("/obtenirCours/:nom", (req, res) => {
  const prof = listeDeProfs.find((c) => c.nom === req.params.nom);
  if (prof) {
    res.send(prof.cours);
  } else {
    res.status(404).send("Cours introuvable dans la liste");
  }
});

router.get("/titulaire/:sigle", (req, res) => {
  const prof = listeDeProfs.find((c) => {
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
