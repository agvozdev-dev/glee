$(function () {
  
  configureSlider('.product-slider');

  configurePartnersSlider('.partners-slider');

  configureFilter('.products-of-week')

  configureFilter('.new-design')

  subscribeToEvents();

  disableScroll();

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

  function disableScroll() {
    const menuToggles = document.getElementsByClassName('menu__toggle')

    if(menuToggles && menuToggles.length !== 0) {
      const menuToggle = menuToggles[0]

      menuToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
          document.body.style.overflow = 'hidden'
          document.body.style.position = 'fixed'
        } else {
          document.body.style.overflow = ''
          document.body.style.position = ''
        }
      })
    }
  }

  // function disableScroll() {
  //   const menuToggles = document.getElementsByClassName('menu__toggle')

  //   if(menuToggles && menuToggles.length !== 0) {
  //     const menuToggle = menuToggles[0]

  //     menuToggle.addEventListener('change', (e) => {
  //       if (e.target.checked) {
  //         console.log(document.body.style.overflow);
  //         document.body.style.overflow = 'hidden'
  //       } else {
  //         document.body.style.overflow = ''
  //       }
  //     })
  //   }
  // }
})