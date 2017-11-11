$(document).ready(function(){

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
	var dogCounter = 0;
	var dogName = "";

	database.ref("/dogs").on("child_added", function(snapshot){
		dogName = snapshot.val().Name;
		var desc = snapshot.val().Description.slice(0, 300) + "...";
		$('#main-content').append(`<div class="animal-div animated fadeIn" data-dogname="${dogName}"><img class="img-thumbnail" src="assets/images/Dogs/`+dogName.replace(/ /g,"")+`.jpg"><h4>`+snapshot.val().Name+`</h4><p>${desc}</p></div>`);
		$("#second-nav").css("height", $("#main-content").height() + "px");
	});

	$(document).on("click", ".animal-div", function(){
		window.location.href = `animal-caresheets.html?dog=${$(this).attr("data-dogname")}`;
	})

	

});
