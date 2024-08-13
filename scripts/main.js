// check if user is using a mobile browser
function isMobileDevice() {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

if (isMobileDevice()) {
  console.log("L'utilisateur utilise un navigateur mobile.")
} else {
  console.log("L'utilisateur n'utilise pas un navigateur mobile.")
}

////////////////////////////////////////////////// UMAMI ANALYTICS //////////////////////////////////////////////////

const box = document.querySelector('.description-box')
const mediaItems = document.querySelectorAll('.media img')
const mediaItemsDesc = document.querySelectorAll('.media-item-desc')

mediaItems.forEach((mediaItem, index) => {
  const desc = document.createElement('p');

  mediaItem.addEventListener('mousemove', event => {
    box.style.visibility = 'visible'
    box.style.left = event.pageX + 50 + 'px'
    box.style.top = event.pageY + -25 + 'px'

    desc.textContent = mediaItemsDesc[index].textContent;
    if (!box.contains(desc)) {
      box.appendChild(desc); // Append only if not already added
    }

  })

  mediaItem.addEventListener('mouseleave', event => {
    box.style.visibility = 'hidden'
    box.style.left = 0
    box.style.top = 0

    if (box.contains(desc)) {
      box.removeChild(desc); // Remove if added
    }

  })
})


////////////////////////////////////////////////// PREVENT ANCHOR LINKS BEING ADDED TO THE URL //////////////////////////////////////////////////

document.querySelectorAll("a[href*='#']").forEach(function (current) {
  // Original JavaScript code by Chirp Internet: www.chirpinternet.eu
  // Please acknowledge use of this code by including this header.

  if (current.origin + current.pathname != self.location.href) {
    return
  }

  ; (function (anchorPoint) {
    if (anchorPoint) {
      current.addEventListener(
        'click',
        function (e) {
          anchorPoint.scrollIntoView({ behavior: 'smooth' })
          e.preventDefault()
        },
        false
      )
    }
  })(document.querySelector(current.hash))
})

////////////////////////////////////////////////// NAVIGATION BAR //////////////////////////////////////////////////
toggleSidebar()

function toggleSidebar() {
  const button = document.getElementById('open-btn')
  const mainArea = document.getElementById('main')
  const sidebar = document.getElementById('sidebar')
  const anchor = document.querySelectorAll('.anchorage')

  if (
    button === null ||
    mainArea === null ||
    anchor === null ||
    sidebar === null
  ) {
    return
  }

  if (isMobileDevice()) {
    sidebar.style.display = 'none'
    sidebar.style.top = 100 + 'px'
    for (var i = 0; i < anchor.length; i++) {
      anchor[i].style.bottom = 0
    }
  } else {
    sidebar.style.display = 'none'
    sidebar.style.top = -400 + 'px'
  }

  button.addEventListener('click', () => {
    button.classList.toggle('open-btn--active')

    if (button.classList.contains('open-btn--active')) {
      openNav()
    } else {
      closeNav()
    }
  })

  mainArea.addEventListener('click', () => {
    if (button.classList.contains('open-btn--active')) {
      button.classList.toggle('open-btn--active')
    }
    closeNav()
  })

  sidebar.addEventListener('click', () => {
    if (button.classList.contains('open-btn--active')) {
      button.classList.toggle('open-btn--active')
    }
    closeNav()
  })
}

function openNav() {
  const sidebar = document.getElementById('sidebar')

  if (sidebar === null) {
    return
  }

  sidebar.style.display = null
  setTimeout(function () {
    sidebar.style.opacity = 1
    sidebar.style.overflowY = 'visible'

    if (isMobileDevice()) {
      sidebar.style.top = -460 + 'px'
    } else {
      sidebar.style.top = 90 + 'px'
    }
  }, 10)
}

function closeNav() {
  const sidebar = document.getElementById('sidebar')

  if (sidebar === null) {
    return
  }

  sidebar.style.opacity = 0

  if (isMobileDevice()) {
    sidebar.style.top = 100 + 'px'
  } else {
    sidebar.style.top = -400 + 'px'
  }

  setTimeout(function () {
    sidebar.style.overflowY = 'hidden'
    sidebar.style.display = 'none'
  }, 50)
}

////////////////////////////////////////////////// COLLAPSE CATEGORIES //////////////////////////////////////////////////

const collapseButton = document.querySelectorAll('.collapse-button')
const collapseContent = document.querySelectorAll('.collapse-content')

const collapseMedia = document.querySelector('.collapse-media .collapse-content')
const collapsePodcast = document.querySelector('.collapse-podcast .collapse-content')
const collapseSocial = document.querySelector('.collapse-social .collapse-content')
const collapseVideo = document.querySelector('.collapse-video .collapse-content')

collapseCategories()
collapseAll()
expandAll()

function expandAll() {
  const buttonExpandAll = document.querySelector('.roll-all')

  if (buttonExpandAll == null) {
    return
  }

  buttonExpandAll.addEventListener('click', () => {
    for (i = 0; i < collapseContent.length; i++) {
      collapse(collapseContent[i])
      collapseButton[i].classList.replace('open', 'close')
      collapseButton[i].classList.add('collapse-button--active')
    }
  })
}

function collapseAll() {
  const buttonCollapseAll = document.querySelector('.collapse-all')

  if (buttonCollapseAll == null) {
    return
  }

  buttonCollapseAll.addEventListener('click', () => {
    for (i = 0; i < collapseContent.length; i++) {
      roll(collapseContent[i])
      collapseButton[i].classList.replace('close', 'open')
      collapseButton[i].classList.remove('collapse-button--active')
    }
  })
}

function collapseCategories() {

  collapseButton.forEach(button => {
    const collapseContent = button.nextElementSibling
    button.addEventListener('click', () => {
      button.classList.toggle('collapse-button--active')
      if (button.classList.contains('collapse-button--active')) {
        collapse(collapseContent)
      } else {
        roll(collapseContent)
      }
    })
  })
}
function roll(collapseContent) {

  collapseContent.style.maxHeight = collapseContent.scrollHeight + collapseMedia.scrollHeight + collapseVideo.scrollHeight + collapsePodcast.scrollHeight + collapseSocial.scrollHeight + 'px'

  collapseContent.style.opacity = 1
  collapseContent.style.marginTop = 10 + 'px'
  collapseContent.style.marginBottom = 30 + 'px'
  collapseContent.style.overflowY = 'visible'

  collapseContent.style.userSelect = 'unset'

  if (collapseContent.style.maxHeight !== 0) {
    window.addEventListener('resize', () => {
      collapseContent.style.maxHeight = collapseContent.scrollHeight + collapseMedia.scrollHeight + collapseVideo.scrollHeight + collapsePodcast.scrollHeight + collapseSocial.scrollHeight + 'px'
    })
  }
}

function collapse(collapseContent) {
  collapseContent.style.maxHeight = 0
  collapseContent.style.opacity = 0
  collapseContent.style.marginTop = 0
  collapseContent.style.marginBottom = 10 + 'px'
  collapseContent.style.overflowY = 'hidden'

  collapseContent.style.userSelect = 'none'

  window.addEventListener('resize', () => {
    collapseContent.style.maxHeight = 0
  })

}


////////////////////////////////////////////////// BACK TO TOP BUTTON //////////////////////////////////////////////////

const backToTopButton = document.getElementById('back-to-top')
const footer = document.getElementById('footer')

window.onscroll = function () {
  scrollFunction()
  closeNav()
  isNavOpen = false

  const button = document.getElementById('open-btn')
  if (button !== null) {
    if (button.classList.contains('open-btn--active')) {
      button.classList.toggle('open-btn--active')
    }
  }
}

backToTopButton.addEventListener('click', backToTop)

backToTopButton.addEventListener('scoll', event => {
  console.log(backToTopButton.scrollTop)
})

function isFooterVisible() {
  const rect = footer.getBoundingClientRect()
  return rect.top <= window.innerHeight + 50
}

function scrollFunction() {
  if (
    document.body.scrollTop > 150 ||
    (document.documentElement.scrollTop > 150 && !isFooterVisible())
  ) {
    backToTopButton.style.opacity = 1
    backToTopButton.style.zIndex = 99
  } else {
    backToTopButton.style.opacity = 0
    backToTopButton.style.zIndex = -99
  }
}

function backToTop() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

////////////////////////////////////////////////// DAY/NIGHT MODE //////////////////////////////////////////////////

darkTheme()

function darkTheme() {
  const html = document.getElementById('body')
  const themeSwitch = document.getElementById('theme-logo')
  const autoDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')
  const tareqitoscomIcon = document.getElementById('tareqitos-favico')
  const buttonCollapseAll = document.querySelector('.img-coll')
  const buttonExpandAll = document.querySelector('.img-roll')

  // Fonction pour définir le thème et enregistrer la préférence de l'utilisateur
  function setTheme(theme) {
    if (theme === 'dark') {
      html.classList.toggle('night-mode')
      themeSwitch.innerHTML = '🔆'
      if (tareqitoscomIcon != null) {
        tareqitoscomIcon.style.filter = 'none'
      }
      if (buttonCollapseAll != null || buttonExpandAll != null) {
        buttonCollapseAll.style.filter = 'brightness(100)'
        buttonExpandAll.style.filter = 'brightness(100)'
      }
      localStorage.setItem('themePreference', 'dark')
    } else {
      html.classList.remove('night-mode')
      themeSwitch.innerHTML = '🌙'
      if (tareqitoscomIcon != null) {
        tareqitoscomIcon.style.filter = 'invert(1)'
      }
      if (buttonCollapseAll != null || buttonExpandAll != null) {
        buttonCollapseAll.style.filter = 'none'
        buttonExpandAll.style.filter = 'none'
      }
      localStorage.setItem('themePreference', 'light')
    }
  }

  // Vérifie s'il y a une préférence de thème enregistrée dans localStorage
  const userThemePreference = localStorage.getItem('themePreference')

  if (userThemePreference) {
    setTheme(userThemePreference) // Si une préférence utilisateur est enregistrée, utilisez-la
  } else if (autoDarkTheme.matches) {
    setTheme('dark') // Sinon, utilisez le thème automatique
  } else {
    setTheme('light')
  }

  themeSwitch.addEventListener('click', () => {
    html.classList.contains('night-mode')
    if (html.classList.contains('night-mode')) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  })
}
