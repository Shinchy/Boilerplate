
// Plug Ins for a dropdown Box
/* 
    ParaScroll
    An effect as you scroll down the page
*/

(function($)
{
    $.fn.DropdownMenu = function(opt)
    {
        var defaults = {
            mobile: false, // A using mobile
            tracking: false, // A method for the tracking if it's being called
            trackingDataAttr: false, // The data attribute for the tracking request
            activeClass: 'active', // The active class method

        };
        opt = $.extend(defaults, opt);

        // on page scroll
        return this.each(function(){

        	var _this 			= $(this);
        	var _innerContent 	= _this.find('div.dropdown-container');
        	var _innerTitle 	= _this.find('div.dropdown-title');

        	var _active 		= false;
            var _swapActive     = false;

        	// Class constructor
        	function constructor()
        	{
        		_innerTitle.click(callDropdown);                

        	}

        	function callDropdown(e)
        	{
        		if( _active || _this.hasClass('active') ) closeDown();
        			else openUp();
        	}

        	// Open up the panel to show the inside content
        	function openUp(e) 
        	{
        		_active = true;
        		_this.addClass( opt.activeClass );
        		_innerContent.slideDown(500, function(){
                    if (!_swapActive) setupSwapGallery(null);
                });
        	}
        	function closeDown(e) 
        	{
        		_active = false;
        		_this.removeClass( opt.activeClass );
        		_innerContent.slideUp(500);
        	}

            function setupSwapGallery(e)
            {
                _swapActive = true;
                var innerSwap = _this.find('div.whattopack-gallery');
                if( innerSwap.length > 0 ) {
                    innerSwap.height( _this.find('div.whattopack-gallery div').height() );
                    innerSwap.css('overflow:hidden;');
                    _this.find('div.whattopack-gallery > div').css({
                        'position':'absolute', left: 0, top: 0, margin: '0 0 0 100%', width: '100%', height: '100%'
                    });
                    _this.find('.pack-gallery a[href^=#LOOK]').click( swapLook );
                }
            }



            // Swap over the two images
            function swapLook(e)
            {
                var currentHref = $(this).attr('href');
                var look = String( currentHref ).split('#LOOK-')[1];
                var newLook = $(this).closest('aside').find('.'+ String(look).toLowerCase() +'s-look');
                
                if( !newLook.hasClass('active') ) {
                    $(this).parent().find('.active').removeClass('active');
                    $(this).addClass('active');
                    newLook.parent().find('.active').removeClass('active');
                    newLook.addClass('active');
                }

                console.log( '.'+ String(look).toLowerCase() +'s-look' );
            }


        	// Call the constructor
        	constructor();

        });
    };

})(jQuery);