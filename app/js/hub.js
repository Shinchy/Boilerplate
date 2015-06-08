(function($){

    var _usingMobile = false;
    var _usingTablet = false;
    var _usingIPhone = false;
    var _usingTouch  = false;

    // Universal choices
    var _player, _defaultVideo, _currentSlide, _videoOverlay, _previousPath = 'a-a', _pathPos = 'a';

    var _imageFolderURL = 'http://commercial.asos.com/revlonvideo/';
    var _videoFolderURL = 'http://commercial.asos.com/revlonvideo/video/v5/';

    var _finalImageArr  = [
                            'http://images.asos.com/htmlpages/2015_05_Revlon/slides/end/casino.jpg',
                            'http://images.asos.com/htmlpages/2015_05_Revlon/slides/end/fullhouse.jpg',
                            'http://images.asos.com/htmlpages/2015_05_Revlon/slides/end/cardshark.jpg',
                            'http://images.asos.com/htmlpages/2015_05_Revlon/slides/end/roulette.jpg',
                            'http://images.asos.com/htmlpages/2015_05_Revlon/slides/end/pocketaces.jpg',
                            'http://images.asos.com/htmlpages/2015_05_Revlon/slides/end/jokers.jpg'
                          ];



    $(window).load( initComHomepage );

    // Init This Page
    function initComHomepage(e)
    {
        // prevent the page jumping    
        if (screen.width < 640 || document.documentElement.clientWidth < 640) { _usingMobile = true; _usingTouch = true; }
        if (navigator.userAgent.match(/iPad/i) != null) { _usingTablet = true; _usingTouch = true; }
        if (navigator.userAgent.indexOf('iPhone') || navigator.userAgent.indexOf('iPod')) { _usingIPhone = true; _usingTouch = true }


        if( !_usingMobile ) {

            // Desktop Only
            
        } else {


            var _videoFolderURL = 'http://commercial.asos.com/revlonvideo/video/mobile/';

            // If using a mobile phone
            $('#dropdown_link').click(function () {
                $('.dropdown').slideToggle();
                return false;
            });
            $('.restart').click(function(e){
                window.location.reload();
            });


            $('section.product-area article.look-1 aside.left').before( $('section.product-area article.look-1 aside.right') );
            $('section.product-area article.look-2 aside.left').before( $('section.product-area article.look-2 aside.right') );

            $('div.overlay-content div.mobile-chooser a').click( showNextVideoMobile );

        }

        // Setup Page
        _player         = document.getElementById('video-intro');
        _defaultVideo   = String( _player.currentSrc ).split( _videoFolderURL )[1];
        _videoOverlay   = $('section.interactive-video div.overlay-content');
        if( !_pathPos || _pathPos == 'a' ) _currentSlide = $('section.interactive-video div.overlay-content div.active');
            else if ( _pathPos == 'b' ) _currentSlide = $('section.interactive-video div.overlay-content div.panel-2');
            else if ( _pathPos == 'c' ) _currentSlide = $('section.interactive-video div.overlay-content div.panel-3');


        // Set volume to 0
        _player.volume  = 0;

        if( _player.readyState < 3 ) _player.addEventListener( 'canplay', playVideo );
            else playVideo(null);        

        _player.addEventListener( 'ended', showVideoChooser );

        // _pathPos = 'c-c';
        // _previousPath = 'b-b';
        // showVideoChooser();



        // Change the article content
        $('#creative .changecontent').click( changePageContent );

        // Restart the application
        $('#creative .restart').click( restartApp );

        // Content accross both desktop and mobile
        $('a[href^=#compform]').click( openCompetition );
        $('.close-form').click( closeCompetition );
        // Use this function to scroll to a section of the website
        $('.scrollto').click( scrollToSection );
        // Social Buttons
        $('.social-icon-facebook').click( postToFacebook );
        $('.social-icon-twitter').click( postToTwitter );
        $('.social-icon-gplus').click( postToGooglePlus );
        $('.social-icon-pinterest').click( postToPinterest );
        // Prevent the Default Actions of # Links
        $('#creative a[href^=#]').click(function(e) { e.preventDefault(); });
    }


    // The basic video API
    function playVideo($event) {
        _player.play();
    }
    function stopVideo($event) {
        _player.stop();
    }
    function changeVideo(e,$new) {
        _videoOverlay.fadeOut( 300 );
        _player.setAttribute('src', _videoFolderURL + $new );
        _player.addEventListener( 'canplay', playVideo );
        // playVideo();
    }

    function showNextVideo($e, $new, $path) {

        // this is the path we are currently on
        _pathPos = $path;
        changeVideo( null, $new );

    }
    function showNextVideoMobile($e) {

        // this is the path we are currently on
        _pathPos = $(this).data('path');
        var newVideo = $(this).data('video');

        changeVideo( null, newVideo );
    }
    function showVideoChooser($event) {

        var currentFinalSlide = 0;

        // change the current video
        if( _pathPos.substring(0,1) != 'c' ) _videoOverlay.fadeIn( 500 );
            else {
                var addFinalSlide;

                if( _pathPos == 'c-a' ) {
                    $('#creative section.product-area article.active .colorstay-step-1').show();
                    $('#creative section.product-area article.active .colorstay-step-2').hide();
                    $('#creative section.product-area article.active .colorstay-step-3').hide();
                    addFinalSlide = 0;
                }
                if( _pathPos == 'c-b') {
                    $('#creative section.product-area article.active .colorstay-step-1').hide();
                    $('#creative section.product-area article.active .colorstay-step-2').show();
                    $('#creative section.product-area article.active .colorstay-step-3').hide();
                    addFinalSlide = 1;
                }
                if( _pathPos == 'c-c' ) {
                    $('#creative section.product-area article.active .colorstay-step-1').hide();
                    $('#creative section.product-area article.active .colorstay-step-2').hide();
                    $('#creative section.product-area article.active .colorstay-step-3').show();
                    addFinalSlide = 2;
                }

                currentFinalSlide = ( ( _previousPath.substring(2,3) == 'a' ) ? 0 : 3 ) + addFinalSlide;
            }


        // Check the path position
        if( _pathPos.substring(0,1) == 'b' ) {
            _previousPath = 'a';
            _currentSlide.removeClass('active');
            _currentSlide = $('section.interactive-video div.overlay-content div.panel-2').addClass('active');            
            console.log( _currentSlide );
        }
        else if( _pathPos.substring(0,1) == 'c' ) {
            _currentSlide.removeClass('active');
            _currentSlide = $('section.interactive-video div.overlay-content div.panel-3').addClass('active');
            
            // set the background image / correctly
            document.querySelector('section.interactive-video div.overlay-content div.panel-3').style.backgroundImage = 'url(' + _finalImageArr[ currentFinalSlide ] + ')';

            $('div.social-share a').attr('data-image', _finalImageArr[ currentFinalSlide ] );


            scrollToSection( null, '#pre-title-1' );

            _videoOverlay.fadeIn( 500 );
        }
        else {
            _currentSlide.removeClass('active');
            _currentSlide = $('section.interactive-video div.overlay-content div.panel-intro').addClass('active');

            if( !_usingMobile ) {
                $('canvas#choice-1-canvas').CreateCanvasSplit({ imageArr: [
                        { url:  _imageFolderURL + '2015_05_Revlon/slides/holiday_choice_a.jpg', pos: 'left', vid: 'choice_b_day.mp4' },
                        { url:  _imageFolderURL + '2015_05_Revlon/slides/holiday_choice_b.jpg', pos: 'right', vid: 'choice_b_night.mp4' }
                    ], pathPos: 'b' });
                $('canvas#choice-1-canvas').on('canvasEvent', showNextVideo);
            } else {
                // mobile version
                $('#player video').attr('poster', _imageFolderURL + '2015_05_Revlon/slides/holiday_choice_a.jpg');
            }
        }

        // Load the correct Canvas on type B
        if( _pathPos == 'b-a' || _pathPos == 'b' ) {

            if( !_usingMobile ) {
                // DAY TIME
                $('canvas#choice-2-canvas').CreateCanvasTripleAngle({ imageArr: [
                    { url:  _imageFolderURL + '2015_05_Revlon/slides/choice_day_a_trans.png', pos: 'mid', vid: 'cardshark.mp4', deferX: -270, choice:  _imageFolderURL + '2015_05_Revlon/slides/day/choice_a/', frames: 1 },
                    { url:  _imageFolderURL + '2015_05_Revlon/slides/choice_day_b.png', pos: 'mid', vid: 'fullhouse.mp4', deferX: 465, choice:  _imageFolderURL + '2015_05_Revlon/slides/day/choice_b/', frames: 1 },
                    { url:  _imageFolderURL + '2015_05_Revlon/slides/choice_day_c.png', pos: 'right', vid: 'casino.mp4', choice:  _imageFolderURL + '2015_05_Revlon/slides/day/choice_c/', frames: 1 }
                ], pathPos: 'c' });
                $('canvas#choice-2-canvas').on('canvasEvent', showNextVideo);
            } else {                
                $('#player video').attr('poster', _imageFolderURL + '2015_05_Revlon/slides/holiday_choice_a.jpg');
                $('section.interactive-video div.mobile-chooser-night').hide();
            }

            changePageContent( null, 'look-1' );
            _previousPath = _pathPos;
        } 
        if( _pathPos == 'b-b' ) {

            if( !_usingMobile ) {
                // NIGHT TIME
                $('canvas#choice-2-canvas').CreateCanvasTripleFlat({ imageArr: [
                    { url:  _imageFolderURL + '2015_05_Revlon/slides/choice_night_b.png', pos: 'mid', vid: 'pocket_aces.mp4', deferY: 224, choice:  _imageFolderURL + '2015_05_Revlon/slides/night/choice_b/', frames: 1 },
                    { url:  _imageFolderURL + '2015_05_Revlon/slides/choice_night_a.png', pos: 'top', vid: 'roulette.mp4', choice:  _imageFolderURL + '2015_05_Revlon/slides/night/choice_a/', frames: 1 },
                    { url:  _imageFolderURL + '2015_05_Revlon/slides/choice_night_c.png', pos: 'bottom', vid: 'jokers.mp4', choice:  _imageFolderURL + '2015_05_Revlon/slides/night/choice_c/', frames: 1 }
                ], pathPos: 'c' });
                $('canvas#choice-2-canvas').on('canvasEvent', showNextVideo);
            } else {                
                $('#player video').attr('poster', _imageFolderURL + '2015_05_Revlon/slides/holiday_choice_b.jpg');
                $('section.interactive-video div.mobile-chooser-day').hide();
            }

            changePageContent( null, 'look-2' );
            _previousPath = _pathPos;
        }

        callTracking(null);
    }



    // Call the tracking link
    function callTracking( e )
    {
        var newCall = 'Null';

        switch( _pathPos ) {
            case 'a' : newCall = 'Intro'; break;
            case 'b-a' : newCall = 'GlamPoolParty'; break;
            case 'b-c' : newCall = 'CaliforniaNights'; break;
        }
        if( _previousPath == 'b-a' ) {
            if( _pathPos == 'c-a' ) newCall = 'Casino';
            if( _pathPos == 'c-b' ) newCall = 'FullHouse';
            if( _pathPos == 'c-c' ) newCall = 'Cardshark';
        }
        if( _previousPath == 'b-b' ) {
            if( _pathPos == 'c-a' ) newCall = 'PocketAces';
            if( _pathPos == 'c-b' ) newCall = 'Roulette';
            if( _pathPos == 'c-c' ) newCall = 'Jokers';
        }

        // trigger the tracking event
        $(window).trigger("analytics.ctaClick",["REVLON|WOMENS|"+newCall]);
    } 


    // Restart the App
    function restartApp( e )
    {
        _pathPos = 'a';
        changeVideo( null, _defaultVideo );   
        $(window).trigger("analytics.ctaClick",["REVLON|WOMENS|StartAgainwapalizer"]); 
    } 


    function changePageContent( e, $direction ) {
        var newArticle = ( $direction ) ? $direction : String( $(this).attr('href') ).substr( 1 );
        if( newArticle == null || newArticle == undefined ) newArticle = 'look-1';

        $('.matched-area').show();

        $('#creative section.product-area article.active').removeClass('active');
        $('#creative section.product-area .' + newArticle ).addClass('active');

        $('section.pre-title').removeClass('look-1').removeClass('look-2').addClass( newArticle );

        if( !$direction ) scrollToSection( null, '#creative section.product-area' );
    }

    // Scroll to specific area
    function scrollToSection(e, $element)
    {
        var gotoID = ($element) ? $element : $(this).attr('href');
        $('html,body').animate({scrollTop: $( gotoID ).offset().top}, 1000);
    }
    function posToSection( $element, $h)
    {
        var gotoID      = ($element) ? $element : $(this).attr('href');
        var currentH    = ($h) ? $h : $(gotoID).height();
        var newPos      = $( gotoID ).offset().top + ((currentH - $(window).height())/2);
        $('html,body').animate({scrollTop:newPos}, 1500);
    }

    // Competition Forms
    function openCompetition(e)
    {
        $('.comp-form').fadeIn(400);
    }
    function closeCompetition(e)
    {
        $('.comp-form').fadeOut(400);
    }

    // open the mobile menus
    function dropdownMobileMenu(e)
    {
        var container   = $(this).closest('section');
        var menu        = container.find( 'nav.section-nav' );

        if( $(this).hasClass('open') ) {
            $(this).removeClass('open');
            menu.slideUp( 500 );
        } else {
            $(this).addClass('open');
            menu.slideDown( 500 );        
        }
    }


// End of closure
})(jQuery);










