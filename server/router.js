const router = require('express').Router();

let listeDeCours = [
    { sigle: "LOG2990", credits: 4 },
    { sigle: "LOG4420", credits: 3 },
    { sigle: "LOG1000", credits: 3 },
    { sigle: "MTH1102", credits: 2 },
];

router.get("/", function (req, res) {
    res.send(listeDeCours);
});

router.get("/:sigle", function (req, res) {
    const cours = listeDeCours.find((c) => {
        return c.sigle === req.params.sigle;
    });
    res.send(cours);
});

router.post("/", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    if (listeDeCours.find((c) => c.sigle === req.body.sigle)) {
        return res.status(409).send("Le cours existe déjà");
    }
    const cours = { sigle: req.body.sigle, credits: parseInt(req.body.credits) };
    listeDeCours.push(cours);
    res.status(201).send(cours.sigle + " a été ajouté");
});

router.delete("/:sigle", function (req, res) {
    const taille = listeDeCours.length;
    listeDeCours = listeDeCours.filter((c) => c.sigle !== req.params.sigle);
    if (taille > listeDeCours.length) res.sendStatus(204);
    else res.status(404).send("Echec de suppression : cours introuvable dans la liste");
});

router.patch("/", function (req, res) {
    const cours = listeDeCours.find((c) => {
        return c.sigle === req.body.sigle;
    });
    if (!cours) return res.status(404).send("Ce cours n'existe pas");
    cours.credits = req.body.credits;
    res.send("Cours modifié");
});

module.exports = router;