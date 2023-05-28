const reponse = await fetch("scripts/list-links.json");
const links = await reponse.json();
const dicoArray = links.dictionaries;
const grammarArray = links.grammar;
const kanjiArray = links.kanji;
const miscArray = links.misc;
const mediaArray = links.media;
const softwareArray = links.software;
const categories = [dicoArray, grammarArray, kanjiArray, miscArray, mediaArray, softwareArray];
const categoriesName = ["dictionaries", "grammar", "kanji", "misc", "media", "software"];

darkTheme();
createCategoriesAndSort()
collapseCategories()

function createCategoriesAndSort(){
    for (let i = 0; i < categories.length; i++){
        sortByName(categories[i]);
        createElement(categories[i], categoriesName[i]);
    }
}

function createElement(arrayElement, sectionToQuery){

    for (let i = 0; i < arrayElement.length; i++) {
        const array = arrayElement[i];

        const sectionItems = document.querySelector(".section-" + sectionToQuery + "-items");
        
        const itemContainer = document.createElement("div");
        const itemContainerParent = document.createElement("div");

        const link = document.createElement("a");
        const linkName = document.createElement("p");
        const desc = document.createElement("p");

        if (sectionToQuery === "media"){
            createImageTag(array, itemContainerParent)
            console.log("Img created for " + sectionToQuery);
        }

        defineElements(array, itemContainer, itemContainerParent, link, linkName, desc, sectionToQuery);
        appendElements(sectionItems, itemContainer, itemContainerParent, link, linkName, desc, sectionToQuery);


    }
}

function defineElements(array, itemContainer, itemContainerParent, link, linkName, desc, sectionToQuery){
    if(sectionToQuery === "media"){
    desc.id = array.id;
    }
    
    if(sectionToQuery === "software"){
        itemContainerParent.id = array.id;
        desc.id = "desc-" + array.id;
        linkName.className = "item-title";
        linkName.id ="title-" + array.id;
    }

    itemContainer.className = "item-container";   
    itemContainerParent.className = "item-container-parent " + sectionToQuery;
    link.href = array.link;
    link.setAttribute("target", "_blank");
    linkName.innerText = array.name;

    desc.innerText = array.description;
    desc.className = "item-desc";
}

function appendElements(sectionItems, itemContainer, itemContainerParent, link, linkName, desc, sectionToQuery){
    sectionItems.appendChild(itemContainer);

    itemContainer.appendChild(link);
    link.appendChild(itemContainerParent);
    if(sectionToQuery === "media"){
        itemContainer.appendChild(linkName);
    } else {
        itemContainerParent.appendChild(linkName);
    }
    itemContainer.appendChild(desc);
}

function createImageTag(array, itemContainerParent){
    const img = document.createElement("img");
    img.className = "thumbnail-" + array.id;
    img.src = array.pic;
    itemContainerParent.appendChild(img);
}

function collapseCategories(){
    
    document.querySelectorAll('.collapse-button').forEach(button => {
        button.addEventListener('click', () => {
            const collapseContent = button.nextElementSibling;
    
            button.classList.toggle('collapse-button--active');
    
            if (button.classList.contains('collapse-button--active')) {
    
                collapseContent.style.maxHeight = 0;
                collapseContent.style.opacity = 0;
                collapseContent.style.marginTop = 0;
            } else {
                collapseContent.style.maxHeight = collapseContent.scrollHeight + 'px';
                collapseContent.style.opacity = 1;
                collapseContent.style.marginTop = 40 + 'px';
            }
        });
    });
}

function sortByName(array) {
    array.sort(function(a, b){
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    });
}

function darkTheme(){
    const html = document.getElementsByTagName("html")[0];
    const themeSwitch = document.getElementById("theme-logo");
    const autoDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    if(autoDarkTheme.matches){
        html.classList.toggle("nightMode");
        themeSwitch.innerHTML = "明";
    }else{
        html.classList.remove("nightMode");
        themeSwitch.innerHTML = "暗";
    }
    
    themeSwitch.addEventListener("click", () => {
        html.classList.toggle("nightMode");
        if(html.classList.contains("nightMode")){
            themeSwitch.innerHTML = "明";
        }else{
            themeSwitch.innerHTML = "暗";
        }
    });
}