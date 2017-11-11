$(document).ready(function(){
	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;
	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};


	var dogName = getUrlParameter("dog");
	var videoPrefix = `https://www.youtube.com/embed/`;
	var videoURL;


	var config = {
		  apiKey: "AIzaSyBTKchSvU5EnfvfNHsAampv_TI2Xq-fRtw",
		  authDomain: "foreverpets0917-19425.firebaseapp.com",
		  databaseURL: "https://foreverpets0917-19425.firebaseio.com",
		  projectId: "foreverpets0917-19425",
		  storageBucket: "",
		  messagingSenderId: "217331235285"
		};
	firebase.initializeApp(config);

	var database = firebase.database();


	database.ref("/dogs").on("child_added", function(snapshot){

		if (dogName.replace(/ /g,"").toLowerCase() === snapshot.val().Name.replace(/ /g,"").toLowerCase()) {
			$('#adoption-info').append(`<div class="adoption-div"><img class="img-responsive" src="assets/images/Dogs/`+dogName.replace(/ /g,"")+`.jpg"></div>`);
			$('#adoption-info').append(`<div><h1>`+snapshot.val().Name+`<hr></h1></div>`);
			$('#adoption-info').append(`<div><p><b>Life Span:</b> `+snapshot.val().LifeSpan+`</p></div>`);
			$('#adoption-info').append(`<div><p><b>Size:</b> `+snapshot.val().Size+`</p></div>`);
			$('#adoption-info').append(`<div><p><b>Expected Monthly cost: </b>$`+snapshot.val().Cost+`</p></div>`);
			$('#adoption-info').append(`<div><p><b>Activity Level:</b> `+snapshot.val().Activity+`</p></div>`);
			$('#adoption-info').append(`<div><p><b>Nutrition:</b> `+snapshot.val().Nutrition+`</p></div>`);
			$('#adoption-info').append(`<div><p><b>Grooming:</b> `+snapshot.val().Grooming+`</p></div>`);
			$('#adoption-info').append(`<div><p><b>Description:</b> `+snapshot.val().Description+`</p></div>`);
			$('#adoption-info').append(`<div><p><b>History:</b> `+snapshot.val().History+`</p></div>`);
			$('#adoption-info').append(`<br><br><div id="adopt-div"><p class="text-center">Thinking about rescuing this animal? Click below to get started!</p><button class="btn btn-md btn-success center-block" id="adopt-btn">Adopt</button></div><hr>`);
			
			$.ajax({
				url:`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${dogName} care&key=AIzaSyClMZo5Ng1IBYgw7cqD7LPkF8mfWXN4Fog`,
				method: "GET"
			}).done(function(result){
				console.log(result);
				result.items.forEach(function(item){
				videoURL = `${videoPrefix}${item.id.videoId}`;
				$("#main-content").append(`<div class="general-video" data-toggle="modal" data-target="#vidModal" data-url="${videoURL}"><iframe class="video-iframe" height="200" width="200" src="${videoURL}" allowfullscreen="allowfullscreen"></iframe></div>`);
				console.log(videoURL);
			})
		})

		};    	

	});



	$(document).on("click", "#adopt-btn", function(){
		window.location.href = `adoptions.html?dog=${dogName}`;
	})

	$(document).on("click", ".general-video", function(){
		$(".modal-body").empty();
		$(".modal-body").append(`<iframe class="modal-iframe" src="${$(this).attr("data-url")}" allowfullscreen="allowfullscreen"></iframe>`);
	})

});