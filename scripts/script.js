async function fetchData() {
  try {
    const reponse = await fetch('scripts/list-links.json')
    const links = await reponse.json()
    console.log(links)

    ////////////////////////////////////////////////// PODCAST FLOATING WINDOWS //////////////////////////////////////////////////

    const body = document.getElementById('body');
    const podcastButton = document.querySelector('.podcast-button')


    podcastButton.addEventListener('click', () => {

      const audioPlayer = document.querySelector('.audio-player')

      if (audioPlayer !== null) {
        audioPlayer.remove()
        console.log('audio player has been removed');
      }

      if (audioPlayer === null) {
        const podcasts = ['https://open.spotify.com/embed/episode/2Br6kFlZDCCizEV9cpy81B?utm_source=generator?play=1',
          'https://open.spotify.com/embed/episode/4qjerzMw8jfD30VOG0tjpK?utm_source=generator', 'https://open.spotify.com/embed/episode/3UcFXYPz3Gs0RGb0p1bU6R?utm_source=generator', 'https://open.spotify.com/embed/episode/0AINRiHlZf72aKp87lhDTr?utm_source=generator'
        ]

        const audioPlayerDiv = document.createElement('div')
        const iframeElement = document.createElement('iframe')

        audioPlayerDiv.setAttribute('class', 'audio-player')

        setAttributes(iframeElement, {
          'style': "border-radius:12px",
          'src': "https://open.spotify.com/embed/episode/2Br6kFlZDCCizEV9cpy81B?utm_source=generator?play=1",
          'width': "100%", 'height': "152", 'frameBorder': "0", 'allowfullscreen': "",
          'allow': 'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture', 'loading': "lazy"
        })

        testElement.innerText = 'This is a text'

        body.appendChild(audioPlayerDiv)
        audioPlayerDiv.appendChild(iframeElement)
        iframeElement.appendChild(testElement)
      }
    })

    function setAttributes(element, attr) {
      for (let key in attr) {
        element.setAttribute(key, attr[key])
      }
    }

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

    function suggestionIsValid(suggestionForm, thanksTexts, form) {
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

        console.log(suggButton);

        if (!form.checkValidity()) {
          suggButton.style.pointerEvents = 'unset';
          return;
        }


        form.classList.add('sending');
        /*
          Use the "sending" class that will be added to the form
          to setup the CSS files accordingly instead of having
          the style changes below as JS scripts.
        */

        submitButtonText.style.display = 'none'
        loadingAnimation.style.display = 'inline-block'

        buttonSend.disabled = true
        buttonSend.style.pointerEvents = 'none'

        suggButton.style.pointerEvents = 'none'

        let formData = Object.fromEntries(new FormData(form))
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

            form.classList.remove('sending');
          },

          error: function (error) {
            suggestionForm.classList.toggle('suggestion-form')
            suggestionForm.style.display = 'none'

            submitButtonText.style.display = 'block'
            loadingAnimation.style.display = 'none'

            suggButton.style.pointerEvents = 'unset'

            errorText.style.display = 'block'

            form.classList.remove('sending');

            setTimeout(() => {
              errorText.style.opacity = 1
            })

            console.error(error)
          }
        })
      })
    })
  } catch (erreur) {
    console.error(erreur)
  }
}

fetchData()
