$(function () {

  configureSlider('.product-slider');

  configurePartnersSlider('.partners-slider');

  configureFilter('.products-of-week')

  configureFilter('.new-design')

  subscribeToEvents();

  menu();

  function configureSlider(selector) {
    $(selector).slick({
      autoplay: true,
      arrows: false,
      fade: true,
      dots: true,
    });
  }

  window.addEventListener("resize", () => slickSetOption('.partners-slider'), true);

  function configurePartnersSlider(selector) {
    $(selector).slick({
      infinite: true,
      autoplay: true,
      arrows: false,
      dots: false,
      slidesToShow: 5,
      slidesToScroll: 1,
    });
  }

  function slickSetOption(selector) {
    let slidesToShow = window.innerWidth < 576
      ? 1
      : window.innerWidth < 768
        ? 2
        : 5

    $(selector).slick('slickSetOption', 'slidesToShow', slidesToShow);
  }

  function configureFilter(selector) {
    const config = {
      load: {
        filter: 'all'
      },
      controls: {
        scope: 'local'
      }
    };

    mixitup(selector, config)
  }

  function subscribeToEvents() {
    const productsOfWeek = document.getElementsByClassName('products-gallery__item')

    Array.prototype.forEach.call(productsOfWeek, element => {
      const className = 'products-gallery__item--active'

      element.addEventListener('mouseover', () => element.classList.add(className));
      element.addEventListener('mouseout', () => element.classList.remove(className));
    });
  }

  function menu() {
    const menuBtn = document.querySelector('.menu__btn')

    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        toggleBodyLock()
        toggleMenuBtnActive()
        toggleMenuListActive()
      })
    }
  }

  function toggleBodyLock() {
    document.body.classList.toggle('body--lock')
  }

  function toggleMenuBtnActive() {
    const menuBtn = document.querySelector('.menu__btn')
    if (menuBtn) {
      menuBtn.classList.toggle('menu__btn--active')
    }
  }

  function toggleMenuListActive() {
    const menuList = document.querySelector('.menu__list')
    if (menuList) {
      menuList.classList.toggle('menu__list--active')
    }
  }

  const menuLinks = document.querySelectorAll('.menu__link')
  if (menuLinks && menuLinks.length > 1) {
    menuLinks.forEach(menuLink => {
      menuLink.addEventListener('click', function () {
        toggleBodyLock()
        toggleMenuBtnActive()
        toggleMenuListActive()
      })
    })
  }
})

