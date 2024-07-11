async function fetchData () {
  try {
    const reponse = await fetch('scripts/list-links.json')
    const links = await reponse.json()
    console.log(links)

    /*
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

    */

    ////////////////////////////////////////////////// SUGGESTION FORM //////////////////////////////////////////////////

    const suggestionForms = document.querySelectorAll('.suggestion-form')
    const suggestionTexts = document.querySelectorAll('.suggestion-text')
    const suggButtons = document.querySelectorAll('.suggestion-button')
    const thanksTexts = document.querySelectorAll('.thanks-text')
    const errorTexts = document.querySelectorAll('.error-text')

    suggButtons.forEach((suggButton, index) => {
      suggButton.addEventListener('click', () => {
        const suggestionForm = suggestionForms[index]
        const suggestionText = suggestionTexts[index]
        const thanksText = thanksTexts[index]
        const errorText = errorTexts[index]

        suggestionForm.classList.toggle('suggestion-form--active')

        if (suggestionForm.classList.contains('suggestion-form--active')) {
          suggestionText.style.opacity = 0
          setTimeout(() => {
            suggestionText.style.display = 'none'
            suggestionForm.style.display = 'flex'
            suggestionForm.style.gap = 5 + 'px'
            setTimeout(() => {
              suggestionForm.style.opacity = 1
            }, 50)
          }, 50)
        } else {
          suggestionForm.classList.toggle('suggestion-form')
          suggestionForm.style.opacity = 0
          thanksText.style.opacity = 0
          errorText.style.opacity = 0
          setTimeout(() => {
            suggestionForm.style.display = 'none'
            suggestionText.style.display = 'block'
            thanksText.style.display = 'none'
            errorText.style.display = 'none'
            setTimeout(() => {
              suggestionText.style.opacity = 1
            }, 50)
          }, 50)

          thanksText.style.opacity = 0
          errorText.style.opacity = 0
          setTimeout(() => {
            thanksText.style.display = 'none'
            errorText.style.display = 'none'
          }, 50)
        }
      })
    })

    ////// INPUT VALIDATOR //////

    let inputs = document.querySelectorAll('.input')
    let buttonSends = document.querySelectorAll('.submit')

    let inputValidator = {
      name: false,
      title: false,
      link: false
    }

    inputs.forEach(input => {
      input.addEventListener('input', event => {
        let name = event.target.getAttribute('name')
        if (event.target.value.length > 0) {
          inputValidator[name] = true
        } else {
          inputValidator[name] = false
        }

        let allTrue = Object.keys(inputValidator).every(item => {
          return inputValidator[item] === true
        })

        buttonSends.forEach(buttonSend => {
          if (allTrue) {
            buttonSend.disabled = false
            buttonSend.style.pointerEvents = 'unset'
          } else {
            buttonSend.disabled = true
            buttonSend.style.pointerEvents = 'none'
          }
        })
      })
    })

    function suggestionIsValid (suggestionForm, thanksTexts, form) {
      suggestionForm.classList.toggle('suggestion-form')
      suggestionForm.style.display = 'none'

      thanksTexts.style.display = 'block'
      thanksTexts.style.opacity = 1

      form.reset()
    }

    buttonSends.forEach((buttonSend, index) => {
      buttonSend.addEventListener('click', event => {
        event.preventDefault()

        let form = event.target.closest('form')
        let loadingAnimation = form.querySelector('.lds-ellipsis')
        let submitButtonText = form.querySelector('.submit-text')
        const thanksText = thanksTexts[index]
        const errorText = errorTexts[index]
        const suggestionForm = suggestionForms[index]
        const suggButton = suggButtons[index]

        if (form.checkValidity()) {
          submitButtonText.style.display = 'none'
          loadingAnimation.style.display = 'inline-block'

          buttonSend.disabled = true
          buttonSend.style.pointerEvents = 'none'
          suggButtons.forEach(suggButton => {
            suggButton.style.pointerEvents = 'none'
          })

          let formData = {
            name: form.querySelector('#add-name').value,
            title: form.querySelector('#add-title').value,
            link: form.querySelector('#add-link').value,
            category: form.querySelector('#category').value
          }

          $.ajax({
            url: 'https://formsubmit.co/ajax/social@tareqitos.com',
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
              submitButtonText.style.display = 'block'
              loadingAnimation.style.display = 'none'

              suggButton.style.pointerEvents = 'unset'

              suggestionIsValid(suggestionForm, thanksText, form)
              console.log(response)
            },
            error: function (error) {
              suggestionForm.classList.toggle('suggestion-form')
              suggestionForm.style.display = 'none'

              submitButtonText.style.display = 'block'
              loadingAnimation.style.display = 'none'

              suggButton.style.pointerEvents = 'none'

              errorText.style.display = 'block'
              setTimeout(() => {
                errorText.style.opacity = 1
              })

              console.error(error)
            }
          })
        } else {
          suggButton.style.pointerEvents = 'none'
        }
      })
    })
  } catch (erreur) {
    console.error(erreur)
  }
}

fetchData()
