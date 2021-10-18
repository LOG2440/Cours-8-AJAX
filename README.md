# AJAX

Exemple simple de serveur HTTP et requêtes AJAX dans un navigateur.

Le projet permet de récupérer une liste de cours du serveur HTTP et de générer des nouveaux cours aléatoires ayant le sigle **INF** et un nombre de crédits aléatoires entre 1 et 5.


# Site Web

Le dossier `client` contient un site web simple qui permet de montrer le fonctionnement du principe AJAX.
Il est possible de changer le script utilisé dans le fichier `index.html`.
Notez que comme le site et le serveur n'ont pas la même origine, une requête `OPTIONS` sera lancée avant l'envoie de certaines requêtes HTTP. La gestion du CORS (Cross-Origin Resource Sharing) est faite par le serveur.

## XHR

Le fichier `xhr_exemple.js` contient 2 exemples de requêtes AJAX utilisant XMLHttpRequest. Au lancement, le script lance une requête `GET` pour récupérer tous les cours sur le serveur. Le bouton `Ajouter un cours aléatoire` envoie une requête `POST` qui contient un nouveau cours dans le corps de la requête.

## Fetch

Le fichier `fetch_exemple.js` contient les mêmes 2 exemples de requêtes AJAX que `xhr_exemple.js`, mais utilise l'API Fetch. Au lancement, le script lance une requête `GET` pour récupérer tous les cours sur le serveur. Le bouton `Ajouter un cours aléatoire` envoie une requête `POST` qui contient un nouveau cours dans le corps de la requête.

# Serveur HTTP

L'exemple contient un simple serveur NodeJS avec Express.

Pour installer les dépendances, il faut lancer la commande `npm ci` dans le répertoire `server`.

Pour lancer le serveur, il faut lancer la commande `npm start` et le serveur sera déployé sur le port `5000` de votre machine.

Le serveur expose plusieurs routes HTTP qui sont décrites dans `main.js`.


# Exercice

Le code dans la branche `master` implémente seulement les fonctionnalités de récupération et création de cours. Le serveur offre également la possibilité de supprimer un cours ou de modifier son nombre de crédits. Vous devez implémenter les fonctions `supprimerCours()` et `modifierCours()` qui permettent d'envoyer la bonne requête HTTP vers le serveur en fonction des données entrées dans l'interface du site et gérer la réponse envoyée par le serveur. Dans les 2 cas, la liste des cours doit être mise à jour après que la réponse du serveur soit reçue.

Une solution possible est disponible dans la branche `solution`.