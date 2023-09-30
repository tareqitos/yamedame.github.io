// COLLAPSE CATEGORY //

collapseCategories();

function collapseCategories(){

    document.querySelectorAll('.collapse-button').forEach(button => {
        const collapseContent = button.nextElementSibling;
        button.addEventListener('click', () => {
            
            button.classList.toggle('collapse-button--active');
    
            if (button.classList.contains('collapse-button--active')) {
                collapseContent.style.maxHeight = 0;
                collapseContent.style.opacity = 0;
                collapseContent.style.marginTop = 0;
                collapseContent.style.overflowY = "hidden";

                window.addEventListener('resize', () => {
                    collapseContent.style.maxHeight = 0;
                });

            } else {
                collapseContent.style.maxHeight = collapseContent.scrollHeight + 'px';
                collapseContent.style.opacity = 1;
                collapseContent.style.marginTop = 40 + 'px';
                collapseContent.style.overflowY = "visible";
                
                if (collapseContent.style.maxHeight !== 0) {
                    window.addEventListener('resize', () => {
                        collapseContent.style.maxHeight = collapseContent.scrollHeight + 'px';
                    });
                }
            }
        });
    });
}

// BACK TO TOP BUTTON //

const backToTopButton = document.getElementById("back-to-top");
const footer = document.getElementById("footer");

window.onscroll = function(){
    scrollFunction();
};

backToTopButton.addEventListener("click", backToTop)

backToTopButton.addEventListener("scoll", (event) => {
    console.log(backToTopButton.scrollTop);
});


function isFooterVisible(){
    const rect = footer.getBoundingClientRect();
    return rect.top <= window.innerHeight + 50;
}

function scrollFunction(){
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150 && !isFooterVisible()) {
        backToTopButton.style.opacity = 1;
        backToTopButton.style.zIndex = 99;
    }else {
        backToTopButton.style.opacity = 0;
        backToTopButton.style.zIndex = -99;
    }
}

function backToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// COLOR SCHEME //

darkTheme();

function darkTheme(){
    const html = document.getElementsByTagName("html")[0];
    console.log(html);
    const themeSwitch = document.getElementById("theme-logo");
    const autoDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    if(autoDarkTheme.matches){
        html.classList.toggle("nightMode");
        themeSwitch.innerHTML = "明";
        localStorage.setItem(html.classList, "nightMode");
    }else{
        html.classList.remove("nightMode");
        themeSwitch.innerHTML = "暗";
        localStorage.setItem(html.classList, "");
    }
    
    themeSwitch.addEventListener("click", () => {
        html.classList.toggle("nightMode");
        if(html.classList.contains("nightMode")){
            themeSwitch.innerHTML = "明";
            localStorage.setItem(html, "nightMode");
        }else{
            themeSwitch.innerHTML = "暗";
            localStorage.setItem(html.classList, "");
        }
    });
}


