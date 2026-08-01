let medicines = JSON.parse(localStorage.getItem("medicines")) || [
  {
    id: 1,
    name: "Panadol",
    dosage: "500 mg — 1 tablet",
    schedule: ["08:00 AM", "08:00 PM"],
    stock: 2,
    color: "red",
    icon: "pill",
    takenToday: false,
    info: {
      uses: "Relieves mild to moderate pain and reduces fever. Commonly used for headaches, muscle aches, and cold symptoms.",
      sideEffects:
        "Nausea, stomach upset, rash. Rarely: liver damage with overdose.",
      warnings:
        "Do not exceed 4g per day. Consult doctor if pain persists more than 3 days.",
      storage:
        "Store below 25°C in a dry place. Keep away from moisture and direct sunlight.",
    },
  },
  {
    id: 2,
    name: "Concor",
    dosage: "5 mg — 1 tablet",
    schedule: ["09:00 AM"],
    stock: 30,
    color: "blue",
    icon: "medication_liquid",
    takenToday: false,
    info: {
      uses: "Treats high blood pressure (hypertension) and certain heart conditions.",
      sideEffects: "Dizziness, fatigue, cold hands/feet, slow heartbeat.",
      warnings: "Do not stop suddenly. May mask symptoms of low blood sugar.",
      storage: "Store at room temperature (15-30°C) in original packaging.",
    },
  },
  {
    id: 3,
    name: "Vitamin D",
    dosage: "1000 IU — 1 tablet",
    schedule: ["02:00 PM"],
    stock: 60,
    color: "orange",
    icon: "spa",
    takenToday: false,
    info: {
      uses: "Supports bone health, immune system, and calcium absorption.",
      sideEffects:
        "Usually well tolerated. High doses may cause nausea or weakness.",
      warnings: "Do not exceed recommended dose without medical supervision.",
      storage: "Keep in a cool, dry place. Protect from light and moisture.",
    },
  },
];

function saveToStorage() {
  localStorage.setItem("medicines", JSON.stringify(medicines));
}

let medicineToDelete = null;

function renderMedicines(filterText = "") {
  const container = document.getElementById("medicines-container");
  container.innerHTML = "";

  const filtered = medicines.filter((med) =>
    med.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-outlined">medication</span>
        <p>No medicines found.</p>
      </div>
    `;
    updateAdherence();
    return;
  }

  filtered.forEach((med) => {
    const isLowStock = med.stock <= 5;
    const statusClass = isLowStock ? "low-stock" : "available";
    const statusText = isLowStock ? "Low Stock" : "Available";
    const statusIcon = isLowStock ? "warning" : "check_circle";
    const takenClass = med.takenToday ? "taken-done" : "";

    let timeHTML = "";
    med.schedule.forEach((time) => {
      timeHTML += `
        <span>
          <span class="material-symbols-outlined">schedule</span>
          ${time}
        </span>
      `;
    });

    let warningHTML = "";
    if (isLowStock) {
      warningHTML = `<p class="warning">Only ${med.stock} tablet${med.stock !== 1 ? "s" : ""} remaining</p>`;
    }

    let actionButtons = "";
    if (isLowStock) {
      actionButtons = `
        <button class="btn-outline info-btn" onclick="showInfo(${med.id})">
          <span class="material-symbols-outlined">info</span>
          Info
        </button>
        <button class="taken ${takenClass}" onclick="markTaken(${med.id})">
          <span class="material-symbols-outlined">check_circle</span>
          ${med.takenToday ? "Taken ✓" : "Taken"}
        </button>
        <button class="btn-outline" onclick="findPharmacy()">
          <span class="material-symbols-outlined">local_pharmacy</span>
          Find Nearby Pharmacy
        </button>
      `;
    } else {
      actionButtons = `
        <button class="btn-outline info-btn" onclick="showInfo(${med.id})">
          <span class="material-symbols-outlined">info</span>
          Info
        </button>
        <button class="btn-outline edit-btn" onclick="openEditForm(${med.id})">
          <span class="material-symbols-outlined">edit</span>
          Edit
        </button>
        <button class="delete-btn" onclick="openDeleteModal(${med.id})">
          <span class="material-symbols-outlined">delete</span>
        </button>
      `;
    }

    const cardHTML = `
      <section class="medicine-card">
        <span class="status-badge ${statusClass}">
          <span class="material-symbols-outlined">${statusIcon}</span>
          ${statusText}
        </span>
        <div class="medicine-left">
          <div class="medicine-icon ${med.color}">
            <span class="material-symbols-outlined">${med.icon}</span>
          </div>
          <div class="medicine-details">
            <h2>${med.name}</h2>
            <p>${med.dosage}</p>
            <div class="time">${timeHTML}</div>
            ${warningHTML}
          </div>
        </div>
        <div class="medicine-buttons">
          ${actionButtons}
        </div>
      </section>
    `;

    container.innerHTML += cardHTML;
  });

  updateAdherence();
}

function updateAdherence() {
  const total = medicines.length;
  const taken = medicines.filter((m) => m.takenToday).length;
  const percentage = total === 0 ? 0 : Math.round((taken / total) * 100);

  document.getElementById("adherence-percent").textContent = percentage + "%";
  document.getElementById("adherence-message").textContent =
    `You've maintained a ${percentage}% adherence rate this week.`;

  const circle = document.getElementById("adherence-circle");
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * percentage) / 100;

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = offset;
}

