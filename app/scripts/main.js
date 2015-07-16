/* 
 *
 * / _\ |__ (_)_ __   ___| |__  _   _ 
 * \ \| '_ \| | '_ \ / __| '_ \| | | |
 * _\ \ | | | | | | | (__| | | | |_| |
 * \__/_| |_|_|_| |_|\___|_| |_|\__, |
 *                              |___/ 
 *
 * This is the source code for my Boilerplate sites, its run on pure JS
 * that all begin in here. It's like the old days of AS3, of a Java application
 * in that everything should be a resource available here that allows you to build
 * a massive application in a more Software like way.
 *
 * The Main JS File for the Site, run everything from this point, it's like the Master JS file if you will.
*/

// Use strict so we get better error checking
'use strict';

// Import your modules here
// This is run using browserfy and babelify in the gulp task.
// eg.
// import myClass from './controller/myclass.js';
import fw from './controller/framework.js';



// Self starting function
(function () {

    // A quick ol' check of the querySelector class do you don't need to call document
    // every single time, thanks to some fella at Google for this.
    var querySelector = document.querySelector.bind(document);
    var querySelectorAll = document.querySelectorAll.bind(document);
    // some other references to ensure we're not calling document over and over.
    var body = document.body;
    // Prevents the creation of loadsa' arrays a little performance helper!
    var forEach = Array.prototype.forEach; 

    // When the page inits, we will call this function like a constructor
    // this just keeps things neater.
    function init() {

        // Use this function to scroll to a section of the website, with that elements
        // top position being at the top, it's so basic it's in the main.js file
        forEach.call(querySelectorAll('.scrollto'), function($dom) {
            $dom.addEventListener('click', scrollToSection );   
        });

        // Prevent the Default Actions of # Links
        // This stops the annoying janky behavour of the page shooting to the top
        forEach.call(querySelectorAll('a[href^="#"]'), function($dom) {
            $dom.addEventListener('click', function(e) { e.preventDefault(); });
        });

        // Call to remove the preloader now that we're all loaded up, or at least loaded enough
        removePreLoader();
    }


    // Scroll to a specific area of the site function
    function scrollToSection(e)
    {
        // Firstly assign all variables to the scope of this function ONLY, super encaptulated
        this.gotoID = (e.type === 'click') ? this.getAttribute('href') : e;
        this.posGoto = querySelector( this.gotoID ).offsetTop; // Where we are going to
        this.currentPos = (typeof window.pageYOffset !== "undefined") ? window.pageYOffset : document.documentElement.scrollTop;
        this.pos = this.currentPos; // Our current pos, this changes slightly
        this.diff = (this.posGoto - this.currentPos); // The amount we need to travel (scroll)
        this.intTime = 30; // Divide this by the Interval Time
        this.scrollTime = parseInt( 1500 / this.intTime ); // Time for the Scroll to take place, in millisecs
        this.scrollInt = null; // Our call interval for the scroll function
        this.excessCount = 0; // Number of times the function is called
        this.previousPos = this.pos; // The previous position stored
        this.t = 0; // Timer used by the Ease Formula

        // Scrolling animation function, this uses some nice Maths to give
        // us a good Ease, it's called on an interval to ensure we don't call too quickly
        this.scrollInterval = function(){
            // Add in the previous point for reference
            this.previousPos = this.pos;
            // Work out the position we need to be by running a lovely Ease Sin forumla
            // (^_^) <|'very nice'|
            this.pos =
                -this.diff/2 * (Math.cos(Math.PI*this.t/this.scrollTime) - 1) + this.currentPos;
            // Assign this value to the scroll position
            window.scrollTo( 0, this.pos );
            // Increase the time
            this.t++;
            // Check we've not timed out or stalled by created an excess count that counts up 
            // when there is no movement
            if( this.pos == this.previousPos ) this.excessCount++;
            // If either of these do happen, then lets clear this interval
            if( this.excessCount >= 10 || this.t >= this.scrollTime ) this.clearScrollInterval();
        };  
        // This is just a function to clear out the interval we created for that scroll above, just there...
        this.clearScrollInterval = function(){
            clearInterval( this.scrollInt );
        };
        
        // Set that ...ish up!
        this.scrollInterval();
        // AND then carry on with a set interval, don't forget to bind this, to ...this
        // that stops the scope from going into the setIntervals own scope.
        this.scrollInt = setInterval( this.scrollInterval.bind(this), this.intTime);
    }

    // Removes the Preloader from the Page after we have loaded
    // Which will happen from the init function
    function removePreLoader()
    {
        // Grab the reloader, I've given it an ID
        var loader = document.getElementById('loader');
        // Set the height to 0 for a nice Transition effect
        loader.style.height = '0';
        // Then grab the transitionDuraction from the objects CSS properties
        // IF there isn't one, just assign 2 secs as it doesn't have a height transition
        var duration = parseInt(String(loader.style.transitionDuration).replace('s',''));
        if(duration) setTimeout(removePreLoaderElement, duration);
            setTimeout(removePreLoaderElement, 2000);
        // And a function so that we can use a nice time out
        var removePreLoaderElement = function(){
            loader.parentNode.removeChild( loader );
        };
        // ... And it's gone
    }

    // Start this bad boy up!!!!!
    init();


// END
})();