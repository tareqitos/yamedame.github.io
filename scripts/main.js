// check if user is using a mobile browser
function isMobileDevice () {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

if (isMobileDevice()) {
  console.log("L'utilisateur utilise un navigateur mobile.");
} else {
  console.log("L'utilisateur n'utilise pas un navigateur mobile.");
}

////////////////////////////////////////////////// BACKGROUND //////////////////////////////////////////////////


const characters = ["人", "一", "日", "大", "年", "出", "本", "中", "子", "見", "国", "言", "上", "分", "生", "手", "自", "行", "者", "二", "間", "事", "思", "時", "気", "会", "十", "家", "女", "三", "前", "的", "方", "入", "小", "地", "合", "後", "目", "長", "場", "代", "私", "下", "立", "部", "学", "物", "月", "田", "何", "来", "彼", "話", "体", "動", "社", "知", "理", "山", "内", "同", "心", "発", "高", "実", "作", "当", "新", "世", "今", "書", "度", "明", "五", "戦", "力", "名", "金", "性", "対", "意", "用", "男", "主", "通", "関", "文", "屋", "感", "郎", "業", "定", "政", "持", "道", "外", "取", "所", "現"];
const container = document.querySelector(".background");
const numCharacters = 30; // Adjust this number as needed

for (let i = 0; i < numCharacters; i++) {
    const charElement = document.createElement("div");
    charElement.classList.add("character");
    charElement.textContent = characters[Math.floor(Math.random() * characters.length)];

    // Random positions
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    // Random delays
    const delay = Math.random() * 30;

    // Random displacements
    const translateX = (Math.random() - 0.5) * 40; // Random value between -20 and 20
    const translateY = (Math.random() - 0.5) * 40;
    const translateXEnd = (Math.random() - 0.5) * 80; // Random value between -40 and 40
    const translateYEnd = (Math.random() - 0.5) * 80;

    // Random scales
    const scaleMid = 1 + Math.random() * 1; // Random value between 1 and 2
    const scaleEnd = 1 + Math.random() * 1; // Random value between 1 and 2

    charElement.style.top = `${top}%`;
    charElement.style.left = `${left}%`;
    charElement.style.animationDelay = `${delay}s`;
    charElement.style.setProperty('--translate-x', `${translateX}px`);
    charElement.style.setProperty('--translate-y', `${translateY}px`);
    charElement.style.setProperty('--translate-x-end', `${translateXEnd}px`);
    charElement.style.setProperty('--translate-y-end', `${translateYEnd}px`);
    charElement.style.setProperty('--scale-mid', scaleMid);
    charElement.style.setProperty('--scale-end', scaleEnd);

    container.appendChild(charElement);
}


////////////////////////////////////////////////// SHOW CHANGELOG //////////////////////////////////////////////////

const lastUpdateText = document.getElementById('changelog');
const changelogWin = document.querySelector('.changelog-popup');
let isChangelogOpen = false;
showChangelogListener();

function showChangelogListener () {
  if (lastUpdateText == null) return;

  if (!isMobileDevice()) {
    lastUpdateText.addEventListener('mouseenter', showChangelog);
    lastUpdateText.addEventListener('mouseleave', hideChangelog);

    return;
  }

  lastUpdateText.addEventListener('click', () => {
    lastUpdateText.classList.toggle('changelog--active');

    let content = 'changelog';

    if (lastUpdateText.classList.contains('changelog--active')) {
      changelogWin.style.bottom = 265 + 'px';
      changelogWin.style.width = 90 + '%';

      content = 'close';
    }

    lastUpdateText.innerText = 'changelog';
    hideChangelog();
  });
}

function showChangelog () {
  changelogWin.style.display = 'block';
  setTimeout(() => {
    changelogWin.style.opacity = 1;
  }, 10);
  isChangelogOpen = true;
}

function hideChangelog () {
  changelogWin.style.opacity = 0;
  setTimeout(() => {
    changelogWin.style.display = 'none';
  }, 300);
  isChangelogOpen = false;
}

////////////////////////////////////////////////// PREVENT ANCHOR LINKS BEING ADDED TO THE URL //////////////////////////////////////////////////

document.querySelectorAll("a[href*='#']").forEach(function (current) {
  // Original JavaScript code by Chirp Internet: www.chirpinternet.eu
  // Please acknowledge use of this code by including this header.

  if (current.origin + current.pathname != self.location.href) return;

  const anchorPoint = document.querySelector(current.hash);
  if (!anchorPoint) return;

  current.addEventListener('click', function (e) {
      e.preventDefault();
      anchorPoint.scrollIntoView({ behavior: 'smooth' });
    }, false);
});

////////////////////////////////////////////////// NAVIGATION BAR //////////////////////////////////////////////////
toggleSidebar();

function toggleSidebar () {
  const button = document.getElementById('open-btn');
  const mainArea = document.getElementById('main');
  const sidebar = document.getElementById('sidebar');
  const anchor = document.querySelectorAll('.anchorage');

  if (
    button === null ||
    mainArea === null ||
    anchor === null ||
    sidebar === null
  ) {
    // The "if" will always be false, because "sidebar" is always !== from "null" (querySelectorAll() gives a NodeList[], so it never === to null)
    // Not sur what this does, so leaving it out as it is for now
    return
  }

  if (isMobileDevice()) {
    sidebar.style.display = 'none';
    sidebar.style.top = 100 + 'px';

    for (var i = 0; i < anchor.length; i++) {
      anchor[i].style.bottom = 0;
    }
  } else {
    sidebar.style.display = 'none';
    sidebar.style.top = -400 + 'px';
  }

  button.addEventListener('click', () => {
    button.classList.toggle('open-btn--active');

    if (button.classList.contains('open-btn--active')) {
      openNav()
    } else {
      closeNav()
    }
  })

  mainArea.addEventListener('click', () => {
    if (!button.classList.contains('open-btn--active')) return;

    button.classList.toggle('open-btn--active');
    closeNav();
  });

  sidebar.addEventListener('click', () => {
    mainArea.click(); // just click back to something else that has the same behaviour, so you don't have to repeat your code multiple times
  });
}

function openNav () {
  const sidebar = document.getElementById('sidebar');
  if (sidebar === null) return;

  sidebar.style.display = null;

  setTimeout(function () {
    sidebar.style.opacity = 1;
    sidebar.style.overflowY = 'visible';

    if (isMobileDevice()) {
      sidebar.style.top = -460 + 'px';
    } else {
      sidebar.style.top = 90 + 'px';
    }
  }, 10);
}

function closeNav () {
  const sidebar = document.getElementById('sidebar');
  if (sidebar === null) return;

  sidebar.style.opacity = 0;

  if (isMobileDevice()) {
    sidebar.style.top = 100 + 'px';
  } else {
    sidebar.style.top = -400 + 'px';
  }

  setTimeout(function () {
    sidebar.style.overflowY = 'hidden';
    sidebar.style.display = 'none';
  }, 50);
}

/*

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

*/

////////////////////////////////////////////////// COLLAPSE CATEGORIES //////////////////////////////////////////////////

const collapseButton = document.querySelectorAll('.collapse-button');
const collapseMedia = document.querySelector('.collapse-media .collapse-content');
const collapsePodcast = document.querySelector('.collapse-podcast .collapse-content');
const collapseSocial = document.querySelector('.collapse-social .collapse-content');
const collapseVideo = document.querySelector('.collapse-video .collapse-content');

collapseCategories();
collapseAll();
expandAll();

function expandAll () {
  const collapseContent = document.querySelectorAll('.collapse-content');
  const buttonExpandAll = document.querySelector('.roll-all');

  if (buttonExpandAll == null) return;

  buttonExpandAll.addEventListener('click', () => {
    for (i = 0; i < collapseContent.length; i++) {
      collapse(collapseContent[i]);
      collapseButton[i].classList.replace('open', 'close');
      collapseButton[i].classList.add('collapse-button--active');
    }
  });
}

function collapseAll () {
  const collapseContent = document.querySelectorAll('.collapse-content');
  const buttonCollapseAll = document.querySelector('.collapse-all');

  if (buttonCollapseAll == null) return;

  buttonCollapseAll.addEventListener('click', () => {
    for (i = 0; i < collapseContent.length; i++) {
      roll(collapseContent[i]);
      collapseButton[i].classList.replace('close', 'open');
      collapseButton[i].classList.remove('collapse-button--active');
    }
  });
}

function collapseCategories () {
  collapseButton.forEach(button => {
    const collapseContent = button.nextElementSibling;

    button.addEventListener('click', () => {
      button.classList.toggle('collapse-button--active');

      if (button.classList.contains('collapse-button--active')) {
        collapse(collapseContent);
      } else {
        roll(collapseContent);
      }
    })
  })
}
function roll (collapseContent) {
  collapseContent.style.maxHeight = collapseContent.scrollHeight + collapseMedia.scrollHeight + collapseVideo.scrollHeight + collapsePodcast.scrollHeight + collapseSocial.scrollHeight + 'px';

  collapseContent.style.opacity = 1;
  collapseContent.style.marginTop = 10 + 'px';
  collapseContent.style.marginBottom = 30 + 'px';
  collapseContent.style.overflowY = 'visible';



  if (collapseContent.style.maxHeight !== 0) {
    window.addEventListener('resize', () => {
        collapseContent.style.maxHeight = collapseContent.scrollHeight + collapseMedia.scrollHeight + collapseVideo.scrollHeight + collapsePodcast.scrollHeight + collapseSocial.scrollHeight + 'px';
    });
  }
}

function collapse (collapseContent) {
  collapseContent.style.maxHeight = 0;
  collapseContent.style.opacity = 0;
  collapseContent.style.marginTop = 0;
  collapseContent.style.marginBottom = 10 + 'px';
  collapseContent.style.overflowY = 'hidden';

  window.addEventListener('resize', () => {
    collapseContent.style.maxHeight = 0;
  });
}


////////////////////////////////////////////////// BACK TO TOP BUTTON //////////////////////////////////////////////////

const backToTopButton = document.getElementById('back-to-top');
const footer = document.getElementById('footer');

window.onscroll = function () {
  scrollFunction();
  closeNav();

  isNavOpen = false;

  if (isMobileDevice) {
    if (lastUpdateText !== null) {
      if (lastUpdateText.classList.contains('changelog--active')) {
        lastUpdateText.classList.toggle('changelog--active');
        lastUpdateText.innerText = 'changelog';
        hideChangelog();
      }
    }
  }

  const button = document.getElementById('open-btn');
  if (button !== null) {
    if (button.classList.contains('open-btn--active')) {
      button.classList.toggle('open-btn--active');
    }
  }
}

backToTopButton.addEventListener('click', backToTop);

backToTopButton.addEventListener('scoll', event => {
  console.log(backToTopButton.scrollTop);
})

function isFooterVisible () {
  const rect = footer.getBoundingClientRect();
  return rect.top <= window.innerHeight + 50;
}

function scrollFunction () {
  if (
    document.body.scrollTop > 150 ||
    (document.documentElement.scrollTop > 150 && !isFooterVisible())
  ) {
    backToTopButton.style.opacity = 1;
    backToTopButton.style.zIndex = 99;
  } else {
    backToTopButton.style.opacity = 0;
    backToTopButton.style.zIndex = -99;
  }
}

function backToTop () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

////////////////////////////////////////////////// DAY/NIGHT MODE //////////////////////////////////////////////////

darkTheme();

function darkTheme () {
  // removed variable "html" because it was not aiming at html tag but body, which is confusing (comment can be removed)
  const themeSwitch = document.getElementById('theme-logo');
  const tareqitoscomIcon = document.getElementById('tareqitos-favico');
  const buttonCollapseAll = document.querySelector('.img-coll');
  const buttonExpandAll = document.querySelector('.img-roll');

  // Fonction pour définir le thème et enregistrer la préférence de l'utilisateur
  function setTheme (theme) {
    if (theme === 'dark') {
      /*
        The word (class, value, etc) is not consistent here and there.
        Below, we use class name "night-mode", but the value in storage is just called "dark".
        By making it similar ("darkmode" for example), we can simplify some parts of the code later on.
        (Also needs to be confirmed that said classes/values are not used elsewhere, e.g. in CSS.
      */
      document.body.classList.toggle('night-mode');
      themeSwitch.innerHTML = '明';

      if (tareqitoscomIcon) {
        tareqitoscomIcon.style.filter = 'none';
      }

      if (buttonCollapseAll || buttonExpandAll) {
        buttonCollapseAll.style.filter = 'brightness(100)';
        buttonExpandAll.style.filter = 'brightness(100)';
      }

      localStorage.setItem('themePreference', 'dark');
    } else {
      document.body.classList.remove('night-mode');
      themeSwitch.innerHTML = '暗';

      if (tareqitoscomIcon) {
        tareqitoscomIcon.style.filter = 'invert(1)';
      }

      if (buttonCollapseAll || buttonExpandAll) {
        buttonCollapseAll.style.filter = 'none';
        buttonExpandAll.style.filter = 'none';
      }

      localStorage.setItem('themePreference', 'light');
    }
  }

  // Vérifie s'il y a une préférence de thème enregistrée dans localStorage
  const userThemePreference = localStorage.getItem('themePreference');
  const autoDarkTheme = window.matchMedia('(prefers-color-scheme: dark)'); // moved line down here since it's only user in this space

  if (userThemePreference) {
    setTheme(userThemePreference); // Si une préférence utilisateur est enregistrée, utilisez-la
  } else if (autoDarkTheme.matches) {
    setTheme('dark'); // Sinon, utilisez le thème automatique
  } else {
    setTheme('light');
  }

  themeSwitch.addEventListener('click', () => {
    document.body.classList.contains('night-mode');

    if (document.body.classList.contains('night-mode')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });
}
