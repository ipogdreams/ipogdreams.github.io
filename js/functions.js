function createStarField() {
    console.log('createStarField');

    var w = $("#preload").width(),
            h = $("#preload").height(),
            starsCount = 1000;

    for (i = 0; i < starsCount; i++)
    {
        var size = randomIntBetween(1, 15),
                x = Math.min(randomIntBetween(1, w), w - size - 5),
                y = Math.min(randomIntBetween(1, h), h - size - 5),
                elem = $("<div class='star'></div>");

        elem.css({"top": y, "left": x, "width": size, "height": size});
        elem.addClass("s" + randomIntBetween(1, starsCount));
        $(".stars").append(elem);
    }

}

function randomIntBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

function startLandingScene() {
    log('App Loaded.. Starting Landing Animation..');

    var sc00_clouds = $("#clouds"),
            sc01_avathar = $("#sc01_avathar"),
            sc01_logo = $("#sc01_logo"),
            sc01_name = $("#sc01_name"),
            sc01_position = $("#sc01_position"),
            sc01_hr = $("#sc01_hr"),
            sc01_desc = $("#sc01_desc"),
            sc01_mountain = $("#sc01_mountain")
            ;

    /* 1. Falling Animating */
    var fa = new TimelineMax();

    /* Clear the stage */
    fa.set([sc00_clouds, sc01_avathar, sc01_logo, sc01_name, sc01_position, sc01_hr, sc01_desc, sc01_mountain], {autoAlpha: 0});
    fa.set(sc00_clouds, {scale: .8});
    fa.set(sc01_avathar, {scale: 2});
    fa.set(sc01_logo, {yPercent: -200});
    fa.set(sc01_name, {yPercent: -200});
    fa.set(sc01_hr, {scaleX: 0});
    fa.set(sc01_mountain, {yPercent: 10});

    fa.to(sc01_avathar, 0.5, {scale: 1, autoAlpha: 1, ease: Back.easeOut, delay: 0})
            .to(sc01_logo, 0.3, {yPercent: 0, autoAlpha: 1, ease: Back.easeOut})
            .to(sc01_name, 0.3, {yPercent: 0, autoAlpha: 1, ease: Back.easeOut})
            .to(sc01_position, 0.3, {yPercent: 0, autoAlpha: 1, ease: Back.easeOut})
            .to(sc01_hr, 0.3, {scaleX: 1, autoAlpha: 1, ease: Back.easeOut})
            .to(sc01_desc, 0.3, {yPercent: 0, autoAlpha: 1, ease: Back.easeOut})
            .to(sc01_mountain, .5, {yPercent: 0, autoAlpha: 1, ease: Back.easeOut})
            .to(sc00_clouds, .5, {scale: 1, autoAlpha: 1, ease: Back.easeOut})
            .add("end");
    
    
    // Start Cloud Animation
    //offset for clouds and cities
    var offset = 0;
    
    //move clouds and cities
    
    setTimeout(function(){ 
        window.setInterval(function () {
           $("#clouds").attr("style", "background-position: " + offset + "px 0px");
            offset -= 1;
        }, 30);
    }, 3500);
    
}

function sloganRorator() {

    var $slogans = $(".quotes p").find("strong");

    //set via JS so they're visible if JS disabled
    $slogans.parent().css({position: "absolute", top: "0px", left: "0px"});

    //settings
    var transitionTime = 0.4;
    var slogansDelayTime = 2;

    //internal
    var totalSlogans = $slogans.length;

    var oldSlogan = 0;
    var currentSlogan = -1;

    //initialize	
    switchSlogan();

    function switchSlogan() {

        oldSlogan = currentSlogan;

        if (currentSlogan < totalSlogans - 1) {
            currentSlogan++
        } else {
            currentSlogan = 0;
        }

        TweenLite.to($slogans.eq(oldSlogan), transitionTime, {top: -20, alpha: 0, rotationX: 90});
        TweenLite.fromTo($slogans.eq(currentSlogan), transitionTime, {top: 20, alpha: 0, rotationX: -90}, {top: 0, alpha: 1, rotationX: 0});

        TweenLite.delayedCall(slogansDelayTime, switchSlogan);
    }
}

