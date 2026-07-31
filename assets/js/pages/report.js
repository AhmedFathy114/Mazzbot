const patient = {
  fullName: "Amany Salah",
  age: 25,
  bloodType: "A+",
  chronicDiseases: ["Hypertension", "Migraine"],
  allergies: ["Penicillin", "Seafood"],
};

const medications = [
  {
    name: "Panadol",
    dosage: "500mg - 1 tablet",
    schedule: "08:00 AM, 08:00 PM",
    status: "LOW STOCK",
    icon: "emergency",
    color: "red",
  },
  {
    name: "Concor",
    dosage: "5mg - 1 tablet",
    schedule: "09:00 AM",
    status: "AVAILABLE",
    icon: "healing",
    color: "blue",
  },
  {
    name: "Vitamin D",
    dosage: "1000 IU - 1 tablet",
    schedule: "02:00 PM",
    status: "AVAILABLE",
    icon: "light_mode",
    color: "orange",
  },
];

const allActivities = [
  { title: "Panadol - Taken", time: "08:00 AM (Today)", type: "taken" },
  { title: "Concor - Taken", time: "09:00 AM (Today)", type: "taken" },
  { title: "Vitamin D - Missed", time: "02:00 PM (Yesterday)", type: "missed" },
  { title: "Panadol - Taken", time: "08:00 PM (Yesterday)", type: "taken" },
  { title: "Vitamin D - Taken", time: "02:00 PM (2 days ago)", type: "taken" },
  { title: "Concor - Taken", time: "09:00 AM (2 days ago)", type: "taken" },
  { title: "Panadol - Taken", time: "08:00 AM (2 days ago)", type: "taken" },
  { title: "Panadol - Missed", time: "08:00 PM (3 days ago)", type: "missed" },
];

const stats = {
  totalMedicines: 4,
  dosesTaken: 28,
  missedDoses: 5,
  streak: 12,
};

//********************************************* */

//patient
let fullName = document.querySelector("#patient-name");
let age = document.querySelector("#patient-age");
let bloodType = document.querySelector("#patient-blood");
let diseasesContainer = document.querySelector("#diseases-tags");
let allergiesContainer = document.querySelector("#allergies-tags");

//stats
let medicines = document.querySelector("#stat-medicines");
let doses = document.querySelector("#stat-doses");
let missed = document.querySelector("#stat-missed");
const streak = document.querySelector("#stat-streak");

//for circle
let adherText = document.querySelector("#adherence-text");
let adherCircle = document.querySelector("#adherence-circle");

//for medication
let tbody = document.querySelector("#medication-body");

// for patient
function renderPatient() {
  fullName.textContent = patient.fullName;
  age.textContent = patient.age;
  bloodType.textContent = patient.bloodType;

  diseasesContainer.innerHTML = patient.chronicDiseases
    .map((dis) => `<span class="tag blue">${dis}</span>`)
    .join("");

  allergiesContainer.innerHTML = patient.allergies
    .map((allergy) => `<span class="tag red">${allergy}</span>`)
    .join("");
}

//for stats
function renderStats() {
  medicines.textContent = stats.totalMedicines;
  doses.textContent = stats.dosesTaken;
  missed.textContent = stats.missedDoses;
  streak.innerHTML = `${stats.streak} <span class="days">Days</span>`;
}

//for circle
function renderAdherence() {
  const total = stats.dosesTaken + stats.missedDoses;
  const percentage =
    total === 0 ? 0 : Math.round((stats.dosesTaken / total) * 100);
  adherText.textContent = percentage + "%";

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offSet = circumference - (circumference * percentage) / 100;

  // circle.style.strokeDasharray = circumference;
  // circle.style.strokeDashoffset = offset;
}

//for medication
function renderMedications() {
  tbody.innerHTML = medications
    .map(
      (med) => `
        <tr>
            <td>
                <div class="med-icon ${med.color}"><span class="material-symbols-outlined">${med.icon}</span></div>
                <span>${med.name}</span>
                            </td>
                            <td>${med.dosage}</td>
                            <td>${med.schedule}</td>
                            <td><span class="badge ${med.status === "AVAILABLE" ? "green" : "red"}">${med.status}</span></td>
                        </tr>`,
    )
    .join("");
}

//for activity
function createActivity(activity) {
  const isTaken = activity.type === "taken";
  const icon = isTaken ? "check" : "close";
  const colorClass = isTaken ? "green" : "red";
  return `
    <div class="activity-item">
                        <div class="activity-icon ${colorClass}"><span class="material-symbols-outlined">${icon}</span></div>
                        <div class="activity-info">
                            <p class="activity-title">${activity.title}</p>
                            <p class="activity-time">${activity.time}</p>
                        </div>
                    </div>
    `;
}

function renderRecentActivities() {
  const container = document.querySelector("#activity-list");
  container.innerHTML = allActivities
    .slice(0, 4)
    .map((a) => createActivity(a))
    .join("");
}

function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("last-updated").textContent =
    `Last updated: Today at ${timeString}`;
}
document.addEventListener("DOMContentLoaded", function () {
  renderPatient();
  renderStats();
  renderAdherence();
  renderMedications();
  renderRecentActivities();
  updateTime();
});

