$(window).bind("load", function() {
    //$('ul.questions li i').boxfit();

    // Update clock:
    var updateClock = function() {
        var date = new Date();
        $('.clock .h').text(pad(date.getHours(), 2));
        $('.clock .m').text(pad(date.getMinutes(), 2));
    };
    updateClock();
    setInterval(updateClock, 1000);

    var phoneIn = new TimelineMax({paused: true});
    phoneIn.fromTo($('.questions'), 0.5, {marginLeft: -150}, {marginLeft: 0, delay: 0.5}, 'init');
    phoneIn.fromTo($('#phone'), 0.5, {marginLeft: 150}, {marginLeft: 0, delay: 0.5}, 'init');

    phoneIn.play(0);

    var red = new TimelineMax({paused: true});
    red.addCallback(function(){
        TweenMax.to($('.red-area'), 0, {rotation: '225deg', skewY: '0deg', skewX: '90deg'});
    });
    red.fromTo($('.icon'), 0.2, {opacity:0}, {opacity:1, ease:Linear.easeNone}, 'red-in');
    red.to($('header .text'), 0.1, {opacity:1}, 'red-in');
    red.fromTo($('.red-area'), 0.5, {rotation: '225deg', skewY: '0deg', skewX: '90deg'}, {skewY: '0deg', skewX: '0deg', delay:0.1, ease:Linear.easeNone}, 'red-in');
    red.addCallback(function() {
        white.play(0);
    });

    var redOut = new TimelineMax({paused: true});
    redOut.to($('.icon'), 0.2, {opacity:0, delay: 0.4, ease:Linear.easeNone}, 'red-out');
    redOut.fromTo($('.red-area'), 0.5, {rotation: '225deg', skewY: '0deg'}, {skewY: '90deg', delay: 0.1, ease: Linear.easeNone}, 'red-out');
    redOut.to($('header .text'), 0.1, {opacity:0, delay:0.2}, 'red-out');

    var phoneOut = new TimelineMax({paused: true});
    phoneOut
        .to($('#phone'), 0.5, {marginLeft: -150}, 'phone-out')
        .to($('.questions'), 0.5, {marginLeft: 150}, 'phone-out');

    var white = new TimelineMax({paused: true});
    white
        .addCallback(function(){
            $('#white1, #white2, #white3').show();
        })
        .fromTo($('#white1, #white2, #white3'), 0.1666, {opacity:1, rotation:'225deg'}, {rotation:'+=90deg', ease:Linear.easeNone})
        .to($('#white1, #white2'), 0.1666, {rotation:'+=90deg', ease:Linear.easeNone})
        .to($('#white1'), 0.1666, {rotation:'+=90deg', ease:Linear.easeNone})
        .addCallback(function(){
            if(round === 1) {
                $('#icons').hide();
            } else {
                $('#icons').show();
            }
        })
        .to($('.white-area'), 0.5, {rotation:'585deg', delay: 0.2}, 'white-out')
        .addCallback(function() {
            if(round === 1) {
                phoneIn.play(0);
                redOut.play(0);
                round = round !== 1 ? 1 : 0;
                doAnimation();
            } else {
                $('.glow').sprite(13, 24);
                setTimeout(function() {
                    round = round !== 1 ? 1 : 0;
                    doAnimation();
                }, 5000);
            }
            $('#white1, #white2, #white3').hide();
        });

    var round = 0;

    // Animation Timelines:
    function doAnimation() {
        if(round === 0) {
            // Switch text
            $('.questions li.first').css({opacity:1}).siblings().css({opacity:0});
            setTimeout(function() {
                $('.questions li.first').animate({opacity:0}).siblings().animate({opacity:1});
            }, 4500);

            $('.messages').scrollInterval(3000, false, true, function() {
                phoneOut.play(0);
                red.play(0);
            });
        } else {
            // Message slides:
            white.play(0);
        }
    }
    doAnimation();

    // Show banner when everything is loaded:
    $('body').css({opacity:1});
});
