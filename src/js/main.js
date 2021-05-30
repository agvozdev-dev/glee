$(function () {
  
  configurePlugins();

  subscribeToEvents();

  function configurePlugins() {
    $('.product-slider').slick({
      autoplay: true,
      arrows: false,
      fade: true,
      dots: true,
    });
  
    mixitup('.products-gallery');
  }

  function subscribeToEvents() {
    const productsOfWeek = document.getElementsByClassName('products-gallery__item')

    Array.prototype.forEach.call(productsOfWeek, element => {
      const className = 'products-gallery__item--active'

      element.addEventListener('mouseover', () => element.classList.add(className));
      element.addEventListener('mouseout',  () => element.classList.remove(className));
    });
  }
})