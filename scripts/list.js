const reponse = await fetch('scripts/list-links.json')
const links = await reponse.json()
const beginnersArray = links.beginners
const dicoArray = links.dictionaries
const grammarArray = links.grammar
const kanjiArray = links.kanji
const miscArray = links.misc
const mediaArray = links.media
const softwareArray = links.software
const categories = [
  beginnersArray,
  dicoArray,
  grammarArray,
  kanjiArray,
  miscArray,
  mediaArray,
  softwareArray
]
const categoriesName = [
  'beginners',
  'dictionaries',
  'grammar',
  'kanji',
  'misc',
  'media',
  'software'
]

createCategoriesAndSort()

// Fonction pour mettre à jour les éléments affichés en fonction de la catégorie sélectionnée
function updateDisplayedItems (category) {
  const mediaContainer = document.querySelector('.section-media-items')

  let mediaData

  // Sélectionnez les données en fonction de la catégorie choisie
  if (category === 'all') {
    mediaData = links.media
  } else {
    mediaData = links.media.filter(all => all.type.includes(category))
  }

  const mediaElements = document.querySelectorAll(
    '.section-media-items .item-container'
  )

  // Ajoutez une classe CSS pour activer l'animation de scale
  mediaElements.forEach(element => {
    element.classList.add('disappear')
  })

  // Check si les éléments ne sont pas chargés
  if (mediaContainer.lastElementChild == null) {
    createElement(mediaData, 'media')
  } else {
    // Attendez la fin de l'animation avant de supprimer les éléments
    setTimeout(() => {
      while (mediaContainer.lastElementChild) {
        mediaContainer.lastElementChild.remove()
      }

      // Créez les nouveaux éléments
      createElement(mediaData, 'media')
    }, 300) // Assurez-vous que le délai correspond à la durée de l'animation CSS (0.3s dans cet exemple)
  }
}

// Event listener pour l'élément select
const sortMediaSelect = document.getElementById('sort-media')
const selectionMessage = document.querySelector('.selection-message')
sortMediaSelect.selectedIndex = 0
console.log(sortMediaSelect.selectedIndex)

sortMediaSelect.addEventListener('change', event => {
  const selectedCategory = event.target.value
  selectionMessage.style.display = 'none'
  updateDisplayedItems(selectedCategory)
})

// Initialize en affichant tous les éléments initialement
updateDisplayedItems()

// SORT ELEMENT IN CATEGORY //

function sortItems () {
  const selectedCategory = document.getElementById('sort-media').value

  const items = document.querySelectorAll('.item')

  items.forEach(item => {
    const category = item.getAttribute('data-category')
    if (selectedCategory === 'all' || selectedCategory === category) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
}

// Écouter les changements de sélection dans la liste déroulante
const selectElement = document.getElementById('sort-media')
selectElement.addEventListener('change', sortItems)

// Appeler la fonction de tri initialement pour afficher correctement la page
sortItems()

function createCategoriesAndSort () {
  for (let i = 0; i < categories.length; i++) {
    const checkCategory = document.getElementById(categoriesName[i])

    if (checkCategory) {
      console.log(categoriesName[i])
      sortByName(categories[i])
      createElement(categories[i], categoriesName[i])
    }
  }
}

// CREATE HTML //

function createElement (arrayElement, sectionToQuery) {
  for (let i = 0; i < arrayElement.length; i++) {
    const array = arrayElement[i]

    const sectionItems = document.querySelector(
      '.section-' + sectionToQuery + '-items'
    )

    const itemContainer = document.createElement('div')
    const itemContainerParent = document.createElement('div')

    const link = document.createElement('a')
    const linkName = document.createElement('p')
    const desc = document.createElement('p')

    defineElements(
      array,
      itemContainer,
      itemContainerParent,
      link,
      linkName,
      desc,
      sectionToQuery
    )
    appendElements(
      sectionItems,
      itemContainer,
      itemContainerParent,
      link,
      linkName,
      desc,
      sectionToQuery
    )

    // IF SECTION IS MEDIA, CREATE IMAGE MINIATURE //

    if (sectionToQuery === 'media') {
      setTimeout(function () {
        itemContainer.classList.add('appear')
      })
      createImageTag(array, itemContainerParent)
    }

    /* causing ssl issues in firefox 
    // ADD FAVICON TO DESCRIPTION EXCEPT FOR SOFTWARE //

    if (sectionToQuery !== 'software') {
      const descIcon = document.createElement('img')
      descIcon.className = 'desc-favicon'
      descIcon.src = array.favicon
      desc.appendChild(descIcon)
    }
    */

    addSoftwareIcons(sectionToQuery, array, itemContainer)
    addRecommendationStar(array, itemContainerParent, linkName, sectionToQuery)
  }
  
}

// ADD ATTRIBUTE TO CREATED ELEMENT //

function defineElements (
  array,
  itemContainer,
  itemContainerParent,
  link,
  linkName,
  desc,
  sectionToQuery
) {
  if (sectionToQuery === 'media') {
    desc.id = array.id
  }

  if (sectionToQuery === 'software') {
    itemContainerParent.id = array.id
    desc.id = 'desc-' + array.id
    linkName.className = 'item-title'
    linkName.id = 'title-' + array.id
  }

  itemContainer.className = 'item-container'
  itemContainerParent.className = 'item-container-parent ' + sectionToQuery
  link.href = array.link
  link.setAttribute('target', '_blank')
  linkName.innerText = array.name

  desc.innerText = array.description
  desc.className = 'item-desc'
}

// PARENT ELEMENT TO HIERARCHY //

function appendElements (
  sectionItems,
  itemContainer,
  itemContainerParent,
  link,
  linkName,
  desc,
  sectionToQuery
) {
  sectionItems.appendChild(itemContainer)

  itemContainer.appendChild(link)
  link.appendChild(itemContainerParent)
  if (sectionToQuery === 'media') {
    itemContainer.appendChild(linkName)
  } else {
    itemContainerParent.appendChild(linkName)
  }
  itemContainer.appendChild(desc)
}

// ADD SOFTWARE ICONS //

function addSoftwareIcons (sectionToQuery, array, itemContainer) {
  if (sectionToQuery === 'software') {
    const devices = ['windows', 'apple', 'android']
    const softwareDesc = document.querySelector(
      '.item-container #desc-' + array.id
    )
    const iDiv = document.createElement('div')
    iDiv.className = 'software-icon'

    for (let i = 0; i < devices.length; i++) {
      const icon = document.createElement('i')
      if (array.device.includes(devices[i])) {
        icon.classList = 'fa-brands fa-' + devices[i]
        itemContainer.appendChild(iDiv).appendChild(icon)
        iDiv.appendChild(softwareDesc)
        iDiv.prepend(softwareDesc)
      }
    }
  }
}

// CREATE IMAGE TAG FOR MEDIA ELEMENTS //

function createImageTag (array, itemContainerParent) {
  const img = document.createElement('img')
  img.className = 'thumbnail-' + array.id
  img.src = array.pic
  itemContainerParent.appendChild(img)
}

function addRecommendationStar (
  array,
  itemContainerParent,
  linkName,
  sectionToQuery
) {
  if (array.recommended === 'true') {
    const star = document.createElement('i')

    if (sectionToQuery === 'media') {
      star.className = 'fa-solid fa-star star-user-media'
      linkName.appendChild(star)
    } else {
      star.className = 'fa-solid fa-star star-user'
      itemContainerParent.appendChild(star)
    }

    console.log('Star created for ' + array)
  }
}

// SORT ELEMENTS //

function sortByName (array) {
  array.sort(function (a, b) {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
}
