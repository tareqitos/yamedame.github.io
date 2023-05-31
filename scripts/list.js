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

createCategoriesAndSort();

// SORT ELEMENT IN CATEGORY //

function createCategoriesAndSort(){
    for (let i = 0; i < categories.length; i++){
        sortByName(categories[i]);
        createElement(categories[i], categoriesName[i]);
    }
}

// CREATE HTML // 

function createElement(arrayElement, sectionToQuery){

    for (let i = 0; i < arrayElement.length; i++) {
        const array = arrayElement[i];

        const sectionItems = document.querySelector(".section-" + sectionToQuery + "-items");
        
        const itemContainer = document.createElement("div");
        const itemContainerParent = document.createElement("div");

        const link = document.createElement("a");
        const linkName = document.createElement("p");
        const desc = document.createElement("p");

        defineElements(array, itemContainer, itemContainerParent, link, linkName, desc, sectionToQuery);
        appendElements(sectionItems, itemContainer, itemContainerParent, link, linkName, desc, sectionToQuery);
        
        // IF SECTION IS MEDIA, CREATE IMAGE MINIATURE //

        if (sectionToQuery === "media"){
            createImageTag(array, itemContainerParent)
            console.log("Img created for " + sectionToQuery);
        } 
        
        // ADD FAVICON TO DESCRIPTION EXCEPT FOR SOFTWARE //

        if (sectionToQuery !== "software") {
            const descIcon = document.createElement("img");
            descIcon.className = "desc-favicon";
            descIcon.src = array.favicon;
            desc.appendChild(descIcon);
        }

        addSoftwareIcons(sectionToQuery, array, itemContainer);
    }
}

// ADD ATTRIBUTE TO CREATED ELEMENT //

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

// PARENT ELEMENT TO HIERARCHY //

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

// ADD SOFTWARE ICONS //

function addSoftwareIcons(sectionToQuery, array, itemContainer){
    if (sectionToQuery === "software"){
        const devices = ["windows", "apple", "android"];
        const softwareDesc = document.querySelector(".item-container #desc-" + array.id);
        const iDiv = document.createElement("div");
        iDiv.className = "software-icon";

        for (let i = 0; i < devices.length; i++){
            const icon = document.createElement("i");
            if (array.device.includes(devices[i])){
                icon.classList = "fa-brands fa-" + devices[i];
                itemContainer.appendChild(iDiv).appendChild(icon);
                iDiv.appendChild(softwareDesc);
                iDiv.prepend(softwareDesc);   
            }
        }
    }
}

// CREATE IMAGE TAG FOR MEDIA ELEMENTS // 

function createImageTag(array, itemContainerParent){
    const img = document.createElement("img");
    img.className = "thumbnail-" + array.id;
    img.src = array.pic;
    itemContainerParent.appendChild(img);
}

// SORT ELEMENTS //

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

