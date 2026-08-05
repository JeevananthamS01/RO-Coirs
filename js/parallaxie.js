(function ($) {
    "use strict";

    $.fn.parallaxie = function (options) {

        var options = $.extend({
            speed: 0.4,
            repeat: "no-repeat",
            size: "cover",
            pos_x: "center",
            offset: 0,
        }, options);

        this.each(function () {

            var $el = $(this);

            var local_options = $el.data("parallaxie");

            if (typeof local_options !== "object") {
                local_options = {};
            }

            local_options = $.extend({}, options, local_options);

            var image_url = $el.data("image");

            if (typeof image_url === "undefined") {
                image_url = $el.css("background-image");

                if (!image_url) return;
            }

            // ========================================
            // MOBILE
            // ========================================

            if (window.innerWidth <= 991) {

                $el.css({
                    "background-image": image_url,
                    "background-size": local_options.size,
                    "background-repeat": local_options.repeat,
                    "background-position": "center center",
                    "background-attachment": "scroll",
                    "will-change": "background-position"
                });

                $(window).on("scroll", function () {

                    var scrollTop = $(window).scrollTop();

                    var offset = ($el.offset().top - scrollTop) * 0.25;

                    $el.css(
                        "background-position",
                        local_options.pos_x + " " + offset + "px"
                    );

                });

                return;
            }

            // ========================================
            // DESKTOP (Original)
            // ========================================

            var pos_y =
                local_options.offset +
                ($el.offset().top - $(window).scrollTop()) *
                    (1 - local_options.speed);

            $el.css({
                "background-image": image_url,
                "background-size": local_options.size,
                "background-repeat": local_options.repeat,
                "background-attachment": "fixed",
                "background-position":
                    local_options.pos_x + " " + pos_y + "px",
            });

            $(window).on("scroll", function () {

                var pos_y =
                    local_options.offset +
                    ($el.offset().top - $(window).scrollTop()) *
                        (1 - local_options.speed);

                $el.css(
                    "background-position",
                    local_options.pos_x + " " + pos_y + "px"
                );

            });

        });

        return this;
    };

})(jQuery);