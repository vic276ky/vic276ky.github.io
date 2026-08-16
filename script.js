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