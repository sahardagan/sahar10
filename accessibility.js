document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('accessibility-toggle');
    const optionsMenu = document.getElementById('accessibility-options');
    const increaseFontSizeButton = document.getElementById('increase-font-size');
    const decreaseFontSizeButton = document.getElementById('decrease-font-size');
    const toggleContrastButton = document.getElementById('toggle-contrast');
    const highlightLinksButton = document.getElementById('highlight-links');
    const underlineLinksButton = document.getElementById('underline-links');
    const increaseTextWidthButton = document.getElementById('increase-text-width');
    const decreaseTextWidthButton = document.getElementById('decrease-text-width');
    const screenReaderButton = document.getElementById('screen-reader');

    let fontSize = 16; // Default font size
    let highContrast = false;
    let highlightLinks = false;
    let underlineLinks = false;
    let textWidth = 80; // Default width in percentage
    let screenReaderEnabled = false;

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

    underlineLinksButton.addEventListener('click', () => {
        underlineLinks = !underlineLinks;
        document.querySelectorAll('a').forEach(link => {
            if (underlineLinks) {
                link.style.textDecoration = 'underline';
            } else {
                link.style.textDecoration = '';
            }
        });
    });

    increaseTextWidthButton.addEventListener('click', () => {
        textWidth = Math.min(100, textWidth + 10);
        document.body.style.maxWidth = `${textWidth}%`;
    });

    decreaseTextWidthButton.addEventListener('click', () => {
        textWidth = Math.max(50, textWidth - 10);
        document.body.style.maxWidth = `${textWidth}%`;
    });

    screenReaderButton.addEventListener('click', () => {
        screenReaderEnabled = !screenReaderEnabled;
        if (screenReaderEnabled) {
            alert("Screen reader mode activated. Text will be read aloud.");
            // You can add a screen reader plugin or custom code here for real implementation
        } else {
            alert("Screen reader mode deactivated.");
        }
    });
});
