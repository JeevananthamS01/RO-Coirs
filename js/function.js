(function ($) {
  "use strict";

  var $window = $(window);
  var $body = $("body");

  /* Text Effect Animation */
  function initHeadingAnimation() {
    if ($(".text-effect").length) {
      var textheading = $(".text-effect");

      if (textheading.length === 0) return;
      gsap.registerPlugin(SplitText);
      textheading.each(function (index, el) {
        el.split = new SplitText(el, {
          type: "lines,words,chars",
          linesClass: "split-line",
        });

        if ($(el).hasClass("text-effect")) {
          gsap.set(el.split.chars, {
            opacity: 0.3,
            x: "-7",
          });
        }
        el.anim = gsap.to(el.split.chars, {
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 60%",
            markers: false,
            scrub: 1,
          },

          x: "0",
          y: "0",
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
        });
      });
    }

    if ($(".text-anime-style-1").length) {
      let staggerAmount = 0.05,
        translateXValue = 0,
        delayValue = 0.5,
        animatedTextElements = document.querySelectorAll(".text-anime-style-1");

      animatedTextElements.forEach((element) => {
        let animationSplitText = new SplitText(element, {
          type: "chars, words",
        });
        gsap.from(animationSplitText.words, {
          duration: 1,
          delay: delayValue,
          x: 20,
          autoAlpha: 0,
          stagger: staggerAmount,
          scrollTrigger: { trigger: element, start: "top 85%" },
        });
      });
    }

    if ($(".text-anime-style-2").length) {
      let staggerAmount = 0.03,
        translateXValue = 20,
        delayValue = 0.1,
        easeType = "power2.out",
        animatedTextElements = document.querySelectorAll(".text-anime-style-2");

      animatedTextElements.forEach((element) => {
        let animationSplitText = new SplitText(element, {
          type: "chars, words",
        });
        gsap.from(animationSplitText.chars, {
          duration: 1,
          delay: delayValue,
          x: translateXValue,
          autoAlpha: 0,
          stagger: staggerAmount,
          ease: easeType,
          scrollTrigger: { trigger: element, start: "top 85%" },
        });
      });
    }

    if ($(".text-anime-style-3").length) {
      let animatedTextElements = document.querySelectorAll(
        ".text-anime-style-3",
      );

      animatedTextElements.forEach((element) => {
        //Reset if needed
        if (element.animation) {
          element.animation.progress(1).kill();
          element.split.revert();
        }

        element.split = new SplitText(element, {
          type: "lines,words,chars",
          linesClass: "split-line",
        });
        gsap.set(element, { perspective: 400 });

        gsap.set(element.split.chars, {
          opacity: 0,
          x: "50",
        });

        element.animation = gsap.to(element.split.chars, {
          scrollTrigger: { trigger: element, start: "top 90%" },
          x: "0",
          y: "0",
          rotateX: "0",
          opacity: 1,
          duration: 1,
          ease: Back.easeOut,
          stagger: 0.02,
        });
      });
    }
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      initHeadingAnimation();
    });
  } else {
    window.addEventListener("load", initHeadingAnimation);
  }

  /* Parallaxie js */
  var $parallaxie = $(".parallaxie");
  if ($parallaxie.length && $window.width() > 1024) {
    if ($window.width() > 768) {
      $parallaxie.parallaxie({
        speed: 0.55,
        offset: 0,
      });
    }
  }

  /* Contact form validation */
  const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";

  let isSubmitting = false;

  $("#coirContactForm").on("submit", function (e) {
    e.preventDefault();

    if (isSubmitting) return;

    const name = $("#customerName").val().trim();
    const phone = $("#customerPhone").val().trim();
    const email = $("#customerEmail").val().trim();
    const location = $("#customerLocation").val().trim();
    const product = $("#productCategory").val();
    const message = $("#customerMessage").val().trim();

    // Name
    if (name.length < 3) {
      return showStatus(false, "Please enter your full name.");
    }

    // Phone (International)
    const phoneRegex = /^\+?[1-9]\d{7,14}$/;

    const cleanPhone = phone.replace(/[\s()-]/g, "");

    if (!phoneRegex.test(cleanPhone)) {
      return showStatus(
        false,
        "Please enter a valid phone number with country code.",
      );
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return showStatus(false, "Please enter a valid email address.");
    }

    // Product
    if (!product || product === "Select Product") {
      return showStatus(false, "Please select a product.");
    }

    isSubmitting = true;

    const btn = $("#coirContactForm button[type='submit']");

    btn.prop("disabled", true);

    btn.html(`
        <span class="spinner-border spinner-border-sm me-2"></span>
        Sending...
    `);

    $.ajax({
      url: SCRIPT_URL,

      method: "POST",

      contentType: "application/json",

      data: JSON.stringify({
        customerName: name,

        customerPhone: cleanPhone,

        customerEmail: email,

        customerLocation: location,

        productCategory: product,

        customerMessage: message,
      }),

      success: function () {
        $("#coirContactForm")[0].reset();

        showStatus(
          true,
          "Thank you! Your enquiry has been submitted successfully.",
        );
      },

      error: function () {
        showStatus(false, "Unable to submit your enquiry. Please try again.");
      },

      complete: function () {
        isSubmitting = false;

        btn.prop("disabled", false);

        btn.html("Send Enquiry");
      },
    });
  });

  function showStatus(success, message) {
    const status = $("#coirFormStatus");

    status
      .removeClass("alert-success alert-danger")
      .addClass(success ? "alert alert-success" : "alert alert-danger")
      .html(message)
      .fadeIn();

    setTimeout(function () {
      status.fadeOut();
    }, 5000);
  }

  /* Animated Wow Js */
  new WOW().init();

})(jQuery);
