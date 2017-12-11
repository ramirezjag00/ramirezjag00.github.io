
//scroll to top
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("myBtn").style.display = "block";
	} else {
		document.getElementById("myBtn").style.display = "none";
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

//slide animation
$(window).scroll(function() {
	$(".slideanim").each(function(){
		var pos = $(this).offset().top;

		var winTop = $(window).scrollTop();
		if (pos < winTop + 600) {
			$(this).addClass("slide");
		}
	});
});

//internal links to change contents
$(document).ready(function() {

	//make ongoing class default
	$('.projectContainer').html($('#ongoing').html());
	if ($('.proj1').is("active"))
		$('.button-proj').not('.proj1').removeClass('active');
	else
		$('.proj1').addClass('active');
	$('.button-proj').not('.proj1').removeClass('active');


     //active link on-click
     $('.button-proj').click(function() {
     	if ($(this).is("active"))
     		$('.button-proj').not(this).removeClass('active');
     	else
     		$(this).addClass('active');
     	$('.button-proj').not(this).removeClass('active');
     });

	//show images of specific link category on-click
	$('.proj1').click(function() {
		$('.projectContainer').html($('#ongoing').html());
	})

	$('.proj2').click(function() {
		$('.projectContainer').html($('#civil').html());
	})

	$('.proj3').click(function() {
		$('.projectContainer').html($('#plant').html());
	})

	$('.proj4').click(function() {
		$('.projectContainer').html($('#building').html());
	})

}); //end of ready



