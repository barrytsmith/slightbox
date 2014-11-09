var slightBox = {
    //customizable properties
    containerClass : 'slightbox-container',
    currClassName : 'slightbox-current',
    overlayID: 'slightbox',
    toNextClass: 'slightbox-to-next',
    toPrevClass: 'slightbox-to-prev',
    closeText: 'Close X', // change the content of the close button
    closeClass: 'slightbox-close',
    nextText: 'Next &#8594;', // change the content of the next button
    nextClass: 'slightbox-next',
    prevText: '&#8592; Prev', // change the content of the prev button
    prevClass: 'slightbox-prev',
    mainControlsClass: 'slightbox-main-controls',
    captionClass: 'slightbox-caption',
    captionInnerClass: 'slightbox-caption-inner',
    captionToggleClass: 'slightbox-caption-toggle',
    captionToggleText: 'Details &#8593;', // change the content of the details button
    activeCapClass: 'slightbox-active',
    overlayHideClass: 'slightbox-hidden',
    noScrollClass: 'slightbox-noscroll',
    
    // vars
    lastFocus: '',
    b: document.body,
    scrollCapture: 0,
    
    //basic class removal function for reuse
    removeAClass: function(el, clssNm){
        el.className = el.className.replace(new RegExp('(^|\\b)' + clssNm.split(' ').join('|') + '(\\b|$)', 'gi'), ' ').trim();
    },

// OPEN LIGHTBOX
    openIt : function(el, src, alt, cap, cls){
        cls = cls || "";

         if(!document.getElementById(this.overlayID)){
            var o = document.createElement('FIGURE');
            o.setAttribute('id', this.overlayID);
            o.setAttribute('tabindex', '0');
            this.b.appendChild(o);
        }
        
        var overlay = document.getElementById(this.overlayID);
        
        // capture focus for return
        if(this.lastFocus === "") this.lastFocus = document.activeElement;
        
        //remove class of current from all other items
        var curr = document.getElementsByClassName(this.currClassName);
        for(var i = 0; i < curr.length; i++){
            this.removeAClass(curr[i], this.currClassName);
        }
        // mark clicked element as current
        el.className += " " + this.currClassName;

        // build inner html
        var img = '<img class="' + cls + '" src="' + src + '" alt="' + alt + '">',
            caption = '',
            closeButt = '<button role="close" class="' + this.closeClass + '">' + this.closeText + '</button>',
            toggleButt = '<button class="' + this.captionToggleClass + '" role="toggle">' + this.captionToggleText + '</button>',
            nextButt = '<button rel="next" class="' + this.nextClass + '">' + this.nextText + '</button>',
            prevButt = '<button rel="prev" class="' + this.prevClass + '">' + this.prevText + '</button>',
            mainCtrls = '<div class="' + this.mainControlsClass + '">' + nextButt + prevButt + closeButt + '</div>',
            scrl;
        
        // optional caption from original title attribute
        if(cap !== "" && cap !== null){ caption = '<figcaption class="' + this.captionClass + '">' + toggleButt + '<div class="' + this.captionInnerClass + '">' + cap + '</div></figcaption>'; }
        overlay.innerHTML = img + caption + mainCtrls;
        
        //capture scroll and prevent background scrolling
        if(this.b.scrollTop > 0) this.scrollCapture = this.b.scrollTop;
        this.b.className += " " + this.noScrollClass;
        var left = (window.innerWidth - parseInt(getComputedStyle(this.b).getPropertyValue("width"), 10))/2;
        this.b.style.top = -this.scrollCapture + "px";
        this.b.style.left = left + "px";
        
        //show and focus
        this.removeAClass(overlay, this.overlayHideClass);
        overlay.setAttribute("tabindex", "0");
        overlay.focus();
        
        // add class to animate image in
        this.removeAClass(overlay.getElementsByTagName('IMG')[0], cls);
    }, 

// CLOSE LIGHTBOX
    closeIt : function(){
        document.getElementById(this.overlayID).className += this.overlayHideClass; 
        this.removeAClass(this.b, this.noScrollClass);
        this.b.style.top = "";
        this.b.style.left = "";
        this.b.scrollTop = this.scrollCapture;
        this.lastFocus.focus();
        this.lastFocus = "";
    },

// NEXT IMAGE
    next : function(){
        var curr = document.getElementsByClassName(this.currClassName)[0] || document.getElementsByClassName(this.containerClass)[0].getElementsByTagName('IMG')[0];
        
        if(!curr.parentNode.nextElementSibling){ return false; }
        var nextEl = curr.parentNode.nextElementSibling.getElementsByTagName('IMG')[0];

        var nextSrc = nextEl.getAttribute('src'),
            nextAlt = nextEl.getAttribute('alt'),
            nextCap = nextEl.getAttribute('title');
        var pThis = this;
        this.openIt(nextEl, nextSrc, nextAlt, nextCap, this.toNextClass);
    },

// PREVIOUS IMAGE
    prev : function(){
        var container = document.getElementsByClassName(this.containerClass)[0],
            curr = document.getElementsByClassName(this.currClassName)[0] || container.getElementsByTagName('IMG')[container.getElementsByTagName('IMG').length - 1];
            
            if(!curr.parentNode.previousElementSibling){ return false; }
            var prevEl = curr.parentNode.previousElementSibling.getElementsByTagName('IMG')[0];

        var prevSrc = prevEl.getAttribute('src'),
            prevAlt = prevEl.getAttribute('alt'),
            prevCap = prevEl.getAttribute('title');
        this.openIt(prevEl, prevSrc, prevAlt, prevCap, 'slightbox-to-prev');
    },

    // Swipe handling from http://stackoverflow.com/a/23230280
    bindTouch: function(){
        var pThis = this,
            xDown = null,                                                       
            yDown = null;
        
        document.addEventListener('touchstart', handleTouchStart, false);        
        document.addEventListener('touchmove', handleTouchMove, false);                                                      

        function handleTouchStart(evt) {                                         
            xDown = evt.touches[0].clientX;                                      
            yDown = evt.touches[0].clientY;                                      
        };                                                

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) return;
            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;
            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { /* most significant */
                if ( xDiff > 0 ) {
                    /* left swipe */ 
                    pThis.next();
                    
                } else {
                    /* right swipe */
                    pThis.prev();
                }                       
            } else {
                if ( yDiff > 0 ) {
                    /* up swipe */ 
                } else { 
                    /* down swipe */
                }                                                                 
            }
            /* reset values */
            xDown = null;
            yDown = null;                                             
        } // end handleTouchMove
    },

