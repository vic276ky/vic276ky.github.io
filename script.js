window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        var top = section.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            section.classList.add('visible');
            section.classList.remove('hidden');
        }
    });
});
const text = "Cybersecurity Enthusiast | Engineer";
const typingElement = document.querySelector('.typing');
let index = 0;

function type() {
    if (index < text.length) {
        typingElement.textContent += text[index];
        index++;
        setTimeout(type, 80);
    }
}

type();