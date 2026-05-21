const API = "https://script.google.com/macros/s/AKfycbyya6gJDlbBMaYiqk0q276VL7FdMk9K0-S-8lOmr822A6roiEL6Vl3tvV3l7UyLJig/exec";
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

async function loadSchedule() {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify({
      action: "getSchedule",
      token: TOKEN
    })
  });

  const data = await res.json();

  const container = document.getElementById("schedule");
  container.innerHTML = "";

  data.forEach(day => {
    const div = document.createElement("div");

    div.innerHTML = `
      <strong>${day.date}</strong><br>
      ${day.people.length > 0 ? day.people.join(", ") : "No bookings"}
      <hr>
    `;

    container.appendChild(div);
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

window.onload = loadMembers;
