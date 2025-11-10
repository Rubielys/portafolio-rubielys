(function ($) {
  "use strict";

  // ========== PreLoader ==========
  $(window).on("load", function () {
    $(".spinner").fadeOut();
    $(".preloader").delay(350).fadeOut("slow");
  });

  // ========== Skill Bars ==========
  $(".skills").waypoint(
    function () {
      $(".skills .percentage").each(function (i, el) {
        var width = $(el).text();
        $(el).parent().next().animate({ width: width }, 3000);
      });
    },
    { offset: "100%", triggerOnce: true }
  );

  // ========== Is In Viewport ==========
  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop + 500 < viewportBottom;
  };

  // ========== Nav Links ==========
  $(".nav-link").click(function (e) {
    var hash = $(this).attr("href");
    $("html, body")
      .stop()
      .animate({ scrollTop: $(hash).offset().top - 80 });
    window.location.hash = hash.slice(1);
    e.preventDefault();
  });

  // ========== Mobile Menu ==========
  $(".menu-toggler, .nav-list").click(function (e) {
    $(".nav-list").toggleClass("active");
  });

  // ========== Scroll Top ==========
  $(".scroll-top").click(function (e) {
    $("html, body").animate({ scrollTop: 0 }, 0);
  });

  // ========== Window Scroll ==========
  function onScroll() {
    $("header").toggleClass("sticky", $(window).scrollTop() >= 100);
    $(".scroll-top").toggleClass("active", $(window).scrollTop() >= 100);
    $("section").each(function () {
      var sect = $(this);
      if (sect.isInViewport()) {
        $(".nav-link").removeClass("active");
        $(".nav-link[href='#" + $(sect).attr("id") + "']").addClass("active");
      }
    });
  }
  $(window).on("scroll", onScroll);
  onScroll();

  // ========== Isotope ==========
  // Initialize
  var $container = $(".filter-items");
  $container.isotope({
    itemSelector: ".filter-item",
    transitionDuration: "0.8s",
  });

  // Filter
  $(".filter-value").on("click", function (e) {
    $(".filter-value.active").removeClass("active");
    $(this).addClass("active");
    let selector = $(this).attr("data-filter");
    if (selector != "*") selector = "[data-filter='" + selector + "']";
    $container.isotope({ filter: selector });
    return false;
  });

  // ========== Owl Carousel ==========
  $(".testimonial-swiper").owlCarousel({
    loop: true,
    items: 1,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 8000,
    responsive: {
      600: { items: 1 },
      1000: { items: 2 },
    },
  });

  // ========== Counter Up ==========
  $(".count").countUp({
    delay: 10,
    time: 2000,
  });

  // ========== Typed Js ==========
  new Typed("#type", {
    strings: $("#type").attr("data").split("|"),
    showCursor: true,
    smartBackspace: false,
    typeSpeed: 30,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
  });

  // ========== Wow Js ==========
  new WOW().init();

  // ========== Magnific Popup ==========
  $(".portfolio-card a").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });
})(jQuery);

// Ajax mail js
$(function () {
  // Get the form.
  var form = $("#contact-form");

  // Get the messages div.
  var formMessages = $(".form-message");

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: $(form).attr("action"),
      data: formData,
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("error");
        $(formMessages).addClass("success");

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $("#contact-form input,#contact-form textarea").val("");
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass("success");
        $(formMessages).addClass("error");

        // Set the message text.
        if (data.responseText !== "") {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text("Oops! An error occured and your message could not be sent.");
        }
      });
  });
});

//-------------------------FUNCION PARA CONTACTARLO POR WHATSAPPP------------------------

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        sendToWhatsApp();
    });
});

/**
 * Función que va a capturar los datos del formulario y construye la URL wa.me.
 */
function sendToWhatsApp() {
    const phoneNumber = '50765673540'; 

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Construir el mensaje prellenado
    const whatsappMessage = `¡Hello!, I have sent you a message through your portfolio.\n\n` +
                            `*Nombre:* ${name}\n` +
                            `*Teléfono:* ${phone}\n` +
                            `*Email:* ${email}\n\n` +
                            `*Mensaje:*\n${message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    //Construir la URL completa de wa.me
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // se redirige al usuario a la URL de WhatsApp
    window.open(whatsappURL, '_blank'); 

    document.getElementById('contact-form').reset();
}