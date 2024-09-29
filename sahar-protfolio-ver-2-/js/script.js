// ========================== typing animation ======================== 
var typed = new Typed(".typing", {
    strings:["Full Stack Developer"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})
// ========================== aside ======================== 
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length;
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;
      for(let i=0; i<totalNavList; i++)
      {
        const a= navList[i].querySelector("a");
        a.addEventListener("click", function()
    {
        removeBackection();
        for(let j=0; j<totalNavList; j++)
        {
            if(navList[j].querySelector("a").classList.contains("active"))
            {
                addBackSection(j);
                // allSection[j].classList.add("back-seciton");
            }
            navList[j].querySelector("a").classList.remove("active")
        }
        this.classList.add("active")
        showSection(this);
        if(window.innerWidth< 1200)
        {
            asideSectionTogglerBtn();
        }
    })
      }
    function removeBackection()
    {
        for(let i=0; i<totalSection; i++)
        {
            allSection[i].classList.remove("back-section")
        }
    }
    function addBackSection(num)
    {
        allSection[num].classList.add("back-section");
    }
    function showSection(element)
    {
        for(let i=0; i<totalSection; i++)
        {
            allSection[i].classList.remove("active")
        }
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active")
    }
    function updateNav(element)
    {
        for(let i=0; i<totalNavList; i++)
        {
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
            {
                navList[i].querySelector("a").classList.add("active");
            }
        }
    }
    document.querySelector(".hire-me").addEventListener("click", function()
{
    const sectionIndex = this.getAttribute("data-section-index");
    // console.log(sectionIndex);
    showSection(this);
    updateNav(this);
    removeBackection();
    addBackSection(sectionIndex);
})
    const navTogglerBtn = document.querySelector(".nav-toggler"),
          aside = document.querySelector(".aside");
          navTogglerBtn.addEventListener("click", () =>
        {
            asideSectionTogglerBtn();
        })
        function asideSectionTogglerBtn()
        {
            aside.classList.toggle("open");
            navTogglerBtn.classList.toggle("open");
            for(let i=0; i<totalSection; i++)
            {
                allSection[i].classList.toggle("open");
            }
        }
                // סקריפט לתמיכה בטאצ' עבור מכשירים ניידים
document.addEventListener('DOMContentLoaded', function () {
    // פונקציה להוספת אירוע טאצ' לכל אלמנט עם מחלקת 'service-item'
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        item.addEventListener('touchstart', function () {
            this.classList.toggle('active'); // ניתן לשנות את המחלקה או להוסיף אפקטים שונים
        });
    });

    // פונקציה להוספת אירוע טאצ' לכל כפתור שליחת הודעה
    const sendMessageButton = document.querySelector('.contact-form button[type="submit"]');

    sendMessageButton.addEventListener('touchstart', function () {
        alert("Message Sent!"); // ניתן להחליף עם פונקציה לשליחת הודעה
    });
});