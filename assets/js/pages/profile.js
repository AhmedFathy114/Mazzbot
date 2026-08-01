const toggle = document.querySelector(".toggle-switch");

const profileImage = document.getElementById("profileImage");
const profileUpload = document.getElementById("profileUpload");
const changePhotoBtn = document.getElementById("photoBtn");
const editProfileBtn = document.getElementById("editProfileBtn");
const userName = document.getElementById("userName");
const memberSince = document.getElementById("memberSince");
const userAge=document.getElementById("userAge");
const bloodType=document.getElementById("bloodType");
const userHeight=document.getElementById("userHeight");
const userWeight=document.getElementById("userWeight");
const diseasesContainer =document.getElementById("diseasesContainer");
const allergiesContainer =document.getElementById("allergiesContainer");
const caregiverName = document.getElementById("caregiverName");
const caregiverRelation = document.getElementById("caregiverRelation");
const caregiverEmail = document.getElementById("caregiverEmail");
const caregiverPhone = document.getElementById("caregiverPhone");
const caregiverStatus = document.getElementById("caregiverStatus");
const alertMessage = document.getElementById("alertMessage");
const addBtn = document.querySelector(".add-btn");


const user = {

    name: "Menna Mohammed",
    memberSince: "Premium Health Member since May 2023",

    age: 25,
    blood: "A+",
    height: "165 cm",
    weight: "60 kg",

    diseases: [
        "Hypertension",
        "Diabetes"
    ],

    allergies: [
        "Penicillin",
        "Seafood"
    ]
   , caregiver:[ {

    name: "Ahmed Mohammed",
    relation: "Brother",
    email: "ahmed@example.com",
    phone: "+20 01012345678",
    status: "Reachable",
    alert: "Ahmed receives alerts if you miss a critical dose."

}]
,notifications: true,
password: "12345678"
};

const savedUser = localStorage.getItem("user");

if (savedUser) {
    Object.assign(user, JSON.parse(savedUser));
}

renderUser();
renderDiseases();
renderAllergies();
renderCaregiver();
renderNotifications();



function toggleNotifications() {

    user.notifications = !user.notifications;
    toggle.classList.toggle("active", user.notifications);
    localStorage.setItem("user", JSON.stringify(user));

}
function renderUser() {

    userName.textContent = user.name;
    memberSince.textContent = user.memberSince;

    userAge.textContent = `${user.age} Years`;
    bloodType.textContent = user.blood;
    userHeight.textContent = user.height;
    userWeight.textContent = user.weight;

}
function renderDiseases() {

    diseasesContainer.innerHTML = "";

  if (user.diseases.length === 0){

        diseasesContainer.innerHTML = `
            <span class="medical-tag gray">
                No Chronic Diseases
            </span>
        `;

        return;
    }

   user.diseases.forEach(disease => {

        diseasesContainer.innerHTML += `
            <span class="medical-tag danger">
                <i class="fa-solid fa-circle"></i>
                ${disease}
            </span>
        `;

    });

}

