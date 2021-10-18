const SERVER_URL = "http://localhost:5000";

function obtenirCours(cours) {
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
  const url = `${SERVER_URL}/ajouterCours`;
  fetch(url, opts).then(() => init());
}

function init() {
  const url = `${SERVER_URL}/obtenirCours`;
  fetch(url)
    .then((response) => response.json())
    .then((cours) => obtenirCours(cours));
}

window.onload = init;
