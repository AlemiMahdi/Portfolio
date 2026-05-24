emailjs.init("6nCdqHUbjWEgWj_-t");

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("from_name");
    const email = document.getElementById("from_email");
    const message = document.getElementById("message");
    const status = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    [name, email, message].forEach(f => f.classList.remove("invalid"));
    [nameError, emailError, messageError].forEach(e => e.classList.remove("visible"));
    status.textContent = "";
    status.className = "form-status";

    let valid = true;

    if (name.value.trim() === "") {
        name.classList.add("invalid");
        nameError.classList.add("visible");
        valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add("invalid");
        emailError.classList.add("visible");
        valid = false;
    }

    if (message.value.trim() === "") {
        message.classList.add("invalid");
        messageError.classList.add("visible");
        valid = false;
    }

    if (!valid) return;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    emailjs.sendForm("service_4dw1sng", "template_t8xjnlt", this)
        .then(() => {
            status.textContent = "Message sent successfully!";
            status.classList.add("success");
            contactForm.reset();
        })
        .catch(() => {
            status.textContent = "Something went wrong. Please try again.";
            status.classList.add("error");
        })
        .finally(() => {
            submitBtn.textContent = "Send Message";
            submitBtn.disabled = false;
        });
});


const cards = document.querySelectorAll('.skill-card');

const observer = new IntersectionObserver ((entries) =>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold: 0.2
});

cards.forEach(card =>{
    observer.observe(card);
})

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function(){
    navLinks.classList.toggle("open");
})

navLinks.querySelectorAll("a").forEach(link =>{
    link.addEventListener("click", ()=>{
        navLinks.classList.remove("open");
    })
})

const titles = [
    "Fullstack Developer",
    "Java Developer",
    "C# Developer",
    "Frontend Developer",
    "Backkend Developer"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type(){
    const current = titles[titleIndex];
    const typingEl = document.getElementById("typing-text");

    if(isDeleting){
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 100;
    if(!isDeleting && charIndex === current.length) {
        speed = 1500;
        isDeleting = true;
    }else if(isDeleting && charIndex === 0){
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 400;
    }

    setTimeout(type, speed)
}
type();

const apiKey = "2c4668fc513670b11af248477540cbf1";
const city = "Stockholm";

async function fetchWeather() {
    const widget = document.getElementById("weather-widget");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error("Weather fetch failed");

        const data = await response.json();

        const icon = data.weather[0].icon;
        const desc = data.weather[0].description;
        const temp = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const location = data.name;

        widget.innerHTML = `
            <div class="weather-widget-content">
                <span class="weather-city">📍 ${location}</span>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" style="width: 50px;">
                    <span class="weather-temp">${temp}°C</span>
                </div>
                <span class="weather-desc">${desc}</span>
                <div class="weather-details">
                    <span>🌡️ Feels like ${feelsLike}°C</span>
                    <span>💧 ${humidity}%</span>
                </div>
            </div>
        `;
    } catch (error) {
        widget.innerHTML = `<p class="weather-error">Could not load weather data.</p>`;
    }
}

fetchWeather();