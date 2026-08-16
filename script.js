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

const name = "VIGNESH R";
const leetMap = {
    'I': '1',
	'G': '9',
    'E': '3',
    'S': '5'
};

const nameElement = document.querySelector('h1');

function leetEffect() {
    let nameArray = name.split('');
    let index = 0;

    function transformNext() {
        if (index < nameArray.length) {
            if (leetMap[nameArray[index]]) {
                let temp = nameArray.slice();
                temp[index] = leetMap[nameArray[index]];
                nameElement.textContent = temp.join('');
                
                setTimeout(() => {
                    nameElement.textContent = nameArray.join('');
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

function repeatLeet() {
    leetEffect();
    setTimeout(repeatLeet, name.length * 500 + 100);
}

repeatLeet();

function type() {
    if (index < text.length) {
        typingElement.textContent += text[index];
        index++;
        setTimeout(type, 80);
    }
}

type();