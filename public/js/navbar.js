$(document).ready(function()
{
	var pathname = $(location).attr('href');

		if(pathname.indexOf('home')!== -1)
		{
			$('#navbarloginbutton').removeClass('active');
			$('#navbaraboutbutton').removeClass('active');
			$('#navbarhomebutton').addClass('active');
		}
		
		if(pathname.indexOf('login')!== -1)
		{
			$('#navbaraboutbutton').removeClass('active');
			$('#navbarhomebutton').removeClass('active');
			$('#navbarloginbutton').addClass('active');
		}

		if(pathname.indexOf('about')!== -1)
		{
			$('#navbarloginbutton').removeClass('active');
			$('#navbarhomebutton').removeClass('active');
			$('#navbaraboutbutton').addClass('active');
		}
})