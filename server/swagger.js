const swaggerJSDoc = require("swagger-jsdoc");

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
 *          404:
 *              description: Le cours spécifique n'est pas trouvé
 */

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

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de gestion des cours",
      version: "1.0.0",
      description: "API pour gérer des cours avec des opérations CRUD",
    },
  },
  apis: [__filename],
};

module.exports = swaggerJSDoc(swaggerOptions);
