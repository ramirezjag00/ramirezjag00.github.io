
//scroll to top
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("btn-to-top").style.display = "block";
	} else {
		document.getElementById("btn-to-top").style.display = "none";
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

//PROJECTS
//internal links to change contents
$(document).ready(function() {

	//make ongoing class default
	$('.project-container').html($('#power').html());
	if ($('.proj2').is("active"))
		$('.button-proj').not('.proj2').removeClass('active');
	else
		$('.proj2').addClass('active');
	$('.button-proj').not('.proj2').removeClass('active');


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
		$('.project-container').html($('#ongoing').html());
	})

	$('.proj2').click(function() {
		$('.project-container').html($('#power').html());
	})

	$('.proj3').click(function() {
		$('.project-container').html($('#water').html());
	})

	$('.proj4').click(function() {
		$('.project-container').html($('#civil').html());
	})

	$('.proj5').click(function() {
		$('.project-container').html($('#building').html());
	})

}); //end of ready

//CAREERS
//internal links to change contents
$(document).ready(function() {

	//make alljobs class default
	$('.career-container').html($('#allJobs').html());
	if ($('.career1').is("active"))
		$('.button-car').not('.career1').removeClass('active');
	else
		$('.career1').addClass('active');
	$('.button-car').not('.career1').removeClass('active');


     //active link on-click
     $('.button-car').click(function() {
     	if ($(this).is("active"))
     		$('.button-car').not(this).removeClass('active');
     	else
     		$(this).addClass('active');
     	$('.button-car').not(this).removeClass('active');
     });

	//show images of specific link category on-click
	$('.career1').click(function() {
		$('.career-container').html($('#allJobs').html());
	})

	$('.career2').click(function() {
		$('.career-container').html($('#professionals').html());
	})

	$('.career3').click(function() {
		$('.career-container').html($('#graduates').html());
	})

	$('.career4').click(function() {
		$('.career-container').html($('#skilledCraft').html());
	})

}); //end of ready



