
//main class
function App() {



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

    this.startViewAnimation = function () {
        log('View Animation Started..', 'h');

        var sc02_zoomCircle = $(".about .anim-block"),
                sc03_zoomCircle = $(".skills .anim-block"),
                sc04_zoomCircle = $(".portfolio .anim-block"),
                sc05_animBlock = $(".contact .anim-block");

        var controller = new ScrollMagic.Controller();

        /* 3. Skills Scene */
        var t3 = new TimelineMax();
        // t3.to(section, 0.5, {backgroundColor: 'rgb(74, 163, 223)', ease: Power2.easeInOut});
        t3.to(sc03_zoomCircle, 0.5, {height: 400, ease: Power2.easeInOut})
                .to(sc03_zoomCircle, 0.5, {autoAlpha: 1, ease: Power2.easeInOut});

        var scene03 = new ScrollMagic.Scene({
            triggerElement: '#scene03-trigger',
            offset: 50
        })
                // .setClassToggle("#high3", "active")
                .setTween( t3.play() );
        
        new ScrollMagic.Scene({
            triggerElement: "#scene03-trigger",
            triggerHook: .85,
            duration: $(window).height() + 400
        }).setTween(TweenMax.to($(".raylight"), 3, {
            rotation: 180,
            ease: Linear.easeNone
        })).addTo( controller );


        /* 5. Contact Us Scene */
        var scene05 = new ScrollMagic.Scene({
            triggerElement: '#scene05-trigger',
            offset: 50
        })
                // .setClassToggle("#high6", "active")
                .setTween(
                        TweenMax.to(sc05_animBlock, .5, {
                            x: "100",
                            ease: Back.easeOut
                        })
                        );


        /* 6. Footer Scene */
        var scene06 = new ScrollMagic.Scene({
            triggerElement: '#scene06-trigger',
            offset: 0
        });

        new ScrollMagic.Scene({
            triggerElement: ".contact > .testTrigger",
            triggerHook: "onEnter",
            duration: 100
        }).addTo(controller).setTween(
                TweenMax.to(".contact > .content", 1, {
                    opacity: 1
                }));


        new ScrollMagic.Scene({
            triggerElement: ".footer > .fadeScene",
            triggerHook: "onEnter",
            duration: 5
        }).addTo(controller).on("start", function (evt) {
            if (evt.scrollDirection === "FORWARD") {
                animate_illustration("illustration_sg", "start");
            }
        }).on("end", function (evt) {
            if (evt.scrollDirection === "REVERSE") {
                animate_illustration("illustration_india", "end");
                animate_illustration("illustration_sg", "end");
            } else if (evt.scrollDirection === "FORWARD") {
                animate_illustration("illustration_sg", "start");
            }
        });

        controller.addScene([scene03, scene05, scene06]);

        // Add debug indicators fixed on right side


        scene03.addIndicators();
        scene05.addIndicators();
        scene06.addIndicators();

        // Initialize Plugins & Other Stuffs
        $(window).resize(function () {
            setViewHeight();
            detectDevicesandScreens()
        });


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


        /* Skills JS */
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