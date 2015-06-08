

  /*
  *   Social Sharing - JS File
  */
  var _socialMessage  = "Summer style starts here",
      _socialCaption  = "ASOS x Revlon",
      _socialImage    = "http://commercial.asos.com/revlonvideo/2015_05_Revlon/social.jpg",
      _socialLink     = "http://www.asos.com/discover/microsite/revlon",
      _socialName     = "Revlon | ASOS";


  // Facebook App
  FB.init(
  {
    appId: 466810713409023,
    status: true,
    cookie: true
  });



  function postToFacebook( $ShareImage )
  {
    // Check the passed variable
    var useImage = _socialImage;
    if (typeof $ShareImage != 'undefined') useImage = $ShareImage;
    if ( $(this).attr('data-image') ) useImage = $(this).attr('data-image');
    
    // calling the API ...
    var facebookObj = {
      method: 'feed',
      redirect_uri: 'http://www.asos.com/discover/microsite/revlon/',
      link: 'http://www.asos.com/discover/microsite/revlon/',
      picture: _socialImage,
      name: _socialName,
      caption: 'Revlon | ASOS',
      description: _socialMessage
    };
    function callback(response)
    {
      // No callback
    }
    FB.ui(facebookObj, callback);
    // no default
    return false;
  }




  // Twitter Sharing
  function postToTwitter( $ShareImage )
  {  
    newPopup('https://twitter.com/share' , _socialLink , _socialMessage );
    // no default
    return false;
  }

  // Google Plus Sharing
  function postToGooglePlus( $ShareImage )
  { 
    var useImage = _socialImage; 
    if ( $(this).attr('data-image') ) useImage = $(this).attr('data-image');
    var sharerGp = 'https://plus.google.com/share?url='; 
    window.open(sharerGp + _socialLink, 'sharerGp', 'width=840,height=464'); 
    // no default
    return false;
  }

  // Google Plus Sharing
  function postToPinterest( e )
  {
    // Check the passed variable
    var useImage = _socialImage;
    if (typeof $ShareImage != 'undefined') useImage = $ShareImage;
    if ( $(this).attr('data-image') ) useImage = $(this).attr('data-image');

    
    var pinterestURL = _socialLink;
    var pinterestDesc = _socialMessage;
    var pinterestImage = useImage;
    pinterestImage = encodeURIComponent(pinterestImage);
    pinterestDesc = encodeURIComponent(pinterestDesc);

    console.log( useImage );

    var pinterestStandard = "http://pinterest.com/pin/create/button/?url=" + pinterestURL + "&media=" + pinterestImage + "&description=" + pinterestDesc;

    popupWindow = window.open( pinterestStandard, 'popUpWindow', 'height=600,width=650,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes');

    // no default
    return false;
  }


  // Google Plus Sharing
  function postToTumblr( $ShareImage )
  {
    // Check the passed variable
    var useImage = _socialImage;
    if (typeof $ShareImage != 'undefined') useImage = $ShareImage;
    if ( $(this).attr('data-image') ) useImage = $(this).attr('data-image');
    
    // POST TO TUMBLR

    // no default
    return false;
  }



  // Universal
  function newPopup(url, locationUrl, text)
  {
    var urlComplete = url + "?url=" + encodeURIComponent(locationUrl) + "&text=" + encodeURIComponent(text);
    popupWindow = window.open(
    urlComplete, 'popUpWindow', 'height=400,width=450,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes');
  }



