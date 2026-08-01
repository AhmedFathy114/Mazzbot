// ========================================================
// 1. المتغيرات والمستهدفات الأساسية
// ========================================================
const maxCups = 8;
let currentCups = 0;

const maxMinutes = 30;
let currentMinutes = 0;

const maxSleepHours = 8;
let currentSleepHours = 0;

let isMedsCompleted = false;
let isSleepCompleted = false;
let isNutritionCompleted = false; 

const userChronicIllness = 'Diabetes'; 

// مصفوفة النصائح الغذائية
const nutritionTips = [
    "Choose whole grains (oats, brown rice) instead of refined white carbs today. 🌾",
    "Swap sugary sodas with fresh water infused with lemon slices or mint. 🍋💧",
    "Eat a colorful mix of green, red, and orange vegetables with your main meal. 🥗",
    "Snack on raw nuts (almonds, walnuts) instead of chips or processed sweets. 🥜",
    "Try to finish dinner at least 2–3 hours before sleep for optimal digestion. ⏰",
    "Incorporate healthy fats like Extra Virgin Olive Oil and Avocados into your meals. 🥑🫒",
    "Reduce sodium intake by cooking with fresh aromatic herbs and spices instead of salt. 🌿",
    "Include high-fiber foods to support your gut microbiome and blood sugar stability. 🍎",
    "Drink a glass of water 15 minutes before meals to aid appetite control. 🥛"
];

// قائمة الأكل المقترح بحسب المرض المزمن
const dietRecommendations = {
    Diabetes: [
        { name: "Green Apples 🍏" }, { name: "Cucumbers 🥒" }, { name: "Broccoli 🥦" },
        { name: "Raw Almonds 🥜" }, { name: "Chia Seeds 🌱" }, { name: "Greek Yogurt 🥛" }
    ],
    Hypertension: [
        { name: "Bananas 🍌" }, { name: "Fresh Spinach 🥬" }, { name: "Low-Fat Milk 🥛" },
        { name: "Beetroot 🍠" }, { name: "Unsalted Walnuts 🌰" }, { name: "Oatmeal 🥣" }
    ],
    HeartDisease: [
        { name: "Grilled Salmon 🐟" }, { name: "Extra Virgin Olive Oil 🫒" }, { name: "Avocado 🥑" },
        { name: "Fresh Berries 🫐" }, { name: "Walnuts 🌰" }, { name: "Green Tea 🍵" }
    ]
};

// ========================================================
// 2. تحديد عناصر الـ DOM من الصفحة
// ========================================================
const currentCupsText = document.getElementById('current-cups');
const summaryCupsText = document.getElementById('summary-cups');
const addCupBtn = document.getElementById('add-cup-btn');
const resetCupBtn = document.getElementById('reset-cup-btn');
const cupsContainer = document.getElementById('cups-container');
const congratsMsg = document.getElementById('congrats-msg');
const statusWaterIcon = document.getElementById('status-water');
const itemWaterCard = document.getElementById('item-water');

const currentMinutesText = document.getElementById('current-minutes');
const summaryMinutesText = document.getElementById('summary-minutes');
const addWalkBtn = document.getElementById('add-walk-btn');
const resetWalkBtn = document.getElementById('reset-walk-btn');
const walkCongratsMsg = document.getElementById('walk-congrats-msg');
const statusWalkIcon = document.getElementById('status-walk');
const itemWalkCard = document.getElementById('item-walk');

const currentSleepHoursText = document.getElementById('current-sleep-hours');
const addSleepBtn = document.getElementById('add-sleep-hour-btn');
const resetSleepBtn = document.getElementById('reset-sleep-btn');
const sleepCongratsMsg = document.getElementById('sleep-congrats-msg');
const statusSleepIcon = document.getElementById('status-sleep');
const itemSleepCard = document.getElementById('item-sleep');
const toggleBenefitsBtn = document.getElementById('toggle-benefits-btn');
const benefitsContent = document.getElementById('benefits-content');

