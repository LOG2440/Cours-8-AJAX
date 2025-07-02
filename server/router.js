const router = require('express').Router();

let listeDeCours = [
    { sigle: "LOG2990", credits: 4 },
    { sigle: "LOG4420", credits: 3 },
    { sigle: "LOG1000", credits: 3 },
    { sigle: "MTH1102", credits: 2 },
];

/**
 * @swagger
 * definitions:
 *  Cours:
 *    type: object
 *    properties:
 *      sigle:
 *        type: string
 *      credits:
 *        type: integer
 * tags:
 *   - name: Cours
 *     description: Opérations sur les cours
 */



/**
 * @swagger
 * /cours:
 *   get:
 *     summary: Récupérer la liste des cours
 *     tags:
 *       - Cours
 *     responses:
 *       200:
 *         description: Liste des cours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Cours'
 *               example:
 *               - sigle: "LOG2990"
 *                 credits: 4
 *               - sigle: "LOG4420"
 *                 credits: 3
 */
router.get("/", function (req, res) {
    res.send(listeDeCours);
});

/**
 * @swagger
 * /cours/{sigle}:
 *  get:
 *      summary: Récupérer un cours par son sigle
 *      tags:
 *        - Cours
 *      parameters:
 *         - in: path
 *           name: sigle
 *           required: true
 *           description: Le sigle du cours à récupérer
 *           type: string
 *           example: LOG2990
 *      responses:
 *          200:
 *              description: Détails du cours
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Cours'
 *                      example:
 *                          sigle: "LOG2990"
 *                          credits: 4
 */
router.get("/:sigle", function (req, res) {
    const cours = listeDeCours.find((c) => {
        return c.sigle === req.params.sigle;
    });
    res.send(cours);
});

/**
 * @swagger
 * /cours:
 *  post:
 *    summary: Ajouter un nouveau cours
 *    tags:
 *      - Cours
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Cours'
 *          example:
 *            sigle: "LOG2995"
 *            credits: 3
 *    responses:
 *        201:
 *          description: Cours ajouté avec succès
 *          content:
 *            text/plain:
 *                example: "LOG2990 a été ajouté"
 *        400:
 *         description: Requête invalide, le corps de la requête est manquant
 *        409:
 *         description: Conflit, le cours existe déjà
 *         content:
 *           text/plain:
 *              example: "Le cours existe déjà"
 */
router.post("/", function (req, res) {
    if (!req.body) return res.sendStatus(400);
    if (listeDeCours.find((c) => c.sigle === req.body.sigle)) {
        return res.status(409).send("Le cours existe déjà");
    }
    const cours = { sigle: req.body.sigle, credits: parseInt(req.body.credits) };
    listeDeCours.push(cours);
    res.status(201).send(cours.sigle + " a été ajouté");
});

/**
 * @swagger
 * /cours/{sigle}:
 *  delete:
 *      summary: Supprimer un cours par son sigle
 *      tags:
 *         - Cours
 *      parameters:
 *         - in: path
 *           name: sigle
 *           required: true
 *           description: Le sigle du cours à supprimer
 *           type: string
 *           example: LOG2990
 *      responses:
 *          204:
 *              description: Cours supprimé avec succès
 *          404:
 *              description: Cours introuvable dans la liste
 */
router.delete("/:sigle", function (req, res) {
    const taille = listeDeCours.length;
    listeDeCours = listeDeCours.filter((c) => c.sigle !== req.params.sigle);
    if (taille > listeDeCours.length) res.sendStatus(204);
    else res.status(404).send("Echec de suppression : cours introuvable dans la liste");
});

/**
 * @swagger
 * /cours:
 *   patch:
 *     summary: Mettre à jour un cours
 *     tags:
 *       - Cours
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Cours'
 *           example:
 *             sigle: "LOG2990"
 *             credits: 5
 *     responses:
 *       200:
 *         description: Cours mis à jour avec succès
 *       404:
 *         description: Cours introuvable
 */
router.patch("/", function (req, res) {
    const cours = listeDeCours.find((c) => {
        return c.sigle === req.body.sigle;
    });
    if (!cours) return res.status(404).send("Ce cours n'existe pas");
    cours.credits = req.body.credits;
    res.send("Cours modifié");
});

module.exports = router;