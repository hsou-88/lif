const API = "https://script.google.com/macros/s/AKfycbwT-8g1R4iVIxsQ79z6QumZ-DCPVe9yJ-07UG7Xnh6OrGnzMkuz9X2LJk7tsQmdBWwA/exec";
const TOKEN = "abc123secret";

async function loadMembers() {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify({ action: "getMembers", token: TOKEN })
  });

  const members = await res.json();
  const select = document.getElementById("name");

  members.forEach(m => {
    const option = document.createElement("option");
    option.value = m.name;
    option.textContent = `${m.name} (${m.room})`;
    option.dataset.room = m.room;
    select.appendChild(option);
  });

  select.addEventListener("change", e => {
    document.getElementById("room").value =
      e.target.selectedOptions[0].dataset.room;
  });
}

async function reserve() {
  const data = {
    action: "reserve",
    token: TOKEN,
    name: document.getElementById("name").value,
    room: document.getElementById("room").value,
    date: document.getElementById("date").value
  };

  await fetch(API, {
    method: "POST",
    body: JSON.stringify(data)
  });

  alert("Reserved!");
}

async function loadSchedule() {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify({ action: "getSchedule", token: TOKEN })
  });

  const data = await res.json();
  const div = document.getElementById("schedule");

  data.forEach(d => {
    div.innerHTML += `<p>${d.date}: ${d.people.join(", ")}</p>`;
  });
}

window.onload = loadMembers;
