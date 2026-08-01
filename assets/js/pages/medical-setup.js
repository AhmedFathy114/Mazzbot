// ======================================
// Medical Setup
// ======================================

// ---------- Blood Type ----------

let selectedBlood = "A+";

document.querySelectorAll("#bloodTypeGroup .pill").forEach((pill) => {

    pill.addEventListener("click", () => {

        document
            .querySelectorAll("#bloodTypeGroup .pill")
            .forEach((p) => p.classList.remove("selected"));

        pill.classList.add("selected");

        selectedBlood = pill.dataset.value;

    });

});

// ---------- Stepper ----------

const steps = ["Account", "Medical", "Caregiver"];

function renderStepper(activeIndex) {

    const stepper = document.getElementById("stepper");

    stepper.innerHTML = "";

    steps.forEach((label, i) => {

        const step = document.createElement("div");

        step.className =
            `step ${
                i < activeIndex
                    ? "done"
                    : i === activeIndex
                    ? "active"
                    : ""
            }`;

        step.innerHTML = `

        <div class="step-circle">

            ${
                i < activeIndex
                    ? "✓"
                    : i + 1
            }

        </div>

        <div class="step-label">

            ${label}

        </div>

        `;

        stepper.appendChild(step);

        if (i < steps.length - 1) {

            const line = document.createElement("div");

            line.className =
                `step-line ${
                    i < activeIndex
                        ? "filled"
                        : ""
                }`;

            stepper.appendChild(line);

        }

    });

}

renderStepper(1);

// ---------- Pages ----------

function goTo(page) {

    document
        .querySelectorAll(".page")
        .forEach((p) => p.classList.remove("active"));

    document
        .getElementById(page)
        .classList.add("active");

    renderStepper(
        page === "page-medical"
            ? 1
            : 2
    );

}

window.goTo = goTo;

// ---------- Helpers ----------

async function getUser() {

    const {
        data: { user },
        error
    } =
    await window.supabaseClient
    .auth
    .getUser();

    if(error || !user){

        throw new Error("Login First");

    }

    return user;

}

async function createProfileIfNeeded(user){

    let {
        data: profile
    } =
    await window.supabaseClient

    .from("profiles")

    .select("*")

    .eq("id",user.id)

    .maybeSingle();

    if(profile){

        return;

    }

    await window.supabaseClient

    .from("profiles")

    .insert({

        id:user.id,

        setup_completed:false

    });

}

function loading(btn,state){

    const txt =
    btn.querySelector(".btn-text");

    btn.disabled = state;

    if(state){

        btn.dataset.old =
        txt.innerHTML;

        txt.innerHTML =
        "Saving...";

    }

    else{

        txt.innerHTML =
        btn.dataset.old;

    }

}

// ======================================
// Save Medical Profile
// ======================================

async function submitMedicalProfile(){

    const btn =
    document.getElementById("btnMedicalNext");

    const error =
    document.getElementById("medicalError");

    error.textContent = "";

    loading(btn,true);

    try{

        const user =
        await getUser();

        await createProfileIfNeeded(user);

        const diseases =
        [...document.querySelectorAll(
            "#chronicDiseases input:checked"
        )].map(x=>x.value);

        const payload={

            user_id:user.id,

            age:Number(document.getElementById("age").value),

            gender:document.getElementById("gender").value,

            height:Number(document.getElementById("height").value),

            weight:Number(document.getElementById("weight").value),

            blood_type:selectedBlood,

            allergies:
            document
            .getElementById("allergies")
            .value,

            chronic_diseases:diseases

        };

        const {error:err}=
        await window.supabaseClient

        .from("medical_profiles")

        .upsert(
            payload,
            {
                onConflict:"user_id"
            }
        );

        if(err) throw err;

        goTo("page-caregiver");

    }

    catch(e){

        error.textContent =
        e.message;

    }

    finally{

        loading(btn,false);

    }

}

window.submitMedicalProfile =
submitMedicalProfile;

// ======================================
// Save Caregiver
// ======================================

async function submitCaregiver(){

    const btn =
    document.getElementById("btnFinish");

    const error =
    document.getElementById("caregiverError");

    error.textContent = "";

    loading(btn,true);

    try{

        const user =
        await getUser();

        const payload={

            user_id:user.id,

            full_name:
            document
            .getElementById("caregiverName")
            .value
            .trim(),

            relationship:
            document
            .getElementById("caregiverRelationship")
            .value,

            phone:
            document
            .getElementById("caregiverPhone")
            .value
            .trim(),

            email:
            document
            .getElementById("caregiverEmail")
            .value
            .trim()

        };

        if(!payload.full_name){

            throw new Error(
                "Please enter caregiver name"
            );

        }

        if(!payload.phone){

            throw new Error(
                "Please enter caregiver phone"
            );

        }

        // Save Caregiver

        const {error:careError} =
        await window.supabaseClient

        .from("caregivers")

        .upsert(
            payload,
            {
                onConflict:"user_id"
            }
        );

        if(careError){

            throw careError;

        }

        // Finish Setup

        const {error:updateError} =
        await window.supabaseClient

        .from("profiles")

        .update({

            setup_completed:true

        })

        .eq("id",user.id);

        if(updateError){

            throw updateError;

        }

        // Success

        window.location.replace("../../../app.html");

    }

    catch(e){

        console.error(e);

        error.textContent =
        e.message;

    }

    finally{

        loading(btn,false);

    }

}

window.submitCaregiver =
submitCaregiver;


// ======================================
// Check Session
// ======================================

document.addEventListener(

    "DOMContentLoaded",

    async()=>{

        try{

            const {

                data:{session}

            }=

            await window
            .supabaseClient
            .auth
            .getSession();

            if(!session){

                window.location.replace(
                    "../../../pages/login.html"
                );

                return;

            }

        }

        catch(err){

            console.error(err);

        }

    }

);