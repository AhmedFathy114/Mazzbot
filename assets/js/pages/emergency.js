// ========================================================
// 1. رقم المرافق المسجل ولوجيك مشاركة الموقع الجغرافي
// ========================================================
const shareLocationBtn = document.getElementById('share-location-btn');
const familyContactNumber = "201000000000"; 
if (shareLocationBtn) {
    shareLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            shareLocationBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Getting Location...`;
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const googleMapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
                    
                    const message = encodeURIComponent(
                        `🚨 EMERGENCY SOS ALERT! 🚨\nI need urgent medical help! My current live location is:\n${googleMapsUrl}`
                    );

                    // إرسال موقع الـ GPS المباشر ورسالة الاستغاثة لرقم المرافق على الواتساب
                    window.open(`https://wa.me/${familyContactNumber}?text=${message}`, '_blank');
                    
                    shareLocationBtn.innerHTML = `
                        <i class="fa-solid fa-location-dot"></i>
                        <div class="action-info">
                            <strong>Share Live Location</strong>
                            <span>Send via WhatsApp / SMS</span>
                        </div>`;
                },
                (error) => {
                    alert("Unable to fetch location. Please enable GPS location access on your device.");
                    shareLocationBtn.innerHTML = `
                        <i class="fa-solid fa-location-dot"></i>
                        <div class="action-info">
                            <strong>Share Live Location</strong>
                            <span>Send via WhatsApp / SMS</span>
                        </div>`;
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    });
}

// ========================================================
// 2. قاعدة بيانات وديناميكية كروت الإسعافات السريعة
// ========================================================
const injuryData = {
    heart: {
        title: "🚨 إسعافات الأزمة القلبية المفاجئة:",
        steps: [
            "اجعل المريض يجلس في وضع مريح (نصف مستلقٍ).",
            "فك الملابس الضيقة حول الرقبة والصدر.",
            "اطلب منه مضغ قرص أسبرين إذا كان متوفراً وغير متحسس."
        ]
    },
    burns: {
        title: "🔥 إسعافات الحروق الحرجة:",
        steps: [
            "برد الحرق بماء جاري فاتر (غير بارد جداً) لمدة 10-20 دقيقة.",
            "لا تضع الثلج أو المعجون أو المواد الدهنية على الحرق.",
            "غطّ الحرق بقطعة قماش نظيفة أو شاش معقم غير لاصق."
        ]
    },
    fractures: {
        title: "🦴 إسعافات الكسور والإصابات:",
        steps: [
            "ثبّت العضو المصاب تماماً ولا تحاول إعادة العظم لمكانه.",
            "ضع كمادات باردة ملفوفة بقماش لتقليل الورم.",
            "استخدم جبيرة مؤقتة لتثبيت الطرف فوق وتحت مفصل الكسر."
        ]
    },
    poison: {
        title: "🧪 إسعافات التسمم المفاجئ:",
        steps: [
            "حدد نوع المادة المسببة للتسمم فوراً.",
            "لا تجعل المصاب يتقيأ أبداً إلا بتعليمات مركز السموم.",
            "اتصل فوراً بمركز السموم (0226855555) أو الإسعاف (123)."
        ]
    }
};

const injuryBtns = document.querySelectorAll('.injury-btn');
const aidDisplayBox = document.getElementById('aidDisplayBox');

function renderAidContent(key) {
    const data = injuryData[key];
    if (!data || !aidDisplayBox) return;

    aidDisplayBox.innerHTML = `
        <h3 class="aid-title">${data.title}</h3>
        <ul class="aid-list">
            ${data.steps.map(step => `
                <li>
                    <span class="aid-check-icon"><i class="fa-solid fa-check"></i></span>
                    <span>${step}</span>
                </li>
            `).join('')}
        </ul>
    `;
}

// عرض الحالة الافتراضية عند التحميل (الأزمة القلبية)
renderAidContent('heart');

// التنقل والسويتش بين أزرار الإصابات
injuryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        injuryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const targetKey = btn.getAttribute('data-target');
        renderAidContent(targetKey);
    });
});