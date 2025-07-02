const SERVER_URL = "http://localhost:5000/cours";

function obtenirCours(cours) {
  const container = document.getElementById("class-container");
  container.innerHTML = "";
  cours.forEach((c) => {
    let cours_paragraph = document.createElement("p");
    cours_paragraph.innerHTML = `<p>${c.sigle} : ${c.credits}</p>`;
    container.appendChild(cours_paragraph);
  });
}

function ajouterCours() {
  const sigle = (document.getElementById("input-add-class").value.substring(0, 4)).padEnd(4, "0");
  const credits = Math.floor(Math.random() * 5 + 1);
  const cours = { sigle: `INF${sigle}`, credits: credits };

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cours),
  };
  const url = `${SERVER_URL}`;
  fetch(url, opts).then((res) => {
    const spanAddResult = document.getElementById("span-add-result");
    spanAddResult.textContent = res.status === 409 ? "Le cours existe déjà." : "";
    init();
  });
}

function init() {
  const url = `${SERVER_URL}`;
  fetch(url) // Méthode GET par défaut
    .then((response) => response.json())
    .then((cours) => obtenirCours(cours));
}

function supprimerCours() {
  const cours = document.getElementById("input-delete-class").value;
  if (cours) {
    const opts = {
      method: "DELETE",
    };
    const url = `${SERVER_URL}/${cours}`;
    fetch(url, opts)
      .then((res) => {
        const spanDeleteResult = document.getElementById("span-delete-result");
        spanDeleteResult.textContent = res.status === 204 ? "Cours supprimé." : "Echec de suppression : cours introuvable dans la liste";
        init();
      });
  }
}

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
    const url = `${SERVER_URL}`;
    fetch(url, opts)
      .then((res) => res.text())
      .then((message) => {
        document.getElementById("span-modify-result").textContent = message;
        init();
      });
  }
}

init();