// Plug Ins 
/* 
    ParaScroll
    An effect as you scroll down the page
*/

(function($)
{
    $.fn.ParaScroll = function(opt)
    {
        // on page scroll
        return this.each(function()
        {
            // Default variables, these are the same for every single item
            var defaults = {
                lockItem: $(this),
                startPoint: false,
                mobile: false,
                pointCall: false,
                innerContent: $(this).find('.inner'),
                menuCall: false,
                pushDown: 0,
                pushStart: 0,
                tracking: false,
                height: false
            };
            opt = $.extend(defaults, opt);

            // Inner Variables
            var _this           = $(this);
            var _offset         = _this.offset().top;
            var _windowHeight   = $(window).height();
            var _imgWidth       = parseInt( _this.data('imgwidth') );
            var _conWidth       = _this.width();
            var _height         = (opt.height) ? opt.height : _this.height();

            var active          = false;
            var postActive      = false;

            


            _this.data( 'fixlock', true );

            //
            $(window).scroll( onPageScroll );

            // on page scroll
            function onPageScroll(e)
            {
                var nVScroll    = document.documentElement.scrollTop || document.body.scrollTop; 
                if( nVScroll + _windowHeight <= _offset ) {                    
                    // the point is further down that the screen
                } else if( nVScroll + _windowHeight > _offset && nVScroll < _offset + _height ) {

                    // it's on the screen
                    var percentageAlong = ((nVScroll-(_offset+_height)) /  _windowHeight);
                    if( percentageAlong < 0 ) {                         
                        var bgPos = Math.abs(percentageAlong) * ( _imgWidth - _conWidth );
                        _this.css({ 'background-position' : (0 - bgPos) + 'px 0' });
                    }

                } else {
                    // it's already past the point and above the scroll                    
                }
            }

            // Run as a pre-test
            onPageScroll(null);
        });
    }
})(jQuery);



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
                };
                if( (( diffX / _this.width() ) * 100) > opt.movePoint ) {
                    // _isDown = false;
                    // $(window).unbind( 'touchmove' );
                    // showNextSlide(null);                     
                    _touchFollow = 'next';                  
                };
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
                };
                if( (( diffX / _this.width() ) * 100) > opt.movePoint ) {
                    _isDown = false;
                    $(window).unbind( 'mousemove' );
                    showNextSlide(null);                   
                };
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
                        .animate({ 'margin-left' : '0' }, opt.animTime)

                    _active = _this.find('.'+opt.activeClass);

                } 

                // call any additional functions
                if( opt.callFunction ) opt.callFunction( _current, _total );
            }



            // Run as a pre-test
            initGallery();
        });
    }
})(jQuery);

