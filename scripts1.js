document.addEventListener("DOMContentLoaded", function () {
    // קבלת קישורים לאלמנטים ב-DOM
    const accessibilityButton = document.getElementById("accessibility-button");
    const accessibilityMenu = document.getElementById("accessibility-menu");
    const closeBtn = document.querySelector(".close-btn");

    // הצגת או הסתרת תפריט הנגישות על פי לחיצה על כפתור הנגישות
    accessibilityButton.addEventListener("click", function () {
        accessibilityMenu.classList.toggle("open");
    });

    // סגירת תפריט הנגישות על ידי לחיצה על כפתור הסגירה
    closeBtn.addEventListener("click", function () {
        accessibilityMenu.classList.remove("open");
    });

    // סגירת תפריט הנגישות גם כאשר לוחצים מחוץ לתפריט
    window.addEventListener("click", function (event) {
        if (event.target === accessibilityMenu) {
            accessibilityMenu.classList.remove("open");
        }
    });

    // דוגמא להוספת פעולות לכפתורי נגישות
    document.getElementById("high-contrast").addEventListener("click", function () {
        document.body.classList.toggle("high-contrast");
    });

    document.getElementById("color-blind").addEventListener("click", function () {
        document.body.classList.toggle("color-blind");
    });

    document.getElementById("increase-font").addEventListener("click", function () {
        // דוגמא להגדלת גודל הגופן
        const currentFontSize = window.getComputedStyle(document.body).fontSize;
        const currentFontSizeNum = parseFloat(currentFontSize);
        const newFontSize = currentFontSizeNum * 1.2; // לדוגמא, הגדלה של 20%
        document.body.style.fontSize = newFontSize + "px";
    });

    // וכו' לכל כפתור נוסף בהתאם לצורך
});