function renderAllergies() {

    allergiesContainer.innerHTML = "";

    if (user.allergies.length === 0) {

        allergiesContainer.innerHTML = `
            <span class="medical-tag gray">
                No Allergies
            </span>
        `;

        return;
    }

  user.allergies.forEach(allergy => {

        allergiesContainer.innerHTML += `
            <span class="medical-tag warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
                ${allergy}
            </span>
        `;

    });

}
function renderCaregiver() {

    caregiverName.textContent = user.caregiver.name;

    caregiverRelation.textContent = user.caregiver.relation;

    caregiverEmail.textContent = user.caregiver.email;

    caregiverPhone.textContent = user.caregiver.phone;

    caregiverStatus.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        ${user.caregiver.status}
    `;

    alertMessage.textContent = user.caregiver.alert;

}
function renderNotifications() {

    toggle.classList.toggle("active", user.notifications);

}

function changeProfilePhoto() {

    const file = profileUpload.files[0];

    if (!file) return;
if(file.size > 2 * 1024 * 1024){
    alert("Image size must be less than 2 MB.");
    return;

}
    const reader = new FileReader();

    reader.onload = function (event) {

        const image = event.target.result;

        profileImage.src = image;

        localStorage.setItem("profileImage", image);

    };

    reader.readAsDataURL(file);

}
const savedImage = localStorage.getItem("profileImage");

if (savedImage) {
    profileImage.src = savedImage;
}
changePhotoBtn.addEventListener("click", () => {
    profileUpload.click();
});

profileUpload.addEventListener("change", changeProfilePhoto);
function editProfile() {

  const name = prompt("Enter your name:", user.name);
if (name === null) return;
if (name.trim().length < 3) {
    alert("Name must be at least 3 characters.");
    return;
}
if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name must contain letters only.");
    return;
}
user.name = name.trim();

    const membership = prompt("Membership:", user.memberSince);
    if (membership && membership.trim() !== "") {
        user.memberSince = membership.trim();
    }

    const age = prompt("Age:", user.age);
    if (age !== null) {
        if (!isNaN(age) && Number(age) >= 1 && Number(age) <= 120) {
            user.age = Number(age);
        } else {
            alert("Age must be a number between 1 and 120.");
        }

    }

    const blood = prompt("Blood Type:", user.blood);
    const validBloodTypes = [
        "A+","A-",
        "B+","B-",
        "AB+","AB-",
        "O+","O-"
    ];

    if (blood !== null) {
        if (validBloodTypes.includes(blood.toUpperCase())) {
            user.blood = blood.toUpperCase();
        } else {
            alert("Invalid Blood Type.");
        }
    }

    const height = prompt("Height (cm):", user.height.replace(" cm",""));
    if (height !== null) {
        if (!isNaN(height) && Number(height) >= 50 && Number(height) <= 250) {
            user.height = `${height} cm`;
        } else {
            alert("Height must be between 50 and 250 cm.");
        }
    }

    const weight = prompt("Weight (kg):", user.weight.replace(" kg",""));

    if (weight !== null) {
        if (!isNaN(weight) && Number(weight) >= 10 && Number(weight) <= 300) {
            user.weight = `${weight} kg`;
        } else {
            alert("Weight must be between 10 and 300 kg.");
        }
    }

    renderUser();
renderCaregiver();
renderNotifications();
    localStorage.setItem("user", JSON.stringify(user));
}

editProfileBtn.addEventListener("click", editProfile);
toggle.addEventListener("click", toggleNotifications);
function addSecondaryCaregiver() {
const name = prompt("Secondary Caregiver Name");
if(name){
    alert(`${name} added successfully.`);
}}
addBtn.addEventListener("click", addSecondaryCaregiver);
const exportBtn = document.querySelector(".export-btn");
function exportReport() {

    const report = `
Name: ${user.name}
Age: ${user.age}
Blood Type: ${user.blood}
Height: ${user.height}
Weight: ${user.weight}
Diseases:${user.diseases.join(", ")}
Allergies:${user.allergies.join(", ")}
Primary Caregiver:${user.caregiver.name}`;
    const blob = new Blob([report], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Medical_Report.txt";
    link.click();
URL.revokeObjectURL(link.href);
}

exportBtn.addEventListener("click", exportReport);
const passwordBtn = document.querySelector(".password-btn");

function changePassword() {

    const currentPassword = prompt("Enter Current Password");

    if (currentPassword !== user.password) {
        alert("Current Password is Incorrect.");
        return;
    }

    const newPassword = prompt("Enter New Password");

    if (!newPassword) {
        alert("Password Cannot Be Empty.");
        return;
    }

    if (newPassword === user.password) {
        alert("New Password Must Be Different From Current Password.");
        return;
    }

    if (newPassword.length < 8) {
        alert("Password Must Be At Least 8 Characters.");
        return;
    }

    if (!/[A-Z]/.test(newPassword)) {
        alert("Password Must Contain At Least One Uppercase Letter.");
        return;
    }

    if (!/[a-z]/.test(newPassword)) {
        alert("Password Must Contain At Least One Lowercase Letter.");
        return;
    }

    if (!/[0-9]/.test(newPassword)) {
        alert("Password Must Contain At Least One Number.");
        return;
    }
     if(/\s/.test(newPassword)){

    alert("Password must not contain spaces.");

    return;

}
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
        alert("Password Must Contain At Least One Special Character.");
        return;
    }
if(newPassword.length > 32){

    alert("Password is too long.");

    return;

}
    const confirmPassword = prompt("Confirm New Password");

    if (newPassword !== confirmPassword) {
        alert("Passwords Do Not Match.");
        return;
    }
    user.password = newPassword;

    localStorage.setItem("user", JSON.stringify(user));
    alert("Password Changed Successfully.");

}

passwordBtn.addEventListener("click", changePassword);
const deactivateBtn = document.querySelector(".danger-btn");

function deactivateAccount() {

    const confirmDeactivate = confirm(
        "Are you sure you want to deactivate your account?"
    );

    if (!confirmDeactivate) return;
    localStorage.removeItem("user");
    localStorage.removeItem("profileImage");
    alert("Account Deactivated.");
    location.reload();

}

deactivateBtn.addEventListener("click", deactivateAccount);