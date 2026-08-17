// Matrix Rain Effect
window.addEventListener('load', function() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff99";
        ctx.font = fontSize + "px monospace";

        drops.forEach((y, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }

    setInterval(drawMatrix, 35);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

// Typing Animation
const text = "Cybersecurity Enthusiast | Engineer.";
const typingElement = document.querySelector('.typing');
let index = 0;
let blinkInterval;

function type() {
    if (index < text.length) {
        typingElement.innerHTML =
            '<span style="color:#aaaaaa">' +
            text.slice(0, index + 1) +
            '</span>' +
            '<span style="color:#00ff99">█</span>';
        index++;
        setTimeout(type, 80);
    } else {
        let visible = true;
        blinkInterval = setInterval(() => {
            typingElement.innerHTML =
                '<span style="color:#aaaaaa">' + text + '</span>' +
                '<span style="color:#00ff99">' + (visible ? '█' : '&nbsp;') + '</span>';
            visible = !visible;
        }, 500);
    }
}

type();

// Leet Effect
const leetMap = {
    'I': '1',
    'G': '9',
    'E': '3',
    'S': '5',
    'A': '4',
    'O': '0',
    'T': '7'
};

function leetEffect(element, originalText) {
    let nameArray = originalText.split('');
    let index = 0;

    function transformNext() {
        if (index < nameArray.length) {
            if (leetMap[nameArray[index]]) {
                let temp = nameArray.slice();
                temp[index] = leetMap[nameArray[index]];
                element.textContent = temp.join('');

                setTimeout(() => {
                    element.textContent = nameArray.join('');
                    index++;
                    setTimeout(transformNext, 300);
                }, 400);
            } else {
                index++;
                setTimeout(transformNext, 300);
            }
        }
    }
    transformNext();
}

function repeatLeet(element, originalText) {
    leetEffect(element, originalText);
    setTimeout(() => repeatLeet(element, originalText), originalText.length * 700 + 1000);
}

// Apply leet to name
const nameElement = document.querySelector('h1');
repeatLeet(nameElement, "VIGNESH R");

// Apply leet to all section headings
const headings = document.querySelectorAll('h2');
headings.forEach((heading) => {
    const originalText = heading.textContent.toUpperCase();
    repeatLeet(heading, originalText);
});

// Scroll Animation
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