function showInfo(id) {
  const med = medicines.find((m) => m.id === id);
  if (!med) return;

  document.getElementById("info-title").textContent = med.name + " - Info";
  document.getElementById("info-uses").textContent =
    med.info.uses || "No information available.";
  document.getElementById("info-side-effects").textContent =
    med.info.sideEffects || "No information available.";
  document.getElementById("info-warnings").textContent =
    med.info.warnings || "No information available.";
  document.getElementById("info-storage").textContent =
    med.info.storage || "No information available.";

  openModal("info-modal");
}

function markTaken(id) {
  const med = medicines.find((m) => m.id === id);
  if (!med) return;

  med.takenToday = !med.takenToday;
  saveToStorage();
  renderMedicines(document.getElementById("search-input").value);
}

function findPharmacy() {
  window.open("https://www.google.com/maps/search/pharmacy+near+me", "_blank");
}

function openAddForm() {
  document.getElementById("form-title").textContent = "Add Medicine";
  document.getElementById("edit-id").value = "";
  document.getElementById("medicine-form").reset();
  openModal("form-modal");
}

function openEditForm(id) {
  const med = medicines.find((m) => m.id === id);
  if (!med) return;

  document.getElementById("form-title").textContent = "Edit Medicine";
  document.getElementById("edit-id").value = med.id;
  document.getElementById("form-name").value = med.name;
  document.getElementById("form-dosage").value = med.dosage;
  document.getElementById("form-schedule").value = med.schedule.join(", ");
  document.getElementById("form-stock").value = med.stock;
  document.getElementById("form-uses").value = med.info.uses;
  document.getElementById("form-side-effects").value = med.info.sideEffects;
  document.getElementById("form-warnings").value = med.info.warnings;
  document.getElementById("form-storage").value = med.info.storage;

  openModal("form-modal");
}

function saveMedicine(event) {
  event.preventDefault();

  const editId = document.getElementById("edit-id").value;
  const scheduleText = document.getElementById("form-schedule").value;

  const scheduleArray = scheduleText
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s);

  const medicineData = {
    name: document.getElementById("form-name").value,
    dosage: document.getElementById("form-dosage").value,
    schedule: scheduleArray,
    stock: parseInt(document.getElementById("form-stock").value),
    takenToday: false,
    info: {
      uses: document.getElementById("form-uses").value,
      sideEffects: document.getElementById("form-side-effects").value,
      warnings: document.getElementById("form-warnings").value,
      storage: document.getElementById("form-storage").value,
    },
  };

  if (editId) {
    const index = medicines.findIndex((m) => m.id === parseInt(editId));
    if (index !== -1) {
      medicines[index] = {
        ...medicines[index],
        ...medicineData,
      };
    }
  } else {
    const newId =
      medicines.length > 0 ? Math.max(...medicines.map((m) => m.id)) + 1 : 1;
    medicines.push({
      id: newId,
      color: "blue",
      icon: "medication",
      ...medicineData,
    });
  }

  //   saveToStorage();
  closeModal("form-modal");
  renderMedicines(document.getElementById("search-input").value);
}

function openDeleteModal(id) {
  const med = medicines.find((m) => m.id === id);
  if (!med) return;

  medicineToDelete = id;
  document.getElementById("delete-name").textContent = med.name;
  openModal("delete-modal");
}

function confirmDelete() {
  if (medicineToDelete !== null) {
    medicines = medicines.filter((m) => m.id !== medicineToDelete);
    medicineToDelete = null;
    // saveToStorage();
    closeModal("delete-modal");
    renderMedicines(document.getElementById("search-input").value);
  }
}

function openModal(modalId) {
  document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active");
    }
  });
});

window.MedicinesPage = {
    init() {
        renderMedicines();
    }
};
