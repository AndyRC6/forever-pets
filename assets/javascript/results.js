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

		for (var i = 0; i < localStorage.length; i++){
			if (localStorage.getItem(localStorage.key(i)).replace(/ /g,"").toLowerCase() === snapshot.val().Name.replace(/ /g,"").toLowerCase()) {
				// $('#adoption-info').append(`<div class="adoption-div"><a class="result-link" href="animal-caresheets.html?dog=`+snapshot.val().Name+`" target="blank"><img class="img-responsive" src="assets/images/Dogs/`+localStorage.getItem(localStorage.key(i)).replace(/ /g,"")+`.jpg"><h4>`+snapshot.val().Name+`</h4></a></div>`);
				dogName = snapshot.val().Name;
				var desc = snapshot.val().Description.slice(0, 300) + "...";
				$('#main-content').append(`<div class="animal-div animated fadeIn" data-dogname="${dogName}"><img class="img-thumbnail" src="assets/images/Dogs/`+dogName.replace(/ /g,"")+`.jpg"><h4>`+snapshot.val().Name+`<img src="assets/images/check.png" style="float:right;height:50px;width:50px"</h4><p>${desc}</p></div>`);
				dogCounter++;
				
			};   
		};
	});

	$(document).on("click", ".animal-div", function(){
		window.location.href = `animal-caresheets.html?dog=${$(this).attr("data-dogname")}`;
	})

});
