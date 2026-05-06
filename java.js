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