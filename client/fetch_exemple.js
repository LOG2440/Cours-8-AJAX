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

// TODO : supprimer un cours en fonction de son sigle et afficher le message dans le span span-delete-result
function supprimerCours() {
  const cours = document.getElementById("input-delete-class").value;
  if (cours) {
    const opts = {
      method: "DELETE",
    };
    const url = `${SERVER_URL}/supprimerCours/${cours}`;
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
    const url = `${SERVER_URL}/modifierCours`;
    fetch(url, opts)
      .then((res) => res.text())
      .then((message) => {
        document.getElementById("span-modify-result").textContent = message;
        init();
      });
  }
}

window.onload = init;