function detectDevicesandScreens() {
    $ifLargeScreen = function () {
        return 1600 < $(window).width() ? !0 : !1;
    };
}
;

function setViewHeight() {
    var vh = $(window).height();
    console.log('Screen Height: ' + vh);
    $("section .content").css('min-height', vh + 'px');
};


function animate_illustration(id, state) {
    $("#" + id).find("div");
    TweenMax.killTweensOf($("#" + id));

    switch (state) {
        case "start":
            console.log('animate_illustration -> START state ');

            /* Illustration fall faat to top animation */
            setTimeout(function () {
                $("#" + id).find('div:not(".cloud,.country-name")').each(function (a) {
                    TweenMax.to($(this), .5, {
                        delay: .15 * a,
                        rotationX: 0,
                        opacity: 1,
                        ease: "Back.easeOut",
                        startAt: {
                            visibility: "visible"
                        }
                    })
                })
            }, 100);

            /* Clouds Zoom-in Animation */
            setTimeout(function () {
                $("#" + id).find("div.cloud").each(function (a) {
                    TweenMax.fromTo($(this), .5, {
                        scale: 3,
                        opacity: 0,
                        rotationX: 0,
                        visibility: "visible"
                    }, {
                        delay: .15 * a,
                        scale: 1,
                        opacity: 1,
                        ease: "Back.easeOut"
                    })
                })
            }, 400);

            /* Country name animation  */
            setTimeout(function () {
                TweenMax.to($("#" + id).find("div.country-name"), .5, {
                    opacity: 1,
                    left: $("#" + id).find("div.country-name").data("posx") + "%",
                    ease: "Back.easeOut"
                })
            }, 1E3);

            setTimeout(function () {
                TweenMax.to($("#" + id).find("div.country-name.cc"), .5, {
                    opacity: 1,
                    left: $("#" + id).find("div.country-name.cc").data("posx") + "%",
                    ease: "Back.easeOut"
                })
            }, 1E3);


            break;

        case "end":
            console.log('animate_illustration -> END state ');
            setTimeout(function () {
                $("#" + id).find('div:not(".cloud,.country-name")').each(function (a) {
                    TweenMax.fromTo($(this), .5, {
                        rotationX: 0,
                        startAt: {
                            visibility: "visible"
                        }
                    }, {
                        delay: .15 * a,
                        rotationX: -89,
                        ease: "Back.easeIn",
                        opacity: 0,
                        onCompleteParams: [$(this)],
                        onComplete: function (a) {
                            a.css({
                                visibility: "hidden",
                                opacity: 1
                            })
                        }
                    })
                })
            }, 400),
                    $("#" + id).find("div.cloud").each(function (a) {
                TweenMax.fromTo($(this), .5, {
                    scale: 1,
                    opacity: 1,
                    startAt: {
                        visibility: "visible"
                    }
                }, {
                    delay: .15 * a,
                    scale: 0,
                    ease: "Back.easeIn",
                    opacity: 0,
                    onCompleteParams: [$(this)],
                    onComplete: function (a) {
                        $(this).css({
                            visibility: "hidden",
                            opacity: 1,
                            scale: 3
                        })
                    }
                })
            }), setTimeout(function () {
                $("#" + id).find("div.country-name").each(function (a) {
                    TweenMax.to($(this), .5, {
                        delay: .15 * a,
                        opacity: 0,
                        left: "0%",
                        ease: "Back.easeOut"
                    })
                })
            }, 1E3), setTimeout(function () {
                $("#" + id).find("div.country-name.cc").each(function (a) {
                    TweenMax.to($(this), .5, {
                        delay: .15 * a,
                        opacity: 0,
                        left: "0%",
                        ease: "Back.easeOut"
                    })
                })
            }, 1E3)
    }
}
