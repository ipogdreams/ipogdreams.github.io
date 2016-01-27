
// Main Class
function App() {

    // Overlay Preloader
    $.html5Loader({
        filesToLoad: 'files.json',
        onBeforeLoad: function () {
            log("$.html5Loader ==> onBeforeLoad", 'h');

            $('</div><div class="stroke"></div><div class="countdown">0%</div>').appendTo("#preload");
            $("#preload > .stroke").delay(800).queue(function () {
                $(this).addClass("on").dequeue();
            });
            $("#preload > img").delay(1200).queue(function () {
                $(this).addClass("on").dequeue();
            });
            $("#preload > .countdown").delay(1400).queue(function () {
                $(this).addClass("on").dequeue();
            });
        },
        onComplete: function () {
            log("$.html5Loader ==> onComplete", 'h');

            /* Temprowary.. need to remove this */
            // $("#preload").remove();
            // $("#wrapper").css('opacity', '1')
            //        .css('filter', 'alpha(opacity=1)');
        },
        onUpdate: function (b) {
            // log("$.html5Loader ==> onUpdate: " + b, 'h');

            setTimeout(function () {
                $endTransition = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";

                $("#preload > .countdown").html(b + " % loaded..");

                100 === b && ($endTransition, setTimeout(function () {
                    $(window).scrollTop(0);
                }, 200),
                        $("#preload > img").removeClass("on").on($endTransition, function () {
                    $("#preload > .countdown").removeClass("on");
                    $("#preload > .stroke").addClass("on_full").on($endTransition, function () {
                        $(this).addClass("on_hide");
                        $(".upper, .lower").addClass("on").on($endTransition, function () {
                            console.log("Loading animation complete..");

                            $("#preload").remove();
                            $("#wrapper").css('opacity', '1')
                                    .css('filter', 'alpha(opacity=1)');

                            startLandingScene();
                        });
                    });
                }));
            }, 2E3);
        }
    });


    var _self = this;

    // Views Objects
    this.views = {
        clouds: $("#clouds"),
        city: $("#city")
    };

    // Setting View Height
    setViewHeight();


    // Init function - this.init = .. removed
    this.init = function () {
        log("Init", 'h');

        this.startViewAnimation();
    };

    /*
     this.cloudAnimate = function () {
     
     //offset for clouds and cities
     var offset = 0;
     
     //move clouds and cities
     window.setInterval(function () {
     _self.views.clouds.attr("style", "background-position: " + offset + "px 0px");
     offset -= 1;
     }, 30);
     
     };
     */

    this.startViewAnimation = function () {
        log('View Animation Started..', 'h');

        var sc01_fadeScene = $(".about .anim-block"),
                sc02_devices = $(".about .computer"),
                sc04_zoomCircle = $(".portfolio .anim-block"),
                sc05_animBlock = $(".contact .anim-block");

        var controller = new ScrollMagic.Controller();

        // Bringing black overlay to show animation 
        var scene00 = new ScrollMagic.Scene({
            triggerElement: ".home > .fadeScene",
            triggerHook: 0,
            duration: $(window).height()
        })
                .addTo(controller)
                .setTween(
                        TweenMax.to(".home > .fadeScene", 1, {
                            opacity: .8
                        }));

        var scene01 = new ScrollMagic.Scene({
            triggerElement: '#scene01-trigger',
            triggerHook: 0,
            duration: 5
        })
                .addTo(controller)
                .on("start", function (evt) {
                    if (evt.scrollDirection === "FORWARD") {
                        animate_illustration("illustration_sg", "start");
                    }
                }).on("end", function (evt) {
            if (evt.scrollDirection === "REVERSE") {
                animate_illustration("illustration_in", "end");
                animate_illustration("illustration_sg", "end");
            } else if (evt.scrollDirection === "FORWARD") {
                animate_illustration("illustration_in", "start");
            }
        });

        /* 2. About Scene */
        var t2 = new TimelineMax();
        t2.to(sc02_devices, .5, {scale: 1, bottom: 0, opacity: 1, delay: 0.5, ease: "Back.easeOut"});

        var scene02 = new ScrollMagic.Scene({
            triggerElement: '#scene02-trigger',
            offset: 50
        })
                // .setClassToggle("#high2", "active")
                .addTo(controller)
                .setTween(t2.play());

        /* 3. Skills Scene */
        var scene03 = new ScrollMagic.Scene({
            triggerElement: '#scene03-trigger',
            offset: 300,
            reverse: true
        })
                // .setClassToggle("#high3", "active")
                .addTo(controller)
                .setTween(TweenMax.staggerFrom(".skill-icons .icon", 1.5, {scale: 0.3, opacity: 0, delay: 0.5, ease: "Elastic.easeOut"}, 0.15));

        /* 4. Portfolio Scene */
        var t4 = new TimelineMax();
        // t4.to(section, 0.5, {backgroundColor: 'rgb(155, 89, 182)', ease: Power2.easeInOut});
        t4.to(sc04_zoomCircle, 0.5, {height: 400, ease: Power2.easeInOut})
                .to(sc04_zoomCircle, 0.5, {autoAlpha: 1, ease: Power2.easeInOut});

        var scene04 = new ScrollMagic.Scene({
            triggerElement: '#scene04-trigger',
            offset: 50
        })
                // .setClassToggle("#high4", "active")
                .addTo(controller)
                .setTween(t4.play());


        /* 5. Contact Us Scene */
        var scene05 = new ScrollMagic.Scene({
            triggerElement: '#scene05-trigger',
            offset: 50
        })
                .addTo(controller)
                .setTween(TweenMax.to(sc05_animBlock, .5, {x: "100", ease: Back.easeOut}));


        var scene06 = new ScrollMagic.Scene({
            triggerElement: ".footer > .fadeScene",
            triggerHook: "onEnter",
            duration: 5
        })
                .addTo(controller)
                .on("start", function (evt) {
                    if (evt.scrollDirection === "FORWARD") {
                        animate_illustration("illustration_sg", "start");
                    }
                }).on("end", function (evt) {
            if (evt.scrollDirection === "REVERSE") {
                animate_illustration("illustration_in", "end");
                animate_illustration("illustration_sg", "end");
            } else if (evt.scrollDirection === "FORWARD") {
                animate_illustration("illustration_sg", "start");
            }
        });

        // controller.addScene([scene01, scene02, scene03, scene04, scene05, scene06]);

        // Add debug indicators fixed on right side
        /*
        scene00.addIndicators({name: "Fade", colorEnd: "#cc0000"});
        scene01.addIndicators({name: "Home", colorEnd: "#cc0000"});
        scene02.addIndicators({name: "About", colorEnd: "#cc0000"});
        scene03.addIndicators({name: "Skills", colorEnd: "#cc0000"});
        scene04.addIndicators({name: "Portfolio", colorEnd: "#cc0000"});
        scene05.addIndicators({name: "Contact", colorEnd: "#cc0000"});
        scene06.addIndicators({name: "Footer", colorEnd: "#cc0000"});
        */
       
        $('.carousel').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: false,
            variableWidth: false,
            autoplay: false,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });

        /* Portfolio Carousel */
        var $nav_list = $('.tab-holder'),
                $nav_tab = $nav_list.children('.tab'),
                $slickElem = $('.slider');

        $('.slider').slick({
            autoplay: false,
            pauseOnHover: false,
            dots: false,
            arrows: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1 // ,
                    // cssEase: 'linear'
        });

        // On before slide change
        $slickElem.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            var index = currentSlide;
            $nav_tab.removeClass('active');
            $nav_tab.eq(index).addClass('active');
        });

        //clicking on a nav_tab gives it the active class, slides slider to the corresponding section
        $nav_tab.click(function () {
            $nav_tab.removeClass('active');
            $(this).addClass('active');
            var index = $(this).index();
            $('.slider').slick('slickGoTo', parseInt(index));
        });

    };
}

$(document).ready(function () {

    //create and init app class
    log("Document Ready", 'h');

    window.app = new App();
    window.app.init();

});

// Initialize Plugins & Other Stuffs
$(window).resize(function () {
    log("Window Resize", 'h');

    setViewHeight();
    detectDevicesandScreens();
});