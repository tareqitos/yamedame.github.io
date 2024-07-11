async function fetchData () {
  try {
    const reponse = await fetch('scripts/list-links.json')
    const links = await reponse.json()
    console.log(links)

    const mediaArray = links.media

    sortByName(mediaArray)
    createElement(mediaArray, 'media')

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

        setTimeout(function () {
          itemContainer.classList.add('appear')
        })
        createImageTag(array, itemContainerParent)
      }
    }

    ////////////////////////////////////////////////// SORT ELEMENTS //////////////////////////////////////////////////

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

    ///////////////////////////////////////////////// ADD ATTRIBUTE TO CREATED ELEMENTS //////////////////////////////////////////////////

    function defineElements (
      array,
      itemContainer,
      itemContainerParent,
      link,
      linkName,
      desc,
      sectionToQuery
    ) {
      itemContainer.className = 'item-container'
      itemContainerParent.className = 'item-container-parent ' + sectionToQuery

      link.href = array.link
      link.setAttribute('target', '_blank')

      linkName.innerText = array.name

      desc.innerText = array.description
      desc.className = 'item-desc'
    }

    ////////////////////////////////////////////////// PARENT ELEMENTS //////////////////////////////////////////////////

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

    ////////////////////////////////////////////////// CREATE IMAGE TAG FOR MEDIA ELEMENTS //////////////////////////////////////////////////

    function createImageTag (array, itemContainerParent) {
      const img = document.createElement('img')
      img.className = 'thumbnail-' + array.id
      img.src = array.pic
      itemContainerParent.appendChild(img)
    }

    ////////////////////////////////////////////////// UPDATE ELEMENTS IN MEDIA //////////////////////////////////////////////////

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
          updateCollapseContentHeight()
        }, 300) // la durée de l'animation CSS (0.3s dans cet exemple)
      }
    }

    // Event listener pour l'élément select
    const sortMediaSelect = document.getElementById('sort-media')
    const selectionMessage = document.querySelector('.selection-message')
    const mediaContainer = document.querySelector('.section-media-items')
    const collapseContent = document.querySelector(
      '.collapse-media .collapse-content'
    )
    const mediaHeader = document.querySelector('.collapse-media')

    sortMediaSelect.selectedIndex = 0
    console.log(sortMediaSelect.selectedIndex)

    sortMediaSelect.addEventListener('change', event => {
      const selectedCategory = event.target.value
      selectionMessage.style.display = 'none'
      updateDisplayedItems(selectedCategory)
      updateCollapseContentHeight()
    })

    function updateCollapseContentHeight () {
      // Set the height of collapseContent to its scrollHeight
      collapseContent.style.maxHeight = collapseContent.scrollHeight + 'px'
    }

    updateCollapseContentHeight()

    // Initialize en affichant tous les éléments initialement
    updateDisplayedItems()

    ////////////////////////////////////////////////// SUGGESTION FORM //////////////////////////////////////////////////

    const suggestionForm = document.querySelector('.suggestion-form');
    const suggestionText = document.querySelector('.suggestion-text');
    const suggButton = document.querySelector('.suggestion-button');

    suggButton.addEventListener('click', () => {
      //suggestionForm.classList.toggle('suggestion-form--active')

     /* if (suggestionForm.classList.contains('suggestion-form--active')) {
        //suggestionText.style.opacity = 0;
        setTimeout(() => {
          suggestionText.style.display = 'none';
          suggestionForm.style.display = 'flex';
          suggestionForm.style.gap = 5 + 'px';
          setTimeout(() => {
            suggestionForm.style.opacity = 1;
          }, 50)
        }, 50)
        
        
      } else {
        suggestionForm.classList.toggle('suggestion-form')
        setTimeout(() => {
          suggestionForm.style.display = 'none';
          suggestionText.style.display = 'block';
          setTimeout(() => {
            suggestionText.style.opacity = 1;
          }, 50)
        }, 50)
      }*/

    }) 

    /*
    const suggestionForm = document.querySelector('.suggestion-box')
    const suggestionBackground = document.querySelector(
      '.suggestion-background'
    )
    const suggestionButton = document.querySelectorAll('#suggestion')
    const suggestionConfirmButton = document.getElementById('submit')

    const thanksBox = document.querySelector('.thankyou-box')
    const thanksCloseButton = document.querySelector('.thankyou-close')
    const errorBox = document.querySelector('.error-box')
    const errorCloseButton = document.querySelector('.error-close')
    const errorMessage = document.querySelector('.incorrect-msg')

    suggestionButton.forEach(button => {
      button.addEventListener('click', () => {
        suggestionForm.classList.toggle('suggestion-box--active')
        suggestionBackground.classList.toggle('suggestion-background--active')

        if (suggestionForm.classList.contains('suggestion-box--active')) {
          suggestionForm.style.display = 'flex'
          suggestionBackground.style.display = 'block'
          document.body.style.overflow = 'hidden'
        }
      })
    })

    suggestionBackground.addEventListener('click', () => {
      closeSuggestionBackground()
    })

    thanksCloseButton.addEventListener('click', () => {
      closeThanksButton(thanksBox)
    })

    errorCloseButton.addEventListener('click', () => {
      closeThanksButton(errorBox)
    })

    function closeSuggestionBackground () {
      suggestionBackground.classList.remove('suggestion-background--active')
      suggestionForm.classList.remove('suggestion-box--active')
      suggestionBackground.style.display = 'none'
      suggestionForm.style.display = 'none'
      thanksBox.style.display = 'none'
      document.body.style.overflow = 'visible'
      errorMessage.style.display = 'none'
      errorMessage.style.bottom = '45px'
      errorMessage.style.opacity = '0'
    }

    function closeThanksButton (button) {
      button.style.display = 'none'
      suggestionBackground.classList.remove('suggestion-background--active')
      suggestionBackground.style.display = 'none'
      document.body.style.overflow = 'visible'
      errorMessage.style.display = 'none'
      errorMessage.style.bottom = '45px'
      errorMessage.style.opacity = '0'
    }

    function suggestionIsValid () {
      suggestionForm.classList.remove('suggestion-box--active')
      suggestionForm.style.display = 'none'
      thanksBox.style.display = 'flex'
    }

    function suggestionIsNotValid () {
      suggestionForm.classList.remove('suggestion-box--active')
      suggestionForm.style.display = 'none'
      errorBox.style.display = 'flex'
    }
    */

    $(document).ready(function () {
      $('#submit').on('click', function () {
        var form = $('#myForm')[0]

        if (form.checkValidity()) {
          const loadingAnimation = document.querySelector('.lds-ellipsis')
          const submitButtonText = document.getElementById('submit-text')
          submitButtonText.style.display = 'none'
          loadingAnimation.style.display = 'inline-block'

          var formData = {
            name: $('#add-name').val(),
            title: $('#add-title').val(),
            link: $('#add-link').val(),
            //category: $('#category').val()
          }

          $.ajax({
            url: 'https://formsubmit.co/ajax/social@tareqitos.com',
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
              // Handle the success response
              submitButtonText.style.display = 'block'
              loadingAnimation.style.display = 'none'
              console.log(response)
            },
            error: function (error) {
              // Handle the error response
              submitButtonText.style.display = 'block'
              loadingAnimation.style.display = 'none'
              console.error(error)
            }
          })
        } else {
          // If the form is not valid, you can add your own handling logic here

          errorMessage.style.display = 'block'
          setTimeout(() => {
            errorMessage.style.bottom = '0'
            errorMessage.style.opacity = '1'
          }, 10)

          console.log('Form is not valid')
        }
      })
    })
  } catch (erreur) {
    console.error(erreur)
  }
}

fetchData()
