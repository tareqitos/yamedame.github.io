// check if user is using a mobile browser
function isMobileDevice () {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

if (isMobileDevice()) {
  console.log("L'utilisateur utilise un navigateur mobile.")
} else {
  console.log("L'utilisateur n'utilise pas un navigateur mobile.")
}

const lastUpdateText = document.getElementById('changelog')
const changelogWin = document.querySelector('.changelog-popup')
let isChangelogOpen = false
showChangelogListener()

// SHOW CHANGELOG //
function showChangelogListener () {
  if (lastUpdateText == null) {
    return
  }

  if (!isMobileDevice()) {
    lastUpdateText.addEventListener('mouseenter', showChangelog)
    lastUpdateText.addEventListener('mouseleave', hideChangelog)
  }

  if (isMobileDevice()) {
    lastUpdateText.addEventListener('click', () => {
      lastUpdateText.classList.toggle('changelog--active')
      if (lastUpdateText.classList.contains('changelog--active')) {
        changelogWin.style.bottom = 220 + 'px'
        changelogWin.style.width = 90 + '%'
        lastUpdateText.innerText = 'close'
        showChangelog()
      } else {
        lastUpdateText.innerText = 'changelog'
        hideChangelog()
      }
    })
  }
}

function showChangelog () {
  changelogWin.style.display = 'block'
  setTimeout(() => {
    changelogWin.style.opacity = 1
  }, 10)
  isChangelogOpen = true
}

function hideChangelog () {
  changelogWin.style.opacity = 0
  setTimeout(() => {
    changelogWin.style.display = 'none'
  }, 300)
  isChangelogOpen = false
}

// Prevent anchors links being added to the URL //
document.querySelectorAll("a[href*='#']").forEach(function (current) {
  // Original JavaScript code by Chirp Internet: www.chirpinternet.eu
  // Please acknowledge use of this code by including this header.

  if (current.origin + current.pathname != self.location.href) {
    return
  }

  ;(function (anchorPoint) {
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

// SIDEBAR //
toggleSidebar()

function toggleSidebar () {
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

function openNav () {
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

function closeNav () {
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
    console.log('I am the third log after 5 seconds')
  }, 50)
}

navPositionBottom()
function navPositionBottom () {
  const nav = document.getElementById('nav-sticky')
  const footer = document.getElementById('footer')
  const main = document.getElementById('main')

  if (nav == null) {
    return
  }

  if (isMobileDevice()) {
    if (nav.parentNode) {
      nav.parentNode.removeChild(nav)
    }
    // Insérez-le avant le footer
    footer.parentNode.insertBefore(nav, footer)
    nav.style.top = null
    nav.style.bottom = 15 + 'px'
    nav.style.marginBottom = 2 + 'em'
  } else {
    if (nav.parentNode) {
      nav.parentNode.removeChild(nav)
    }
    // Insérez-le avant le main
    main.parentNode.insertBefore(nav, main)
    nav.style.top = 15 + 'px'
    nav.style.bottom = null
  }
}

// COLLAPSE CATEGORY //

const collapseButton = document.querySelectorAll('.collapse-button')

collapseCategories()
collapseAll()
expandAll()

function expandAll () {
  const collapseContent = document.querySelectorAll('.collapse-content')
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

function collapseAll () {
  const collapseContent = document.querySelectorAll('.collapse-content')
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

function collapseCategories () {
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
function roll (collapseContent) {
  collapseContent.style.maxHeight = collapseContent.scrollHeight + 'px'
  collapseContent.style.opacity = 1
  collapseContent.style.marginTop = 40 + 'px'
  collapseContent.style.overflowY = 'visible'

  if (collapseContent.style.maxHeight !== 0) {
    window.addEventListener('resize', () => {
      collapseContent.style.maxHeight = collapseContent.scrollHeight + 'px'
    })
  }
}
function collapse (collapseContent) {
  collapseContent.style.maxHeight = 0
  collapseContent.style.opacity = 0
  collapseContent.style.marginTop = 0
  collapseContent.style.overflowY = 'hidden'

  window.addEventListener('resize', () => {
    collapseContent.style.maxHeight = 0
  })
}

// BACK TO TOP BUTTON //

const backToTopButton = document.getElementById('back-to-top')
const footer = document.getElementById('footer')

window.onscroll = function () {
  scrollFunction()
  closeNav()
  isNavOpen = false
  if (isMobileDevice) {
    if (lastUpdateText !== null) {
      if (lastUpdateText.classList.contains('changelog--active')) {
        lastUpdateText.classList.toggle('changelog--active')
        lastUpdateText.innerText = 'changelog'
        hideChangelog()
      }
    }
  }

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

function isFooterVisible () {
  const rect = footer.getBoundingClientRect()
  return rect.top <= window.innerHeight + 50
}

function scrollFunction () {
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

function backToTop () {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

// COLOR SCHEME //

darkTheme()

function darkTheme () {
  const html = document.getElementsByTagName('html')[0]
  const themeSwitch = document.getElementById('theme-logo')
  const autoDarkTheme = window.matchMedia('(prefers-color-scheme: dark)')
  const tareqitoscomIcon = document.getElementById('tareqitos-favico')
  const buttonCollapseAll = document.querySelector('.img-coll')
  const buttonExpandAll = document.querySelector('.img-roll')

  // Fonction pour définir le thème et enregistrer la préférence de l'utilisateur
  function setTheme (theme) {
    if (theme === 'dark') {
      html.classList.toggle('nightMode')
      themeSwitch.innerHTML = '明'
      if (tareqitoscomIcon != null) {
        tareqitoscomIcon.style.filter = 'none'
      }
      if (buttonCollapseAll != null || buttonExpandAll != null) {
        buttonCollapseAll.style.filter = 'brightness(100)'
        buttonExpandAll.style.filter = 'brightness(100)'
      }
      localStorage.setItem('themePreference', 'dark')
    } else {
      html.classList.remove('nightMode')
      themeSwitch.innerHTML = '暗'
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
    html.classList.contains('nightMode')
    if (html.classList.contains('nightMode')) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  })
}
