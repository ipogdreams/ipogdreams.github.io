
$(function () {
    $.html5Loader({
        filesToLoad: "libs/inc_preload.json",
        onBeforeLoad: function () {
            $('<div class="stroke"></div><div class="countdown">0 %</div>').appendTo("#preload");
            $("#preload > .stroke").delay(800).queue(function () {
                $(this).addClass("on").dequeue()
            });
            $("#preload > img").delay(1200).queue(function () {
                $(this).addClass("on").dequeue()
            });
            $("#preload > .countdown").delay(1400).queue(function () {
                $(this).addClass("on").dequeue()
            })
        },
        onUpdate: function (b) {
            setTimeout(function () {
                $("#preload > .countdown").html(b +
                        " %");
                100 == b && ($endTransition = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", setTimeout(function () {
                    $(window).scrollTop(0)
                }, 200), $("#preload > img").removeClass("on").on($endTransition, function () {
                    $("#preload > .countdown").removeClass("on");
                    $("#preload > .stroke").addClass("on2").on($endTransition, function () {
                        $(this).addClass("on3");
                        $(".upper, .lower").addClass("on").on($endTransition, function () {
                            $(".logo a img").attr("src", "./WD_IMAGES/GLOBAL/animation-logo-lempens-design.gif").addClass("on");
                            $("#preload").remove();
                            setAnimLogo()
                        })
                    })
                }))
            }, 2E3)
        }
    });
});