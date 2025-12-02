// --- Navigation depuis index.html ---
document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("btnBoarding");
  const invoice = document.getElementById("btnInvoice");
  const dash = document.getElementById("btnDashboard");

  if (board) board.addEventListener("click", () => go("boarding.html"));
  if (invoice) invoice.addEventListener("click", () => go("invoice.html"));
  if (dash) dash.addEventListener("click", () => go("dashboard.html"));
});

function go(page) {
  const file = document.getElementById("fileSelect").value.trim();
  sessionStorage.setItem("reservationFile", file);
  window.location = page;
}

// --- Chargement JSON ---
async function loadJSON() {
  const file = sessionStorage.getItem("reservationFile");
  const response = await fetch("data/" + file);
  const json = await response.json();
  return json[0];
}
