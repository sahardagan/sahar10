// פונקציות עזר לטיפול בתאריכים
const formatDate = (date) => {
  return new Date(date).toLocaleDateString(); // הפיכת התאריך לפורמט קריא
};

module.exports = { formatDate }; // ייצוא הפונקציות לשימוש בקבצים אחרים
