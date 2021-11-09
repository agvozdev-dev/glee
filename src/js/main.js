$(function () {

  configureProductSlider();
  configurePartnersSlider();

  configureFilter('.products-of-week')
  configureFilter('.new-design')

  productsOfWeekEvents()

  closeSearchForm()

  menuBtnClickHandler()
  menuLinksClickHandler()

  openSearchForm()

  resize()

  function configureProductSlider() {
    $('.product-slider').slick({
      autoplay: true,
      arrows: false,
      fade: true,
      dots: true,
    });
  }

  function configurePartnersSlider() {
    let countSlidesToShow = getCountOfPartnersSlidesToShow()

    $('.partners-slider').slick({
      infinite: true,
      autoplay: true,
      arrows: false,
      dots: false,
      slidesToShow:  countSlidesToShow,
      slidesToScroll: 1,
    });
  }

  function resize() {
    window.addEventListener(
      "resize", () => {
        const countSlidesToShow = getCountOfPartnersSlidesToShow()
        $('.partners-slider').slick('slickSetOption', 'slidesToShow', countSlidesToShow);
      }, true);
  }

  function getCountOfPartnersSlidesToShow() {
    return window.innerWidth < 768
      ? 1
      : window.innerWidth < 1200
        ? 2
        : 5
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

  function productsOfWeekEvents() {
    const productsOfWeek = document.getElementsByClassName('products-gallery__item')
    Array.prototype.forEach.call(productsOfWeek, element => {
      const className = 'products-gallery__item--active'

      element.addEventListener('mouseover', () => element.classList.add(className));
      element.addEventListener('mouseout', () => element.classList.remove(className));
    });
  }

  function openSearchForm() {
    const searchBtn = document.querySelector('.search-btn')
    searchBtn.addEventListener('click', () => {
      toggleClassesMenuItems()
    }) 
  }

  function closeSearchForm() {
    const menuHideBtn = document.querySelector('.search-cancel-btn')
    menuHideBtn.addEventListener('click', () => {
      toggleClassesMenuItems()
    })
  }

  function toggleClassesMenuItems() {
    const menuListClassName = 'menu__list'
    const appsButtonClassName = 'user-nav__apps'
    const userNavClassName = 'user-nav'
    const searchCancelBtnClassName = 'search-cancel-btn'
    
    const searchForm = document.querySelector('.search-form')
    const menuWrapper = document.querySelector(`.${menuListClassName}`)
    const appsButton = document.querySelector(`.${appsButtonClassName}`)
    const userNavWrapper = document.querySelector(`.${userNavClassName}`)
    const searchCancelBtn = document.querySelector(`.${searchCancelBtnClassName}`)

    searchForm.classList.toggle("search-form--visible")
    menuWrapper.classList.toggle(`${menuListClassName}--hidden`)
    appsButton.classList.toggle(`${appsButtonClassName}--hidden`)
    userNavWrapper.classList.toggle(`${userNavClassName}--hidden`)
    searchCancelBtn.classList.toggle(`${searchCancelBtnClassName}--visible`)
  }

  function menuBtnClickHandler() {
    const menuBtn = document.querySelector('.menu__btn')

    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        toggleBodyLock()
        toggleMenuBtnActive()
        toggleMenuListActive()
      })
    }
  }

  function menuLinksClickHandler() {
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
})

