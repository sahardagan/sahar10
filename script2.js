/* // script.js
let isWhiteBackground = false;

document.getElementById('changeBackgroundButton').addEventListener('click', function () {
    if (isWhiteBackground) {
        document.body.style.backgroundColor = '#fff'; // צבע רקע התחלתי
        document.body.style.color = '#333'; // צבע טקסט התחלתי

        // שינוי צבע הרקע של כל האלמנטים למצב התחלתי
        var allElements = document.getElementsByTagName('*');
        for (var i = 0; i < allElements.length; i++) {
            allElements[i].style.backgroundColor = '';
            allElements[i].style.color = ''; // אם רוצים להחזיר גם את צבע הטקסט למצב התחלתי
        }
    } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black'; // צבע טקסט ללבן

        // שינוי צבע הרקע של כל האלמנטים ללבן
        var allElements = document.getElementsByTagName('*');
        for (var i = 0; i < allElements.length; i++) {
            allElements[i].style.backgroundColor = 'white';
            allElements[i].style.color = 'black'; // אם רוצים לשנות גם את צבע הטקסט של כל האלמנטים לשחור
        }
    }
    isWhiteBackground = !isWhiteBackground;
});

 */