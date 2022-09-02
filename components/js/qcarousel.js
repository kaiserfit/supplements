$('#slidex').slick({
    // normal options...
  infinite: true,
    slidesToShow: 2,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
  // the magic
  responsive: [{

      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        infinite: true
      }

    }, {

      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        dots: true
      }

    }, {

      breakpoint: 300,
      settings: "unslick" // destroys slick

    }]
  });