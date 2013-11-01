(function($, undefined) {
    $.fn.sprite = function(frames, fps, callback) {
        var interval;

        if(!frames) {
            throw '$.sprite takes at least 1 argument: frames';
        }
        if(!fps) {
            interval = 41;
        } else {
            interval = Math.round(1000 / fps);
        }

        return this.each(function() {
            var $el = $(this);
            var i = 0;

            var el_width = $el.width();

            var sprite_animation = setInterval(function() {
                var pos = $el.css('background-position');
                if(pos === undefined) {
                    pos = '0';
                }
                pos = parseInt(pos.split(' ')[0], 10) - el_width;
                $el.css({backgroundPosition: pos});

                i++;
                if(i == (frames - 1)) {
                    window.clearInterval(sprite_animation);
                    if(callback) {
                        callback();
                    }
                }
            }, interval);
        });
    };
})(jQuery);

(function($, undefined) {
    $.fn.scrollInterval = function(interval, repeat, callback) {
        if(repeat === undefined) {repeat = true;}
        var that = this;
        $(this).find('ul').css({'margin-top': 0});
        var _interval = setInterval(function(){
            that.each(function() {
                var $active = $(this).find('li.active'),
                    $next = $active.next();

                if(!$next.length) {
                    $next = $(this).find('li').first();
                    if(!repeat) {
                        clearInterval(_interval);
                    }
                    if(callback !== undefined) {
                        callback.call();
                    }
                }
                $active.removeClass('active');
                $next.addClass('active');
                var current_pos = parseInt($(this).find('ul').css('margin-top'), 10);
                var next_pos = $next.position().top;
                $(this).find('ul').animate({'margin-top': -(next_pos)}, 500);
            });
        }, interval);

        return this;
    };
})(jQuery);

// Function for padding numbers with leading zeros:
function pad(a, b){return(1e15 + a + "").slice(-b);}

$(function() {
    // Update clock:
    var updateClock = function() {
        var date = new Date();
        $('.clock .h').text(pad(date.getHours(), 2));
        $('.clock .m').text(pad(date.getMinutes(), 2));
    };
    updateClock();
    setInterval(updateClock, 1000);

    // Animation Timelines:
    var white = new TimelineMax({paused: true});
    white.fromTo($('#white1, #white2, #white3'), 0.1666, {rotation:'225deg'}, {rotation:'+=90deg', ease:Linear.easeNone})
         .to($('#white1, #white2'), 0.1666, {rotation:'+=90deg', ease:Linear.easeNone})
         .to($('#white1'), 0.1666, {rotation:'+=90deg', ease:Linear.easeNone})
         .addCallback(function(){
            $('#phone').hide();
            $('#icons').show();
         })
         .to($('.white-area'), 0.5, {rotation:'585deg', delay: 0.2}, 'white-out')
         .addCallback(function() {
            $('.glow').sprite(13, 24);
         });

    var main = new TimelineMax({paused: true});
    main.from($('#phone'), 0.5, {marginLeft: 150, delay: 0.5});
    //main.fromTo($('.red-area'), 0.6, {rotation:'225deg'}, {rotation:'+=360deg'}, 'white-in');

    main.play();

    // Message slides:
    $('.messages').scrollInterval(3000, false, function() {
        white.play();
    });

    // Show banner when everything is loaded:
    $('body').show();
});