/*global Modal:true*/
/* exported Modal */

/**
 * Represents a modal.
 * @namespace
 * @class
 * @param {stuct} _settings - A structure of settings for the modal
 */
Modal = (function() {


	function modal( _settings ) {


		var modalItems = [];
		var currentItem;



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



		// Builds the Modal Elements and appends them to the body
		var createModal = function() {
			var modal = document.createElement('div');
			modal.id = defaults.dialogID;

			modal.appendChild(document.createElement('img'));

			document.body.appendChild(modal);
		};



		// Show the modal to the user and add a CSS class to the body
		var showModal = function() {
			getModal().classList.remove(defaults.hideClass);
			document.querySelector('body').classList.add(defaults.bodyClass);
		};



		// Hide the modal from view, but leave HTML in page, and remove class
		// the was added to the body
		var hideModal = function() {
			var body = document.querySelector('body');
			body.removeChild(document.querySelector('#' + defaults.dialogID));
			body.classList.remove(defaults.bodyClass);
			currentItem = '';
		};



		// Return index of the current item in view
		var getCurrentIndex = function( ) {
			return modalItems.indexOf(currentItem);
		};



		// Get the index of the next item from the object of modalItems
		var getNext = function() {
			if ( getCurrentIndex() === modalItems.length - 1 && modalItems.length > 0 ) {
				return 0;
			} else {
				return getCurrentIndex() + 1;
			}
		};



		// Get the index of the previous item from the object of modalItems
		var getPrevious = function() {
			if ( getCurrentIndex() === 0 && modalItems.length > 0 ) {
				return modalItems.length - 1;
			} else {
				return getCurrentIndex() - 1;
			}
		};



		/**
		 * @private
		 * @function closeEvent
		 * @memberof Modal
		 * @description Set up the close binding for clicking the modal and closing it
		 */
		var closeEvent = function() {
			getModal().addEventListener( 'click', hideModal, false );
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

		/**
		 * @private
		 * @function displayImage
		 * @memberof Modal
		 * @description Display Image function that is tied to the event binding for each image
		 */
		var displayImage = function( _element ) {
			currentItem = _element;
			createShowModal(_element.href);

			_element.addEventListener( 'keydown', openModalBindings, false );

		};


		// Handle key press on Modal
		var keyPressOnModal = function( _event ) {
			var bodyClass = Array.prototype.slice.call(document.querySelector('body').classList);

			if ( bodyClass.indexOf(defaults.bodyClass) !== -1 ) {

				switch ( _event.keyCode.toString() ) {
					case '39':
						displayImage( modalItems[ getNext() ] );
						break;

					case '37':
						displayImage( modalItems[ getPrevious() ] );
						break;

					case '27':
						hideModal();
						break;
				}
			}

		};



		var openModalBindings = function( _event ) {
			keyPressOnModal( _event );
		};



		// Event binding function that handles the event and calls to create the modal
		var showImage = function( _event ) {
			_event.preventDefault();
			displayImage(this);
		};



		/**
		 * @private
		 * @function eventBindings
		 * @memberof Modal
		 * @description Event Bindings, set up the events to the elements passed in
		 */
		var eventBindings = function( _elements ) {
			var i = 0;

			for ( i; i<_elements.length; i++ ) {
				_elements[ i ].addEventListener( 'click', showImage, false );
			}

		};



		// overwrite the default options
		var overwrite = function( _settings ) {
			var key = '';

			if ( typeof(_settings) === 'object' ) {
				for ( key in _settings ) {
					if ( defaults[ key ] ) {
						defaults[ key ] = _settings[ key ];
					}
				}
			}

		};



		/**
		 * @function destroy
		 * @memberof Modal
		 * @description Destroy the modal, and all events
		 */
		this.destroy = function() {
			var i = 0;
			for ( i; i<modalItems.length; i++ ) {
				modalItems[ i ].removeEventListener( 'click', displayImage );
			}
		};



		// This is run when a new instance of Modal is created.
		if ( _settings ) {
			overwrite(_settings);
		}

		modalItems = Array.prototype.slice.call(document.querySelectorAll(defaults.modalItems));

		eventBindings(modalItems);


	}



	return modal;



})();
