


(function() {



	// Default settings for Gallery
	var defaults = {
		dialogID: 'galleryModal',
		modalItems: '.j-Gallery',
		hideClass: 'hide',
		bodyClass: 'stopscroll'
	};



	// Helper function to return the modal element object
	var getModal = function() {
		return document.querySelector('#' + defaults.dialogID);
	};



	// Does the modal exists, returning true or false
	var modalExists = function() {
		return getModal() !== null;
	};



	// Builds the Modal Elemetns and appends them to the body
	var createModal = function() {
		var modal = document.createElement('div');
		modal.id = defaults.dialogID;

		modal.appendChild(document.createElement('img'));

		document.body.appendChild(modal);
	};



	// Create's and Shows the modal
	var createShowModal = function( _image ) {
		// If the modal does not exist we need to create it and attach the close event
		if ( !modalExists() ) {
			createModal();
			closeEvent();
		}

		document.querySelector('#' + defaults.dialogID + ' img').src = _image;
		showModal();

	};



	// Show the modal to the user and add a CSS class to the body
	var showModal = function() {
		getModal().classList.remove(defaults.hideClass);
		document.querySelector('body').classList.add(defaults.bodyClass);
	};



	// Hide the modal from view, but leave HTML in page, and remove class
	// the was added to the body
	var hideModal = function() {
		getModal().classList.add(defaults.hideClass);
		document.querySelector('body').classList.remove(defaults.bodyClass);
	};



	// Event binding function that handles the event and calls to create the modal
	var showImage = function( _event ) {
		_event.preventDefault();
		createShowModal(this.href);
	};



	// Event Bindings, set up the events to the elements passed in
	var eventBindings = function( _elements ) {
		for ( var i=0; i<_elements.length; i++ ) {
			_elements[i].addEventListener( 'click', showImage, false );
		}
	};



	// Close binding for clicking the modal and closing it
	var closeEvent = function() {
		getModal().addEventListener( 'click', hideModal, false );
	};



	// overwrite the default options
	var overwrite = function( _settings ) {
		if ( typeof(_settings) === 'object') {
			for ( key in _settings ) {
				if ( defaults[key] ) {
					defaults[key] = _settings[key];
				}
			}
		}
	};



	// Modal - Public function called with or without a set of options.
	this.Modal = function( _settings ) {

		if ( _settings ) {
			overwrite(_settings);
		}

		var modalItems = document.querySelectorAll(defaults.modalItems);

		eventBindings(modalItems);

	};



	Modal();



})();
