const SERVER_URL = "http://localhost:5000";
const COURS_PATH = "/cours";
const PROF_PATH = "/prof";

function afficherCours(cours) {
  const container = document.getElementById("class-container");
  container.innerHTML = ""; // on vide le conteneur
  cours.forEach((c) => {
    let cours_paragraph = document.createElement("p");
    cours_paragraph.innerHTML = `<p>${c.sigle} : ${c.credits}</p>`;
    container.appendChild(cours_paragraph);
  });
}

function ajouterCours() {
  const sigle = Math.floor(Math.random() * 6000 + 1000);
  const credits = Math.floor(Math.random() * 5 + 1);
  const cours = { sigle: `INF${sigle}`, credits: credits };

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cours),
  };
  const url = `${SERVER_URL}${COURS_PATH}/ajouterCours`;
  fetch(url, opts).then(() => init());
}

function init() {
  const url = `${SERVER_URL}${COURS_PATH}/obtenirCours`;
  fetch(url)
    .then((response) => response.json())
    .then((cours) => afficherCours(cours));
}

// TODO : supprimer un cours en fonction de son sigle et afficher le message dans le span span-delete-result
function supprimerCours() {
  const cours = document.getElementById("input-delete-class").value;
  if (cours) {
    const opts = {
      method: "DELETE",
    };
    const url = `${SERVER_URL}${COURS_PATH}/supprimerCours/${cours}`;
    fetch(url, opts)
      .then((res) => res.text())
      .then((message) => {
        document.getElementById("span-delete-result").textContent = message;
        init();
      });
  }
}

// TODO : modifier le nombre de crédit d'un cours en fonction de son sigle et afficher le message dans le span span-modify-result
function modifierCours() {
  const sigle = document.getElementById("input-modify-class").value;
  const credits = document.getElementById("input-modify-credits").value;
  if (sigle && credits) {
    const cours = { sigle: sigle, credits: credits };
    const opts = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cours),
    };
    const url = `${SERVER_URL}${COURS_PATH}/modifierCours`;
    fetch(url, opts)
      .then((res) => res.text())
      .then((message) => {
        document.getElementById("span-modify-result").textContent = message;
        init();
        obtenirProfs();
      });
  }
}

/// FONCTIONS POUR LES PROFESSEURS

function obtenirProfs() {
  const url = `${SERVER_URL}${PROF_PATH}`;
  fetch(url)
    .then((response) => response.json())
    .then((profs) => afficherProfs(profs));
}

function obtenirParNom() {
  const nom = document.getElementById("input-prof-name").value;
  const url = `${SERVER_URL}${PROF_PATH}/obtenirProf/${nom}`;
  fetch(url)
    .then((response) => {
      if (response.status === 404) { // noter que Fetch ne lance pas d'erreur sur un code 4XX
        throw Error("Professeur introuvable");
      } else {
        return response.json();
      }
    })
    .then((prof) => {
      const nomComplet = `${prof.prenom} ${prof.nom}`;
      document.getElementById("span-prof-name-result").textContent = nomComplet;
    })
    .catch((error) => {
      document.getElementById("span-prof-name-result").textContent = error.message;
    });
}

function obtenirParSigle() {
  const sigle = document.getElementById("input-prof-resp").value;
  const url = `${SERVER_URL}${PROF_PATH}/responsable/${sigle}`;
  fetch(url)
    .then((response) => {
      if (response.status === 404) { // noter que Fetch ne lance pas d'erreur sur un code 4XX
        throw Error("Cours introuvable");
      } else {
        return response.json();
      }
    })
    .then((prof) => {
      const nomComplet = `${prof.prenom} ${prof.nom}`;
      document.getElementById("span-prof-resp-result").textContent = nomComplet;
    })
    .catch((error) => {
      document.getElementById("span-prof-resp-result").textContent = error.message;
    });
}

function afficherProfs(profs) {
  const container = document.getElementById("prof-container");
  container.innerHTML = "";
  profs.forEach((prof) => {
    const prof_paragraph = document.createElement("p");
    prof_paragraph.innerHTML = `<p>${prof.prenom} ${prof.nom} enseigne le cours ${prof.cours.sigle} de ${prof.cours.credits} credits</p>`;
    container.appendChild(prof_paragraph);
  });
}

window.onload = init;
