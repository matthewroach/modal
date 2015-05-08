


beforeEach(function() {
  loadFixtures('gallery.html');
  Modal();
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

		var spyEvent = spyOnEvent( '.j-Gallery', 'click' );
		$('.j-Gallery')[0].click();
		expect('click').toHaveBeenPreventedOn('.j-Gallery');
		expect(spyEvent).toHaveBeenPrevented();

	});



	it('should open modal upon clicking on link', function() {

		var spyEvent = spyOnEvent( '.j-Gallery', 'click' );
		$('.j-Gallery')[0].click();
		expect('click').toHaveBeenTriggeredOn('.j-Gallery');
		expect(spyEvent).toHaveBeenTriggered();

		expect($('#galleryModal')).toBeVisible();

	});



	it('should show the image from the href in the modal', function() {

		var spyEvent = spyOnEvent( '.j-Gallery', 'click' );
		var clickItem = $('.j-Gallery')[0]

		clickItem.click();

		expect('click').toHaveBeenTriggeredOn('.j-Gallery');
		expect(spyEvent).toHaveBeenTriggered();

		expect($('#galleryModal')).toBeVisible();
		expect($('#galleryModal img').attr('src')).toBe(clickItem.href);

	});



	it('should close the modal upon clicking on the open modal', function() {

		var spyEvent = spyOnEvent( '.j-Gallery', 'click' );
		$('.j-Gallery')[0].click();
		expect('click').toHaveBeenTriggeredOn('.j-Gallery');
		expect(spyEvent).toHaveBeenTriggered();


		var spyCloseEvent = spyOnEvent( '#galleryModal', 'click' );
		$('#galleryModal').click();
		expect('click').toHaveBeenTriggeredOn('#galleryModal');
		expect(spyEvent).toHaveBeenTriggered();

		expect($('#galleryModal')).toHaveClass('hide');


	});



	it('should reuse the modal in the DOM on opening subsequent items', function() {

		var spyEvent = spyOnEvent( '.j-Gallery', 'click' );
		$('.j-Gallery')[0].click();
		expect('click').toHaveBeenTriggeredOn('.j-Gallery');
		expect(spyEvent).toHaveBeenTriggered();


		var spyCloseEvent = spyOnEvent( '#galleryModal', 'click' );
		$('#galleryModal').click();
		expect('click').toHaveBeenTriggeredOn('#galleryModal');
		expect(spyEvent).toHaveBeenTriggered();

		expect($('#galleryModal')).toHaveClass('hide');

		var spyEvent2 = spyOnEvent( '.j-Gallery', 'click' );
		$('.j-Gallery')[0].click();
		expect('click').toHaveBeenTriggeredOn('.j-Gallery');
		expect(spyEvent2).toHaveBeenTriggered();

		expect($('#galleryModal')).toBeVisible();

	});



});