const medCheckboxes = document.querySelectorAll('.med-checkbox');
const medsCongratsMsg = document.getElementById('meds-congrats-msg');
const resetMedsBtn = document.getElementById('reset-meds-btn');
const statusMedsIcon = document.getElementById('status-meds');
const itemMedsCard = document.getElementById('item-meds');

const tipTextElement = document.getElementById('nutrition-tip-text');
const nextTipBtn = document.getElementById('next-tip-btn');
const foodsContainer = document.getElementById('recommended-foods-container');
const nutritionCheckboxes = document.querySelectorAll('.nutrition-checkbox');
const mainCongratsMsg = document.getElementById('main-congrats-msg');

// ========================================================
// 3. دالة الفحص الكبرى (Check Perfect Day)
// ========================================================
// ========================================================
// 3. دالة الفحص الكبرى (Check Perfect Day)
// ========================================================
function checkPerfectDay() {
    const isWaterCompleted = (currentCups === maxCups);
    const isWalkCompleted = (currentMinutes === maxMinutes);

    // التهنئة بتعتمد على الـ 4 عادات الموجودين في الملخص فوق بس!
    if (isWaterCompleted && isWalkCompleted && isSleepCompleted && isMedsCompleted) {
        if (mainCongratsMsg) mainCongratsMsg.classList.remove('hidden'); 
    } else {
        if (mainCongratsMsg) mainCongratsMsg.classList.add('hidden'); 
    }
}

// ========================================================
// 4. لوجيك متتبع الأدوية (Medicines Tracker)
// ========================================================
medCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const itemLabel = e.target.closest('.dose-item');
        if (e.target.checked) {
            itemLabel.classList.add('item-completed');
        } else {
            itemLabel.classList.remove('item-completed');
        }

        const allDosesTaken = Array.from(medCheckboxes).every(cb => cb.checked);
        if (allDosesTaken) {
            isMedsCompleted = true;
            if (medsCongratsMsg) medsCongratsMsg.classList.remove('hidden');
            if (statusMedsIcon) statusMedsIcon.className = 'fa-solid fa-circle-check status-icon text-success';
            if (itemMedsCard) itemMedsCard.classList.add('completed');
        } else {
            isMedsCompleted = false;
            if (medsCongratsMsg) medsCongratsMsg.classList.add('hidden');
            if (statusMedsIcon) statusMedsIcon.className = 'fa-solid fa-circle-xmark status-icon text-danger';
            if (itemMedsCard) itemMedsCard.classList.remove('completed');
        }
        checkPerfectDay();
    });
});

if (resetMedsBtn) {
    resetMedsBtn.addEventListener('click', () => {
        medCheckboxes.forEach(cb => {
            cb.checked = false;
            const itemLabel = cb.closest('.dose-item');
            if (itemLabel) itemLabel.classList.remove('item-completed');
        });
        isMedsCompleted = false;
        if (medsCongratsMsg) medsCongratsMsg.classList.add('hidden');
        if (statusMedsIcon) statusMedsIcon.className = 'fa-solid fa-circle-xmark status-icon text-danger';
        if (itemMedsCard) itemMedsCard.classList.remove('completed');
        checkPerfectDay();
    });
}

// ========================================================
// 5. لوجيك كارت التغذية الذكي وزرار Next Tip
// ========================================================
let currentTipIndex = Math.floor(Math.random() * nutritionTips.length);

function displayTip(index) {
    if (tipTextElement) {
        tipTextElement.style.opacity = '0';
        setTimeout(() => {
            tipTextElement.textContent = nutritionTips[index];
            tipTextElement.style.opacity = '1';
        }, 150);
    }
}

displayTip(currentTipIndex);

if (nextTipBtn) {
    nextTipBtn.addEventListener('click', () => {
        currentTipIndex = (currentTipIndex + 1) % nutritionTips.length;
        displayTip(currentTipIndex);
    });
}

function setupRecommendedFoods() {
    if (!foodsContainer) return;
    foodsContainer.innerHTML = '';
    const foods = dietRecommendations[userChronicIllness] || dietRecommendations['Diabetes'];
    foods.forEach(food => {
        const tag = document.createElement('span');
        tag.className = 'food-tag';
        tag.innerHTML = `✨ ${food.name}`;
        foodsContainer.appendChild(tag);
    });
}
setupRecommendedFoods();

nutritionCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const itemLabel = e.target.closest('.check-item');
        if (e.target.checked) {
            itemLabel.classList.add('item-completed');
        } else {
            itemLabel.classList.remove('item-completed');
        }
        const allChecked = Array.from(nutritionCheckboxes).every(cb => cb.checked);
        isNutritionCompleted = allChecked;
        checkPerfectDay();
    });
});

// ========================================================
// 6. لوجيك متتبع الماء (Water Tracker)
// ========================================================
function renderCups() {
    if (!cupsContainer) return;
    cupsContainer.innerHTML = ''; 
    for (let i = 1; i <= maxCups; i++) {
        const cupIcon = document.createElement('i');
        if (i <= currentCups) {
            cupIcon.className = 'fa-solid fa-glass-water cup-filled';
        } else {
            cupIcon.className = 'fa-solid fa-glass-water-empty cup-empty';
        }
        cupsContainer.appendChild(cupIcon);
    }
}
renderCups();

if (addCupBtn) {
    addCupBtn.addEventListener('click', () => {
        if (currentCups < maxCups) {
            currentCups++;
            if (currentCupsText) currentCupsText.textContent = currentCups;
            if (summaryCupsText) summaryCupsText.textContent = currentCups;
            renderCups();
            
            if (currentCups === maxCups) {
                if (congratsMsg) congratsMsg.classList.remove('hidden'); 
                addCupBtn.disabled = true; 
                addCupBtn.style.opacity = '0.5';
                if (statusWaterIcon) statusWaterIcon.className = 'fa-solid fa-circle-check status-icon text-success';
                if (itemWaterCard) itemWaterCard.classList.add('completed');
                checkPerfectDay();
            }
        }
    });
}

if (resetCupBtn) {
    resetCupBtn.addEventListener('click', () => {
        currentCups = 0;
        if (currentCupsText) currentCupsText.textContent = currentCups;
        if (summaryCupsText) summaryCupsText.textContent = currentCups;
        renderCups();
        
        if (congratsMsg) congratsMsg.classList.add('hidden'); 
        if (addCupBtn) {
            addCupBtn.disabled = false; 
            addCupBtn.style.opacity = '1';
        }
        if (statusWaterIcon) statusWaterIcon.className = 'fa-solid fa-circle-xmark status-icon text-danger';
        if (itemWaterCard) itemWaterCard.classList.remove('completed');
        checkPerfectDay();
    });
}

// ========================================================
// 7. لوجيك متتبع المشي (Walking Tracker)
// ========================================================
if (addWalkBtn) {
    addWalkBtn.addEventListener('click', () => {
        if (currentMinutes < maxMinutes) {
            currentMinutes += 5;
            if (currentMinutesText) currentMinutesText.textContent = currentMinutes;
            if (summaryMinutesText) summaryMinutesText.textContent = currentMinutes;
            
            if (currentMinutes === maxMinutes) {
                if (walkCongratsMsg) walkCongratsMsg.classList.remove('hidden');
                addWalkBtn.disabled = true;
                addWalkBtn.style.opacity = '0.5';
                if (statusWalkIcon) statusWalkIcon.className = 'fa-solid fa-circle-check status-icon text-success';
                if (itemWalkCard) itemWalkCard.classList.add('completed');
                checkPerfectDay();
            }
        }
    });
}

if (resetWalkBtn) {
    resetWalkBtn.addEventListener('click', () => {
        currentMinutes = 0;
        if (currentMinutesText) currentMinutesText.textContent = currentMinutes;
        if (summaryMinutesText) summaryMinutesText.textContent = currentMinutes;
        
        if (walkCongratsMsg) walkCongratsMsg.classList.add('hidden');
        if (addWalkBtn) {
            addWalkBtn.disabled = false;
            addWalkBtn.style.opacity = '1';
        }
        if (statusWalkIcon) statusWalkIcon.className = 'fa-solid fa-circle-xmark status-icon text-danger';
        if (itemWalkCard) itemWalkCard.classList.remove('completed');
        checkPerfectDay();
    });
}

