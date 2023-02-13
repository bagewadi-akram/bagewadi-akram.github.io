/*
Copyright (c) 2016 Project Name
------------------------------------------------------------------
[Master Javascript]

Project:	ebook html template

-------------------------------------------------------------------*/

(function ($) {
	"use strict";
	var ebook = {
		initialised: false,
		version: 1.0,
		ebook: false,
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}

			/*-------------- ebook Functions Calling ---------------------------------------------------
			------------------------------------------------------------------------------------------------*/
			this.index_slider();
			this.scroll_menu();
			this.project_slider();
			this.testimonial_slider();
			this.smooth_scroll();
			this.wow();
			this.mail_function();
		},
		
		/*-------------- ebook Functions definition ---------------------------------------------------
		---------------------------------------------------------------------------------------------------*/
		
			index_slider: function(){
				var revapi;
					jQuery(document).ready(function() {		
						revapi = jQuery("#rev_slider").revolution({
							sliderType:"standard",
							delay:9000,
							navigation: {
								arrows:{enable:true}				
							},			
							gridwidth:1230,
							gridheight:720		
						});		
					});	/*ready*/
			},
			scroll_menu: function(){
				  $.scrollIt();
			},
			project_slider: function(){
				$('.in_project_slider .owl-carousel').owlCarousel({
					loop:true,
					margin:10,
					nav:false,
					dots:true,
					items:4,
					autoplay:true,
					autoplayTimeout:3000,
					autoplayHoverPause:true,
					responsive:{
						0:{
							items:1
						},
						600:{
							items:3
						},
						1000:{
							items:4
						}
					},
				})
			},
			testimonial_slider: function(){
				$('.in_testimonial_slider .owl-carousel').owlCarousel({
					loop:true,
					margin:10,
					nav:false,
					dots:true,
					autoplay:true,
					autoplayTimeout:3000,
					autoplayHoverPause:true,
					items:1,
					responsive:{
						0:{
							items:1
						},
						600:{
							items:1
						},
						1000:{
							items:1
						}
					}
				})
			},
			smooth_scroll: function(){
				 jQuery.scrollSpeed(100, 800);
			},
			wow: function(){
				 new WOW().init();
			},
			mail_function: function(){
				$("#submit").click(function(){
					var discuss = $('#discuss').val();
					var name = $('#yourname').val();
					var phone = $('#phone_number').val();
					var email = $('#youremail').val();
					var letters = /^[A-Za-z]+$/;
					var number = /^[0-9]+$/;
					var mail_letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
					
					if (name != "" && phone != "" && email != "") {
						if(name.match(letters)) { 
							if(phone.match (number) && phone.length <= 10) {
								if(email.match(mail_letters)){
									$.ajax({
									method : 'post',
									url : 'ajax_mail.php',
									data :  {'first_name' : name ,
											  'pnumber' : phone,
											  'em' : email,
											  'discus' : discuss,
											  },
								   }).done(function(resp){
									   if( resp == 1){
											document.getElementById("error").style.color = "green";
										   document.getElementById("error").innerHTML = "Mail Send Successfully";
											$('#yourname').val('');
										   $('#phone_number').val('');
										   $('#youremail').val('');
									   }else{
											document.getElementById("error").style.color = "red";
										    document.getElementById("error").innerHTML = "Mail not Send";
									   }
								   console.log(resp);});
								}else{
									document.getElementById("error").style.color = "red";
									document.getElementById("error").innerHTML = "Please Fill The  Correct Mail Id";
								}
							}else{
								document.getElementById("error").style.color = "red";
								document.getElementById("error").innerHTML = "Please Fill The  Correct Number";
							}
						}else
						{	document.getElementById("error").style.color = "red";
							document.getElementById("error").innerHTML = "Please Fill The Correct Name";
						}   
					}else{
						document.getElementById("error").style.color = "red";
						document.getElementById("error").innerHTML = "Please Fill All Detail";
					}
				});
			},
			
	};
	ebook.init();

	// Load Event
	$(window).on('load', function() {
		$(".in_loader").hide();
	});

	// Scroll Event
	$(window).on('scroll', function () {
		if (document.body.scrollTop > 50) {
			$(".in_top").css('display','block');
		}else{
			$(".in_top").css('display','none');
		}
	});
	
	
})(jQuery);
