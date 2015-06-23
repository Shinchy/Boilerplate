// ES6 Import Features

(function($){

    var _usingMobile = false;
    var _usingTablet = false;
    var _usingIPhone = false;
    var _usingTouch  = false;


    // Universal choices
    $(window).load( initComHomepage );

    // Init This Page/
    function initComHomepage(e)
    {
        // prevent the page jumping    
        if (screen.width < 640 || document.documentElement.clientWidth < 640) { _usingMobile = true; _usingTouch = true; }
        if (navigator.userAgent.match(/iPad/i) !== null) { _usingTablet = true; _usingTouch = true; }
        if (navigator.userAgent.indexOf('iPhone') || navigator.userAgent.indexOf('iPod')) { _usingIPhone = true; _usingTouch = true; }

        if( !_usingMobile ) {

            // Desktop Only
            $('li.map-dot').TooltipAS({ mobile: _usingMobile, eventCall: 'opendropdown' });
            
        } else {

            // If using a mobile platform ... 
            $('a[href^=#DROPDOWN]').click(function () {
                $('.dropdown').click(function(){
                    var container = $(this).closest('section'), menu = container.find( 'nav.section-nav' );
                    if( $(this).hasClass('open') ) {
                        $(this).removeClass('open'); menu.slideUp( 500 );
                    } else {
                        $(this).addClass('open'); menu.slideDown( 500 );        
                    }
                });
                return false;
            });
            $('a[href^=#REFRESH]').click(function(e){
                window.location.reload();
            });

        }

        //
        //  PAGE CONTENT FOR JS PLUGINS
        //
        
        

        // Use this function to scroll to a section of the website
        $('.scrollto').click( scrollToSection );

        // Prevent the Default Actions of # Links
        $('#creative a[href^=#]').click(function(e) { e.preventDefault(); });
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


// End of closure
})(jQuery);