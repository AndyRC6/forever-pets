
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
var activityString = "";
var dogCount = 0

$("#submit").on("click",function(event) {
	event.preventDefault();
	
	var budget = parseInt($("#budget").val().slice(1));
	var housing = parseInt($("#living-situation").val());
	var activityLevel = parseInt($("#demo").text());

	setActivityLevel(activityLevel);

	console.log(budget, activityLevel, housing);

	localStorage.clear();
	petSelector(budget,housing,activityString);
	dogCount = 0;
});

function petSelector(budget,housing,activityString){
	database.ref("/dogs").on("child_added", function(snapshot){
		if (budget >= parseInt(snapshot.val().Cost)) {
			if (parseInt(snapshot.val().Housing) <= housing) {
				if (snapshot.val().Activity.split("-",1)[0].toLowerCase().trim() === activityString) {
					localStorage.setItem("breed" + dogCount, snapshot.val().Name);
					dogCount++
				};
			};
		};
	});
	$("#main-content").empty();
	$("#main-content").append(`<div style="margin-top:30%;margin-bottom:5%" id="loading-text"><p class="text-center animated fadeIn">Finding your perfect companion...</p></div>`);
	$("#main-content").append(`<div class="sk-folding-cube">
  <div class="sk-cube1 sk-cube"></div>
  <div class="sk-cube2 sk-cube"></div>
  <div class="sk-cube4 sk-cube"></div>
  <div class="sk-cube3 sk-cube"></div>
	</div>`);

	setTimeout(function(){
		$("#loading-text").html(`<p class="text-center animated fadeIn">Counting Paws...</p>`);
	}, 2000)

	setTimeout(function(){
		$("#loading-text").html(`<p class="text-center animated fadeIn">Loading Treats...</p>`);
	}, 6000)

	setTimeout(function(){
		$("#loading-text").html(`<p class="text-center animated fadeIn">Determining Good Boy Status...</p>`);
	}, 8000)

	setTimeout(function(){ 
        window.location.href = "results.html";
     }, 10000);
};

function setActivityLevel(activityLevel){
	if (activityLevel < 4) {
		activityString = "low";
	};
	if (activityLevel > 3 && activityLevel < 7) {
		activityString = "medium";
	};
	if (activityLevel > 6) {
		activityString = "high";
	};
};