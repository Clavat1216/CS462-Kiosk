function displayLogin(){
	var login = document.getElementById("login");
	console.log("displaying login");
	if(login.style.display == 'none')
	{
		login.style.display = 'inline';
		login.username.value = "";
		login.password.value = "";
	}
	else
	{
		login.style.display = 'none';
	}
}

function override_submit(jquerySelector, success, failure){
	$(jquerySelector).submit(function(event){
		event.preventDefault();
		event.stopImmediatePropagation();
		$.ajax({
			type: 'POST',
			url: $(this).attr('action'),
			data: $(this).serialize()
		})
		.done(success)
		.error(failure)
	});
}

$(window).load(function(){
	if(window.location.search == "?failedLogin"){
		$('#failedLogin').modal('show');
	}

	override_submit(
		'form[name=login]',
		function success(data){location="/kioskPage.html"},
		function failure(data){alert(data.responseText)}
	);
})