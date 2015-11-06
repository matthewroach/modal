# Modal

A simple modal plugin written in vanilla JavaScript and no external dependencies.


I wrote this little plugin as more of an experiment for myself. I wanted something super simple without the need for jQuery or any other JavaScript framework.
It was written to be used on my [blog](http://matthewroach.me) as an image modal viewer for gallery style post outputs.


## To use

1. Grab a copy of /src/modal.js and make it available on your page
2. Create an instance of Modal with the required settings, settings, and example below
3. add relevant CSS to your styles, example below


``` javascript
var settings = {
	dialogID: 'galleryModal',
	modalItems: '.j-Gallery',
	hideClass: 'hide',
	bodyClass: 'stopscroll'
};

var demoGallery = new Modal( settings );
```


```css
	#galleryModal {
		background: rgba(50, 50, 50, 0.5);
		height: 100%;
		left: 0;
		position: fixed;
		text-align: center;
		top: 0;
		width: 100%;
		z-index: 100000;
	}

	#galleryModal img {
		height: 85vh;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
	}
```
