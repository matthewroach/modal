var modalSettings = {
			dialogID: 'galleryModal',
			modalItems: '.j-Gallery',
			hideClass: 'hide',
			bodyClass: 'stopscroll'
		};


beforeEach(function() {
	jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
  loadFixtures('gallery.html');
  Modal(modalSettings);
});



afterEach(function() {
	fixture = '';
	$('#galleryModal').remove();
});



describe('Modal', function() {



	it('should be a function', function() {
		expect(Modal).toBeDefined();
	});



	it('should not open link upon clicking', function() {

		var spyEvent = spyOnEvent( modalSettings.modalItems, 'click' );
		$(modalSettings.modalItems)[0].click();
		expect('click').toHaveBeenPreventedOn(modalSettings.modalItems);
		expect(spyEvent).toHaveBeenPrevented();

	});



	it('should open modal upon clicking on link', function() {

		var spyEvent = spyOnEvent( modalSettings.modalItems, 'click' );
		$(modalSettings.modalItems)[0].click();
		expect('click').toHaveBeenTriggeredOn(modalSettings.modalItems);
		expect(spyEvent).toHaveBeenTriggered();

		expect($('#galleryModal')).toBeVisible();

	});



	it('body should have the bodyClass setting when modal open', function() {

		var spyEvent = spyOnEvent( modalSettings.modalItems, 'click' );
		$(modalSettings.modalItems)[0].click();
		expect('click').toHaveBeenTriggeredOn(modalSettings.modalItems);
		expect(spyEvent).toHaveBeenTriggered();

		expect($('body')).toHaveClass(modalSettings.bodyClass);

	});



	it('body should not have the bodyClass setting when modal closed', function() {

		var spyEvent = spyOnEvent( modalSettings.modalItems, 'click' );
		$(modalSettings.modalItems)[0].click();
		expect('click').toHaveBeenTriggeredOn(modalSettings.modalItems);
		expect(spyEvent).toHaveBeenTriggered();

		var spyCloseEvent = spyOnEvent( '#galleryModal', 'click' );
		$('#galleryModal').click();
		expect('click').toHaveBeenTriggeredOn('#galleryModal');
		expect(spyEvent).toHaveBeenTriggered();

		expect($('body')).not.toHaveClass(modalSettings.bodyClass);

	});



	it('should show the image from the href in the modal', function() {

		var spyEvent = spyOnEvent( modalSettings.modalItems, 'click' );
		var clickItem = $(modalSettings.modalItems)[0]

		clickItem.click();

		expect('click').toHaveBeenTriggeredOn(modalSettings.modalItems);
		expect(spyEvent).toHaveBeenTriggered();

		expect($('#galleryModal')).toBeVisible();
		expect($('#galleryModal img').attr('src')).toBe(clickItem.href);

	});



	it('should close the modal upon clicking on the open modal', function() {

		var spyEvent = spyOnEvent( modalSettings.modalItems, 'click' );
		$(modalSettings.modalItems)[0].click();
		expect('click').toHaveBeenTriggeredOn(modalSettings.modalItems);
		expect(spyEvent).toHaveBeenTriggered();


		var spyCloseEvent = spyOnEvent( '#galleryModal', 'click' );
		$('#galleryModal').click();
		expect('click').toHaveBeenTriggeredOn('#galleryModal');
		expect(spyEvent).toHaveBeenTriggered();

		expect($('#galleryModal')).not.toBeInDOM();

	});



});
