/* ================================================
   DASHBOARD.JS — Dashboard Page Controller
   ================================================

   HOW IT RUNS:
   `router.js` automatically calls window.DashboardPage.init()
   every time the user navigates to the Dashboard page.
   ================================================ */

// Health tips array for the "Another Tip" button
const HEALTH_TIPS = [
    "Take your medications at the same time every day to build a strong habit.",
    "Drink a full glass of water with each pill unless instructed otherwise by your doctor.",
    "Keep an updated list of all medications you take, including supplements.",
    "Store medicines in a cool, dry place away from direct sunlight.",
    "Never double up on doses if you miss one — check with your pharmacist first.",
    "Setting daily alarms helps ensure you never miss your evening dosage."
];

// State variables (kept in local memory for this demo)
let currentWater = 1500;       // initial water in ml
const targetWater = 2500;      // goal water in ml
let currentMedsTaken = 2;      // initial taken count (2 of 4)
const totalMedsCount = 4;
let currentTipIndex = 0;


/* ================================================
   DashboardPage Module
   ================================================ */
window.DashboardPage = {

    /**
     * init()
     * Called automatically by router.js whenever dashboard loads.
     */
    init() {
        console.log('[Dashboard] Initializing dashboard page...');

        this.setGreetingAndDate();
        this.setupWaterTracker();
        this.setupMedicationCheckButtons();
        this.setupTipRotator();
    },


    /**
     * setGreetingAndDate()
     * Updates greeting based on time of day (حاطط تلت اوقات بس حاليا)
     * and formats today's date is Sunday, July 26, 2026
     */
    setGreetingAndDate() {
        const greetingEl = document.getElementById('dashGreeting');
        const dateEl     = document.getElementById('dashDate');

        const now = new Date();
        const hour = now.getHours();

        // 1. Determine greeting based on current hour
        let greeting = 'Welcome Back! 👋';
        if (hour < 12) {
            greeting = 'Good Morning! ☀️';
        } else if (hour < 18) {
            greeting = 'Good Afternoon! 🌤️';
        } else {
            greeting = 'Good Evening! 🌙';
        }

        if (greetingEl) {
            greetingEl.textContent = greeting;
        }

        // 2. Format today's date
        if (dateEl) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dateString = now.toLocaleDateString('en-US', options);
            dateEl.textContent = `Today is ${dateString}`;
        }
    },


    /**
     * setupWaterTracker()
     * Attaches click handlers to +250ml, +500ml, and Reset buttons. ال AI  اللي رشحهالي بامانة
     */
    setupWaterTracker() {
        const waterButtons = document.querySelectorAll('.water-add-btn');
        const resetBtn     = document.getElementById('resetWaterBtn');

        // Add event listeners to "+250ml" and "+500ml" buttons
        waterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Read data-amount attribute from HTML button
                const amount = parseInt(button.getAttribute('data-amount')) || 250;
                
                // Increase water amount (max 3500ml)
                currentWater = Math.min(currentWater + amount, 3500);

                // Update UI on screen
                this.updateWaterUI();
            });
        });

        // Reset button
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                currentWater = 0;
                this.updateWaterUI();
            });
        }
    },


    /**
     * updateWaterUI()
     * Updates text labels and progress bar for water intake.
     */
    updateWaterUI() {
        const amountText   = document.getElementById('waterAmountText');
        const statusLabel  = document.getElementById('waterStatusLabel');
        const progressFill = document.getElementById('waterProgressFill');

        // Format number (e.g. 1500 -> "1,500")
        const currentFormatted = currentWater.toLocaleString();
        const targetFormatted  = targetWater.toLocaleString();

        if (amountText) {
            amountText.textContent = `${currentFormatted} / ${targetFormatted} ml`;
        }

        if (statusLabel) {
            const litersCurrent = (currentWater / 1000).toFixed(1);
            const litersTarget  = (targetWater / 1000).toFixed(1);
            statusLabel.textContent = `${litersCurrent}L of ${litersTarget}L`;
        }

        // Update progress bar percentage (capped at 100%)
        if (progressFill) {
            const percentage = Math.min(Math.round((currentWater / targetWater) * 100), 100);
            progressFill.style.width = `${percentage}%`;
        }
    },


    /**
     * setupMedicationCheckButtons()
     * Attaches click event to "Take" buttons in today's schedule list.
     */
    setupMedicationCheckButtons() {
        const takeBtn3 = document.getElementById('takeMed3Btn');
        const takeBtn4 = document.getElementById('takeMed4Btn');

        if (takeBtn3) {
            takeBtn3.addEventListener('click', () => {
                this.markMedicationAsTaken('medItem3', takeBtn3);
            });
        }

        if (takeBtn4) {
            takeBtn4.addEventListener('click', () => {
                this.markMedicationAsTaken('medItem4', takeBtn4);
            });
        }
    },


    /**
     * markMedicationAsTaken(itemId, buttonEl)
     * Visually changes a pending medicine item to "Taken".
     */
    markMedicationAsTaken(itemId, buttonEl) {
        const itemEl = document.getElementById(itemId);

        if (itemEl && !itemEl.classList.contains('taken')) {

            // Change item state to taken
            itemEl.classList.remove('pending');
            itemEl.classList.add('taken');

            // Swap badge from Pending/Upcoming to Taken
            const badge = itemEl.querySelector('.badge');
            if (badge) {
                badge.className = 'badge badge-success';
                badge.textContent = 'Taken';
            }

            // Change button to checkmark
            buttonEl.className = 'btn-check taken-btn';
            buttonEl.disabled = true;
            buttonEl.innerHTML = '<i class="fa-solid fa-check"></i>';

            // Increment stat counter
            currentMedsTaken = Math.min(currentMedsTaken + 1, totalMedsCount);
            this.updateMedsCountUI();
        }
    },


    /**
     * updateMedsCountUI()
     * Updates the stat card counter e.g. "3 / 4" and progress bar width.
     */
    updateMedsCountUI() {
        const medsCountEl = document.getElementById('medsTakenCount');
        const progressFill = document.getElementById('medsProgressFill');

        if (medsCountEl) {
            medsCountEl.textContent = `${currentMedsTaken} / ${totalMedsCount}`;
        }

        if (progressFill) {
            const percentage = Math.round((currentMedsTaken / totalMedsCount) * 100);
            progressFill.style.width = `${percentage}%`;
        }
    },


    /**
     * setupTipRotator()
     * Attaches click handler to "Another Tip" button.
     */
    setupTipRotator() {
        const nextTipBtn = document.getElementById('nextTipBtn');
        const tipTextEl  = document.getElementById('dailyTipText');

        if (nextTipBtn && tipTextEl) {
            nextTipBtn.addEventListener('click', () => {
                // Advance to next tip in array (cycles back to 0 at the end)
                currentTipIndex = (currentTipIndex + 1) % HEALTH_TIPS.length;
                tipTextEl.textContent = `"${HEALTH_TIPS[currentTipIndex]}"`;
            });
        }
    }

};
