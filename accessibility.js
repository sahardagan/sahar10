// accessibility.js

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('accessibility-toggle');
    const optionsMenu = document.getElementById('accessibility-options');
    const increaseFontSizeButton = document.getElementById('increase-font-size');
    const decreaseFontSizeButton = document.getElementById('decrease-font-size');
    const toggleContrastButton = document.getElementById('toggle-contrast');
    const highlightLinksButton = document.getElementById('highlight-links');
    
    let fontSize = 16; // Default font size
    let highContrast = false;
    let highlightLinks = false;
    
    toggleButton.addEventListener('click', () => {
        optionsMenu.classList.toggle('hidden');
    });
    
    increaseFontSizeButton.addEventListener('click', () => {
        fontSize += 2;
        document.body.style.fontSize = `${fontSize}px`;
    });
    
    decreaseFontSizeButton.addEventListener('click', () => {
        fontSize = Math.max(12, fontSize - 2);
        document.body.style.fontSize = `${fontSize}px`;
    });
    
    toggleContrastButton.addEventListener('click', () => {
        highContrast = !highContrast;
        if (highContrast) {
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
        } else {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        }
    });
    
    highlightLinksButton.addEventListener('click', () => {
        highlightLinks = !highlightLinks;
        document.querySelectorAll('a').forEach(link => {
            if (highlightLinks) {
                link.style.backgroundColor = 'yellow';
            } else {
                link.style.backgroundColor = '';
            }
        });
    });
});
