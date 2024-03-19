import anime from "animejs";

function backToTop(){
    scrollTo(0, 0);
}

function createTypingEffect(text, elementOuEcrire, spd) {
    let i = 0;
    const speed = spd;

    function writeText() {
        const element = document.querySelector(elementOuEcrire);
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(writeText, speed);
        }
    }

    function checkScroll() {
        const textContainer = document.querySelector(elementOuEcrire);
        const rect = textContainer.getBoundingClientRect();
        const isTextVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

        if (isTextVisible && i === 0) {
            writeText();
        }
    }

    window.addEventListener('load', function () {
        checkScroll();
    });

    window.addEventListener('scroll', function () {
        checkScroll();
    });
}

createTypingEffect("Mes expériences", '#experiences-heading', 50);
createTypingEffect("Loris Caruhel", '#mon_nom', 50);
createTypingEffect("Ma scolarité", '#scolarite-heading', 50);
createTypingEffect("Futer Développeur", '#moi-heading', 50);

anime({
    targets: '.square',
    translateX: 250
});