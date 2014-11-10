#Slightbox

##A tiny, responsive, and accessible image lightbox in vanilla javascript.

What the world needs is another lightbox, right? Well, maybe. I couldn't find another image lightbox that satisfied all of these requirements:

- Didn't use jQuery
- Small in filesize (many were 50-100kb)
- Prioritized accessibility
- Mobile friendly

So I made Slightbox to do all of those things. Preview a [demo of slightbox](https://rawgit.com/thebarrytone/slightbox/master/index.html) [note: this preview isn't working completely well on mobile devices].

###No jQuery

Advances in browsers are making it easier to ditch jQuery. Or maybe you're just a code hipster like me and think vanilla JavaScript sounds better.

###Small

It requires some JavaScript and some CSS to work, but both files together are only around 8kb (minified). Of course, it requires no jQuery or any other library. There are some helpful look and feel styles baked in, but as little as possible was added so that you can style it yourself. No images in the UI or any of that silliness.

###Prioritize Accessibility

It probably isn't perfect yet, but it tries to do some things. It is fully operable with a keyboard, and it takes care to manage focus well. It also is semantically marked up, using figure and figcaption elements as well as buttons for controls.

###Mobile Friendly

Not only is it touch- and swipe-friendly, it is designed to work in a responsive layout. 

##Notes

Currently, it doesn't look like it's the smartest way to handle the images. All full-sized images are being loaded with the rest of the page, then just made larger in the lightbox. I plan to extend this to support thumbnails and even just links to images. 

The reason I've done it this particular way is because I built this for my personal site, and I'm loading the images at the user's request. Check out my implementation of it on [my personal site](http://barrytsmith.com).
