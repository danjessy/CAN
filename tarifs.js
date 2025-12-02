// === TARIFS ===
const TARIFS = {
  "adu26p": 18.75,
  "je1825": 13.80,
  "enf417": 11.25,
  "bebe": 0,
  "cat4": 96.05,
  "trot": 4.70
};

// === CARTES D'EMBARQUEMENT ===
async function loadBoarding() {
  const data = await loadJSON();
  const container = document.getElementById("content");

  container.innerHTML = `<div class="card"><h2>${data.reservation.nom}</h2>
    <p>${data.reservation.date} - ${data.reservation.heure}</p></div>`;

  data.passagers.forEach(p => {
    const div = document.createElement("div");
    div.className = "card boardingCard";
    div.innerHTML = `
      <h3>${p.prenom} ${p.nom}</h3>
      <p>Catégorie : ${p.codeCategorie}</p>
      <p>Liaison : ${data.reservation.idLiaison}</p>
      <p>QR : ${btoa(p.nom + "|" + p.prenom).slice(0,12)}</p>
    `;
    container.appendChild(div);
  });
}

// === FACTURE ===
async function loadInvoice() {
  const data = await loadJSON();
  const container = document.getElementById("content");

  let html = `<div class="card"><h2>Facture - ${data.reservation.nom}</h2>`;
  html += `<table><tr><th>Item</th><th>Qté</th><th>Prix U.</th><th>Total</th></tr>`;

  let total = 0;

  data.passagers.forEach(p => {
    const prix = TARIFS[p.codeCategorie];
    total += prix;
    html += `<tr><td>${p.prenom} ${p.nom}</td><td>1</td><td>${prix}</td><td>${prix}</td></tr>`;
  });

  data.vehicules.forEach(v => {
    const prix = TARIFS[v.codeCategorie];
    const t = prix * v.quantite;
    total += t;
    html += `<tr><td>${v.codeCategorie}</td><td>${v.quantite}</td><td>${prix}</td><td>${t}</td></tr>`;
  });

  html += `</table><p><strong>Total : ${total} €</strong></p></div>`;
  container.innerHTML = html;
}

// === TABLEAU DE BORD ===
async function loadDashboard() {
  const data = await loadJSON();
  const container = document.getElementById("content");
  let stats = computeStats(data);

  container.innerHTML = `
    <div class="row">
      <div class="card"><h3>Passagers</h3><p>${stats.nbPass}</p></div>
      <div class="card"><h3>Véhicules</h3><p>${stats.nbVeh}</p></div>
      <div class="card"><h3>CA (€)</h3><p>${stats.ca}</p></div>
    </div>

    <div class="card">
      <h3>Répartition passagers</h3>
      <canvas id="chart"></canvas>
    </div>
  `;

  const ctx = document.getElementById("chart");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(stats.byCat),
      datasets: [{
        data: Object.values(stats.byCat)
      }]
    }
  });
}

function computeStats(data) {
  const nbPass = data.passagers.length;
  const nbVeh = data.vehicules.reduce((s,v)=>s+v.quantite,0);

  const ca = data.passagers.reduce((s,p)=>s+(TARIFS[p.codeCategorie]||0),0)
           + data.vehicules.reduce((s,v)=>s+(TARIFS[v.codeCategorie]||0)*v.quantite,0);

  const byCat = {};
  data.passagers.forEach(p => {
    byCat[p.codeCategorie] = (byCat[p.codeCategorie]||0) + 1;
  });

  return { nbPass, nbVeh, ca, byCat };
}
