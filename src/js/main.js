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
      element.addEventListener('mouseout',  () => element.classList.remove(className));
    });
  }

  function menu() {
    const menuBtn  = document.querySelector('.menu__btn')
    const menuList = document.querySelector('.menu__list')

    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        document.body.classList.toggle('body--lock')
        menuBtn.classList.toggle('menu__btn--active')
        menuList.classList.toggle('menu__list--active')
      })
    }
  }
})

