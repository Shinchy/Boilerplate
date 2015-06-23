/* 
    Gallery - CSS Version, creates a gallery that has everything within
*/
(function($)
{
    $.fn.GalleryAS = function(opt)
    {
        var defaults = {
            mobile: false,
            tracking: false,
            activeClass: 'active',
            extraClass: '',
            slideClass: 'li',
            movePoint: 30,
            animTime: 300,
            callFunction: false
        };
        opt = $.extend(defaults, opt);

        // on page scroll
        return this.each(function()
        {
            var _this           = $(this);
            var _nextBtn        = $(this).find('.next');
            var _prevBtn        = $(this).find('.prev');
            var _slides         = $(this).find( opt.slideClass );
            var _active         = $(this).find('.active');

            var _current        = 0;
            var _total          = _slides.length;

            var _currentX, _currentY, _isDown = false, _touchFollow = 'none';


            // on page scroll
            function initGallery()
            {
                // css methods
                // _slides.css({ 'transition' : 'margin .5s' });
                _slides.draggable = false;
                _this.draggable = false;
                _this.find('img').draggable = false;
                _this.find('img').on('dragstart', function(e){ e.preventDefault(); } );
                
                _prevBtn.click( showPrevSlide );
                _nextBtn.click( showNextSlide );

                // Touch based controls
                _this.bind("touchstart", function(e){
                    _isDown = true;
                    _currentX = e.originalEvent.changedTouches[0].pageX;
                    $(window).bind("touchmove", onTouchSwipe);
                });
                _this.bind("touchend",function(e){
                    _isDown = false;
                    $(window).unbind("touchmove");
                    
                    if(_touchFollow == 'next') showNextSlide(null);
                    else if(_touchFollow == 'prev') showPrevSlide(null);
                    else _active.animate({ 'margin-left' : 0 }, 100);
                });

                // normal draggin
                _this.mousedown(function(event) {
                    _isDown = true;
                    _currentX = event.pageX;
                    /* Act on the event */
                    $(window).mousemove( onSwipe );
                });
                _this.mouseup(function(event) {
                    if( _isDown ) {
                        _isDown = false;
                        $(window).unbind( 'mousemove' );
                        _active.animate({ 'margin-left' : 0 }, 100);
                    }
                });

                // call any additional functions
                if( opt.callFunction ) opt.callFunction( _current, _total );
            }

            function onTouchSwipe(e)
            {
                var thisX = e.originalEvent.changedTouches[0].pageX - _this.offset().left;
                var diffX = _currentX - e.originalEvent.changedTouches[0].pageX;

                _active.css({ 'margin-left' : 0 - diffX });

                _touchFollow = 'null';

                if( (( diffX / _this.width() ) * 100) < 0 - opt.movePoint ) {
                    // _isDown = false;
                    // $(window).unbind( 'touchmove' );
                    // showPrevSlide(null);
                    _touchFollow = 'prev';
                }
                if( (( diffX / _this.width() ) * 100) > opt.movePoint ) {
                    // _isDown = false;
                    // $(window).unbind( 'touchmove' );
                    // showNextSlide(null);                     
                    _touchFollow = 'next';                  
                }
            }

            function onSwipe(e)
            {
                var thisX = e.pageX - _this.offset().left;
                var diffX = _currentX - e.pageX;

                _active.css({ 'margin-left' : 0 - diffX });

                if( (( diffX / _this.width() ) * 100) < 0 - opt.movePoint ) {
                    _isDown = false;
                    $(window).unbind( 'mousemove' );
                    showPrevSlide(null);
                }
                if( (( diffX / _this.width() ) * 100) > opt.movePoint ) {
                    _isDown = false;
                    $(window).unbind( 'mousemove' );
                    showNextSlide(null);                   
                }
            }

            function showNextSlide(e)
            {
                _current++;
                if(_current >= _total) _current = 0;
                changeCurrentSlide( _current, 'next' );       
            }            
            function showPrevSlide(e)
            {
                _current--;
                if(_current < 0) _current = _total-1;
                changeCurrentSlide( _current, 'prev' );
            }


            // Change the current slide
            function changeCurrentSlide( $changeTo, $type )
            {
                if( $type == 'next' ) {

                    // old element
                    _this.find('.'+opt.activeClass)
                        .removeClass(opt.activeClass)
                        .stop(false,false)
                        .animate({ 'margin-left' : '-100%' }, opt.animTime);
                    // new element
                    _slides.eq( $changeTo )
                        .addClass( opt.activeClass )
                        .css({ 'margin-left' : '100%' })
                        .stop(false,false)
                        .animate({ 'margin-left' : '0' }, opt.animTime);

                    _active = _this.find('.'+opt.activeClass);

                } else {

                    // old element
                    _this.find('.'+opt.activeClass)
                        .removeClass(opt.activeClass)
                        .stop(false,false)
                        .animate({ 'margin-left' : '100%' }, opt.animTime);
                    // new element
                    _slides.eq( $changeTo )
                        .addClass( opt.activeClass )
                        .css({ 'margin-left' : '-100%' })
                        .stop(false,false)
                        .animate({ 'margin-left' : '0' }, opt.animTime);

                    _active = _this.find('.'+opt.activeClass);

                } 

                // call any additional functions
                if( opt.callFunction ) opt.callFunction( _current, _total );
            }



            // Run as a pre-test
            initGallery();
        });
    };
})(jQuery);