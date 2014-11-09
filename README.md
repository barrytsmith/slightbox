#Slightbox

##A tiny, responsive, and accessible image lightbox in vanilla javascript.

What the world needs is another lightbox, right? Well, maybe. I couldn't find another image lightbox that satisfied all of these requirements:

- Didn't use jQuery
- Small in filesize (many were 50-100kb)
- Prioritized accessibility
- Mobile friendly

So I made Slightbox to do all of those things.

###No jQuery

Advances in browsers are making it easier to ditch jQuery. Or maybe you're just a code hipster like me and think vanilla JavaScript sounds better.

###Small

It requires some JavaScript and some CSS to work, but both files together are only around 8kb (minified). Of course, it requires no jQuery or any other library. There are some helpful look and feel styles baked in, but as little as possible was added so that you can style it yourself. No images in the UI or any of that silliness.

###Prioritize Accessibility

It probably isn't perfect yet, but it tries to do some things. It is fully operable with a keyboard, and it takes care to manage focus well. It also is semantically marked up, using figure and figcaption elements as well as buttons for controls.

###Mobile Friendly

Not only is it touch- and swipe-friendly, it is designed to work in a responsive layout. 