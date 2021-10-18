const SERVER_URL = "http://localhost:5000";

function obtenirCours() {
  const cours = Array.from(JSON.parse(this.response));
  const container = document.getElementById("cours-container");
  container.innerHTML = ""; // on vide le conteneur
  cours.forEach((c) => {
    const cours_paragraph = document.createElement("p");
    cours_paragraph.innerHTML = `<p>${c.sigle} : ${c.credits}</p>`;
    container.appendChild(cours_paragraph);
  });
}

function ajouterCours() {
  const sigle = Math.floor(Math.random() * 6000 + 1000);
  const credits = Math.floor(Math.random() * 5 + 1);
  const cours = { sigle: `INF${sigle}`, credits: credits };

  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", init);
  oReq.open("POST", `${SERVER_URL}/ajouterCours`);
  oReq.setRequestHeader("Content-Type", "application/json");

  oReq.send(JSON.stringify(cours));
}

function init() {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", obtenirCours);
  oReq.open("GET", `${SERVER_URL}/obtenirCours`);
  oReq.send();
}

window.onload = init;
