// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

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

            $el.css({backgroundPosition: 0});
            var sprite_animation = setInterval(function() {
                var pos = $el.css('background-position');
                if(pos === undefined) {
                    pos = '0';
                }
                pos = parseInt(pos.split(' ')[0], 10) - el_width;
                $el.css({backgroundPosition: pos});

                i++;
                if(i === (frames - 1)) {
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
    $.fn.scrollInterval = function(interval, repeat, reverse, callback) {
        if(repeat === undefined) {repeat = true;}
        if(reverse === undefined) {reverse = false;}

        var that = this;
        $(this).find('li').removeClass('active');
        if(!reverse) {
            $(this).find('li').first().addClass('active');
            $(this).find('ul').css({'margin-top': 0});
        } else {
            var last = $(this).find('li').last();
            last.addClass('active');
            $(this).find('ul').css({'margin-top': -(last.position().top)});
        }
        var _interval = setInterval(function(){
            that.each(function() {
                var $active = $(this).find('li.active'),
                    $next = !reverse ? $active.next() : $active.prev();

                if(!$next.length) {
                    var li = $(this).find('li');
                    $next = !reverse ? li.first() : li.last();
                    if(callback !== undefined) {
                        callback.call();
                    }
                    if(!repeat) {
                        clearInterval(_interval);
                        return;
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

(function($, undefined) {
    $.fn.boxfit = function() {
        this.each(function(i, box) {
            var width = $(box).width(),
                html = '<span style="white-space:nowrap;"></span>',
                line = $(box).wrapInner(html).children()[0],
                n = 50;
            $(box).css('font-size', n);
            while($(line).width() > width) {
                $(box).css('font-size', n--);
            }
            $(box).text($(line).text());
        });
    };
})(jQuery);