// ========================================================
// 8. لوجيك متتبع النوم (Sleep Tracker)
// ========================================================
if (toggleBenefitsBtn && benefitsContent) {
    toggleBenefitsBtn.addEventListener('click', () => {
        benefitsContent.classList.toggle('hidden');
        if (benefitsContent.classList.contains('hidden')) {
            toggleBenefitsBtn.innerHTML = '<i class="fa-solid fa-lightbulb"></i> View Sleep Benefits';
        } else {
            toggleBenefitsBtn.innerHTML = '<i class="fa-solid fa-lightbulb"></i> Hide Sleep Benefits';
        }
    });
}

if (addSleepBtn) {
    addSleepBtn.addEventListener('click', () => {
        if (currentSleepHours < maxSleepHours) {
            currentSleepHours++;
            if (currentSleepHoursText) currentSleepHoursText.textContent = currentSleepHours;
            
            if (currentSleepHours === maxSleepHours) {
                if (sleepCongratsMsg) sleepCongratsMsg.classList.remove('hidden');
                addSleepBtn.disabled = true;
                addSleepBtn.style.opacity = '0.5';
                if (statusSleepIcon) statusSleepIcon.className = 'fa-solid fa-circle-check status-icon text-success';
                if (itemSleepCard) itemSleepCard.classList.add('completed');
                isSleepCompleted = true; 
                checkPerfectDay();
            }
        }
    });
}

if (resetSleepBtn) {
    resetSleepBtn.addEventListener('click', () => {
        currentSleepHours = 0;
        if (currentSleepHoursText) currentSleepHoursText.textContent = currentSleepHours;
        
        if (sleepCongratsMsg) sleepCongratsMsg.classList.add('hidden');
        if (addSleepBtn) {
            addSleepBtn.disabled = false;
            addSleepBtn.style.opacity = '1';
        }
        if (statusSleepIcon) statusSleepIcon.className = 'fa-solid fa-circle-xmark status-icon text-danger';
        if (itemSleepCard) itemSleepCard.classList.remove('completed');
        isSleepCompleted = false;
        checkPerfectDay();
    });
}

// ========================================================
// 9. لوجيك تحريك سلايدر الهيدر أوتوماتيك (Header Slider)
// ========================================================
const sliderTrack = document.getElementById('headerSliderTrack');

if (sliderTrack) {
    const slides = sliderTrack.querySelectorAll('.slide-item');
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    function autoMoveSlider() {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }

    setInterval(autoMoveSlider, 3000);
}

// ========================================================
// 10. لوجيك السحب الأفقي لكروت الأمراض المزمنة (Horizontal Scroll)
// ========================================================
const cardsTrack = document.getElementById('diseaseCardsTrack');
const scrollLeftBtn = document.getElementById('scroll-left-btn');
const scrollRightBtn = document.getElementById('scroll-right-btn');
const viewAllBtn = document.getElementById('view-all-btn');

if (cardsTrack) {
    if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', () => {
            cardsTrack.scrollBy({ left: 290, behavior: 'smooth' });
        });
    }

    if (scrollLeftBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            cardsTrack.scrollBy({ left: -290, behavior: 'smooth' });
        });
    }

    if (viewAllBtn) {
        let isAtEnd = false;
        viewAllBtn.addEventListener('click', () => {
            if (!isAtEnd) {
                cardsTrack.scrollTo({ left: cardsTrack.scrollWidth, behavior: 'smooth' });
                viewAllBtn.innerHTML = `Show Less <i class="fa-solid fa-arrow-left"></i>`;
                isAtEnd = true;
            } else {
                cardsTrack.scrollTo({ left: 0, behavior: 'smooth' });
                viewAllBtn.innerHTML = `View All <i class="fa-solid fa-arrow-right"></i>`;
                isAtEnd = false;
            }
        });
    }
}