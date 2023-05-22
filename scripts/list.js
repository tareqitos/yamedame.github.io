const reponse = await fetch("scripts/list-links.json");
const links = await reponse.json();
const grammarArray = links.grammar;
const kanjiArray = links.kanji;
const booksArray = links.books;
const mediaArray = links.media;

createElement(grammarArray, "grammar");
createElement(kanjiArray, "kanji");
createElement(booksArray, "books");
createElement(mediaArray, "media");

function createElement(arrayElement, sectionToQuery){

    for (let i = 0; i < arrayElement.length; i++) {
        const array = arrayElement[i];

        const section = document.querySelector(".section-" + sectionToQuery);
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
        
        //const iconElement = document.createElement("img");
        //iconElement.src = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + link.link;

        defineElements(array, itemContainer, itemContainerParent, link, linkName, desc, sectionToQuery);
        appendElements(section, sectionItems, itemContainer, itemContainerParent, link, linkName, desc);
    }
}

function defineElements(array, itemContainer, itemContainerParent, link, linkName, desc, sectionToQuery){
    if(sectionToQuery === "media"){
        itemContainer.className = "item-container-" + array.id;
    }
    else{
        itemContainer.className = "item-container";
    }
    
    itemContainerParent.className = "item-container-parent";
    link.href = array.link;
    link.setAttribute("target", "_blank");
    linkName.innerText = array.name;

    desc.innerText = array.description;
    desc.className = "item-desc";
}

function appendElements(section, sectionItems, itemContainer, itemContainerParent, link, linkName, desc){
    section.appendChild(sectionItems);
    sectionItems.appendChild(itemContainer);

    itemContainer.appendChild(link);
    link.appendChild(itemContainerParent);
    itemContainerParent.appendChild(linkName);
    itemContainer.appendChild(desc);
}

function createImageTag(array, itemContainerParent){
    const img = document.createElement("img");
    img.className = "thumbnail-" + array.id;
    img.src = array.pic;
    itemContainerParent.appendChild(img);
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