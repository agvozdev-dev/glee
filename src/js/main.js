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
  
    mixitup('.products__gallery');
  }

  function subscribeToEvents() {
    const productsOfWeek = document.getElementsByClassName('products__item')

    Array.prototype.forEach.call(productsOfWeek, element => {
      const className = 'products__item--active'

      element.addEventListener('mouseover', () => element.classList.add(className));
      element.addEventListener('mouseout',  () => element.classList.remove(className));
    });
  }
})