$(function() {


	//IE9-10 placeholder polyfill
	$('input, textarea').placeholder();

	$.validator.addMethod("alpha_space_dash", function(value, element) {
        return this.optional(element) || /^[a-z0-9\-\s]+$/i.test(value);
    }, "Must contain only letters, numbers, spaces, or dashes.");


	//Validates the signup strips
    $("#signup-strip-form").validate({
        rules: {email: {email:true,required:true},
                zip: {zipcodeUS:true, required:true}}
    });
    //Validates the search form
    $('#search-input').closest('form').validate({
    	rules: {keywords: {required:true, rangelength: [4, 50],alpha_space_dash:true}}
    });

	//hides/shows the Take Action menu
    $('.nav-take-action a').bind('click', function(event) {
    	$('#nav-take-action-slider').slideToggle(500);
        event.preventDefault();
    });

    //If take actions are displayed when screen collapses, hide them on menu click
   	$("button.navbar-toggle").click(function(event) {
		$('#nav-take-action-slider').slideUp(500);
	});

   	//Prevents click through on Take Action button in Collapsed menu
	$('.nav-take-action-off a').bind('click', function(event) {
        event.preventDefault();
        return false;
    });


    //Connects the links in the Take Action menu to an action.
	$('.take-action-item-wrapper').bind('click', function(event) {
    	var href = $(this).attr('href');
		window.location.href = href;
    });


	//Adds the scrolling marquee effect to the Factivists on the front page
    $('.marquee').marquee({
	    //speed in milliseconds of the marquee
	    duration: 30000,
	    //gap in pixels between the tickers
	    gap: 10,
	    //time in milliseconds before the marquee will start animating
	    delayBeforeStart: 0,
	    //'left' or 'right'
	    direction: 'left',
	    //true or false - should the marquee be duplicated to show an effect of continues flow
	    duplicated: true
	});



	/* Affix the navbar after scroll below header */
/*
	function affix_nav(value){
		if(!$.isNumeric(value)){
			value = $('header').outerHeight();
		}
		$('#nav').affix({
		    offset: {
		        top: value
		    }
		});
		$('#nav').data('bs.affix').options.offset = value;
	}
	affix_nav(0);
*/



	//Advanced Dem Because Code
	$('#main-page-dem-because-adv .dem-because-adv-thumb-wrap div').on('click', function(){
		$('#main-page-dem-because-adv .titlewrapper').fadeOut(300);
		$('#main-page-dem-because-adv .infowrapper').fadeIn(300);
	});
	$('#main-page-dem-because-adv').on('mouseleave', function(){
		$('#main-page-dem-because-adv .titlewrapper').fadeIn(300);
		$('#main-page-dem-because-adv .infowrapper').fadeOut(300);
	});
	$('#main-page-dem-because-adv .infowrapper').on('click', function(){
		$('#main-page-dem-because-adv .titlewrapper').fadeIn(300);
		$('#main-page-dem-because-adv .infowrapper').fadeOut(300);
	});

	//Normal Dem Because code
	$('[profile]').on('click', function(){
		if(!$(this).hasClass('active')){
			var num = $(this).attr('profile');
			$('div[class^="because-"]').hide();
			$('.because-'+num).fadeIn(300);
			$('.smallphoto').removeClass('active');
			$(this).addClass('active');
		}
	})













	//Hero Options
	$('#masthead_select').on('change', function(){
		var val = $(this).val();
		if(val == 'top'){
			$('header.active').show();
			$('header').detach().insertBefore('.navbar-affix-wrapper');
			affix_nav();
		}else if(val=='below'){
			$('header.active').show();
			$('header').detach().insertAfter('#nav-take-action-slider');
			affix_nav(0);
		}else{
			$('header').hide();
			affix_nav(0);
		}
	});
	$('#masthead_type').on('change', function(){
		var val = $(this).val();
		if(val == 'mlk'){
			$('header').removeClass('active');
			$('header.mlk').addClass('active');
		}else if(val=='quote'){
			$('header').removeClass('active');
			$('header.quote').addClass('active');
		}
		$('header').hide();
		$('header.active').show();
		$('#masthead_select').trigger('change');
	});

	$('#content_type').on('change', function(){
		var val = $(this).val();
		var parent = $('#double-content-wrapper .col-md-8').parent();
		if(val == 'double-l'){
			$('#double-content-wrapper').show();
			$('#tri-content-wrapper').hide();
			$('#double-content-wrapper .col-md-8').detach().prependTo(parent);
			$('#double-content-wrapper col-md-4').detach().prependTo(parent);
		}else if(val == 'double-r'){
			$('#double-content-wrapper').show();
			$('#tri-content-wrapper').hide();
			$('#double-content-wrapper .col-md-4').detach().prependTo(parent);
			$('#double-content-wrapper col-md-8').detach().prependTo(parent);
		}else{
			$('#double-content-wrapper').hide();
			$('#tri-content-wrapper').show();
		}
	});


	//Fixes the bootstrap carousel height animation issue
	$('.carousel').carousel().on('slide.bs.carousel', function (e){
	        var nextH = $(e.relatedTarget).height();
	        $(this).find('.active.item').parent().animate({ height: nextH }, 500);
	    });



});