// THE INITIALIZING METHOD (call this to make slightbox)
    make : function(){
        var pThis = this,
            sb = document.getElementsByClassName(this.containerClass);
            
        
        for( var i = 0; i < sb.length; i++){
            sb[i].addEventListener('click', function(e){
                e.preventDefault();
                var target = e.target;
                while(target != sb[i]){
                    if(target && target.nodeName == "A"){
                        var img = target.getElementsByTagName('img')[0],
                            src = img.getAttribute('src') || "",
                            alt = img.getAttribute('alt') || "",
                            cap = img.getAttribute('title') || "";
                        pThis.openIt(img, src, alt, cap);
                    }
                    target = target.parentNode;
                }
            });
        }
        
        this.bindTouch();
        
        document.onkeyup = function(e) {
            if (e.keyCode == 27 || e.keyCode == 88) { pThis.closeIt(); } 
            if (e.keyCode == 39) { pThis.next(); } 
            if (e.keyCode == 37) { pThis.prev(); } 
            if (e.keyCode == 38) { pThis.toggleCaption(document.getElementById(pThis.overlayID).getElementsByClassName(pThis.captionClass)[0]); }
        }
        
        this.b.addEventListener('click', function(e){
            var t = e.target;
            if(!t) return false;
            
            if(t.className === pThis.closeClass){
                pThis.closeIt();
            }
            
            if(t.className.split(' ')[0] == pThis.captionToggleClass){
                var tp = t.parentElement;
                pThis.toggleCaption(tp);
            }
            
            if(t.className === pThis.nextClass){
                pThis.next();   
            }
            
            if(t.className === pThis.prevClass){
                pThis.prev();   
            }
        });
        
    }, // end make
    
    toggleCaption : function(el){
        if(!el.hasAttribute('data-activated')){
            el.className += " " + this.activeCapClass; 
            el.setAttribute('data-activated', 'true');
        }else{
            this.removeAClass(el, this.activeCapClass);
            el.removeAttribute('data-activated');
        }
    }   
    
} // end slightbox