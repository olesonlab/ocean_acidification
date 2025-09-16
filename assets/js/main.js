/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

(function(){
  const grid = document.getElementById('authorsGrid');
  if(!grid) return;

  // Name → Email map (keys must match the <h6 class="name"> text exactly)
  const EMAILS = {
    "Dr. Christopher L. Sabine": "csabine@hawaii.edu",
    "Dr. Brian Powell": "powellb@hawaii.edu",
    "Dr. Kirsten L.L. Oleson": "koleson@hawaii.edu",
    "Dr. Malte Stuecker": "stuecker@hawaii.edu",
    "Lucia Hošeková": "hosekova@hawaii.edu",
    "Tobias Friedrich": "tobiasf@hawaii.edu",
    "Lansing Perng": "lyperng@hawaii.edu",
    "Mariska Weijerman": "mariska.weijerman@noaa.gov",
    "Kirsten Leong": "kirsten.leong@noaa.gov",
    "Elizabeth Fulton": "elizabeth.fulton@csiro.au",
    "Ashley Lowe Mackenzie": "alowemac@hawaii.edu",
    "Anders Dugstad": "anders.dugstad@nmbu.no",
    "Carlo Fezzi": "carlo.fezzi@unitn.it",
    "Alemarie Ceria": "alemarie@hawaii.edu"
  };

  const cards = Array.from(grid.querySelectorAll('.person-card'));
  const q = document.getElementById('authorSearch');
  const role = document.getElementById('roleFilter');
  const team = document.getElementById('teamFilter');
  const count = document.getElementById('authorCount');
  const empty = document.getElementById('ackEmpty');

  function makeEmailBtn(email, name){
    const a = document.createElement('a');
    a.className = 'email-btn';
    a.href = 'mailto:' + encodeURIComponent(email);
    a.setAttribute('aria-label', `Email ${name}`);
    // inline SVG envelope so we don't rely on any icon library
    a.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2
        2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12
        13 4 6.01V6h16ZM4 18V8.24l7.4 6.17a1 1 0 0 0 1.2 0L20
        8.24V18H4Z"></path>
      </svg>
      <span>Email</span>
    `;
    return a;
  }

  function injectEmailButtons(){
    cards.forEach(card => {
      if (card.querySelector('.email-btn')) return; // already added
      const nameEl = card.querySelector('.name');
      if (!nameEl) return;
      const name = nameEl.textContent.trim();
      const email = EMAILS[name];
      if (!email) return;

      let actions = card.querySelector('.card-actions');
      if (!actions){
        actions = document.createElement('div');
        actions.className = 'card-actions';
        card.appendChild(actions);
      }
      actions.appendChild(makeEmailBtn(email, name));
    });
  }

  function matches(card){
    const txt = (card.dataset.index || '').toLowerCase();
    const roleOK = !role.value || (card.dataset.role === role.value);
    const teamOK = !team.value || (card.dataset.teams || '').includes(team.value);
    const qOK = !q.value || txt.includes(q.value.trim().toLowerCase());
    return roleOK && teamOK && qOK;
  }

  function update(){
    let visible = 0;
    cards.forEach(c => {
      const show = matches(c);
      c.style.display = show ? '' : 'none';
      if(show) visible++;
    });
    if (count) count.textContent = visible;
    if (empty) empty.hidden = visible !== 0;
  }

  // Do it!
  injectEmailButtons();
  q.addEventListener('input', update);
  role.addEventListener('change', update);
  team.addEventListener('change', update);
  update();
})();