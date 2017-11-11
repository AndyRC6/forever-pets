$(document).ready(function(){
	var key = `b26c8182e23ead90ba01bb0636c359c9`;
	var animal;
	var breed;
	var location = $('#location').val();
	var offset;
	var queryUrl

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
	$("#breed").val(dogName);


	$("#btn-submit").on("click", function(event){
		event.preventDefault();
		$("#adoption-info").empty();
		$("#next-btn").css("display", "unset");
		$("#previous-btn").css("display", "unset");
		animal = $('#animal').val();
		breed = $('#breed').val();
		location = $('#location').val();
		offset = 0;
		queryUrl = `https://api.petfinder.com/pet.find?format=json&key=${key}&animal=${animal}&breed=${breed}&location=${location}&offset=${offset}&count=25&callback=?`;
		console.log(queryUrl);
		$.getJSON(queryUrl).done(function(response){
  		response.petfinder.pets.pet.forEach(function(item){
  			var desc = "description unavailable";
  			if (item.description.$t !== undefined){
  				desc = item.description.$t.slice(0, 300) + "...";
  			}
		$('#adoption-info').append(`<div class="animal-div animated fadeIn" data-toggle="modal" data-target="#myModal" data-name="${item.name.$t}" data-img="${item.media.photos.photo[2].$t}" data-description="${item.description.$t}" data-sex="${item.sex.$t}" data-email="${item.contact.email.$t}" data-phone="${item.contact.phone.$t}" data-state="${item.contact.state.$t}" data-city="${item.contact.city.$t}" data-size="${item.size.$t}" data-age="${item.age.$t}"><img class="img-thumbnail" src="${item.media.photos.photo[2].$t}"><h4>${item.name.$t}</h4><p>${desc}</p></div>`);
  			$("#second-nav").css("height", $("#main-content").height() + "px");
  			// $('#adoption-info').append(`<div class="adoption-div" data-toggle="modal" data-target="#myModal" data-name="${item.name.$t}" data-img="${item.media.photos.photo[2].$t}" data-description="${item.description.$t}" data-sex="${item.sex.$t}" data-email="${item.contact.email.$t}" data-phone="${item.contact.phone.$t}" data-state="${item.contact.state.$t}" data-city="${item.contact.city.$t}" data-size="${item.size.$t}" data-age="${item.age.$t}"><img class="img-responsive" src="${item.media.photos.photo[2].$t}"><h4>${item.name.$t}</h4></div>`);
  		});
  	})
	
		$("#second-nav").css("height", 2300);
	})

	$(document).on("click", ".animal-div", function(){
		$(".modal-header").html(`<h3>${$(this).attr('data-name')}</h3>`);
		$(".modal-body").html(`<img src='${$(this).attr('data-img')}' class='img-thumbnail'><p>${$(this).attr('data-description')}</p><p><strong>Age: </strong>${$(this).attr('data-age')}</p><p><strong>sex: </strong>${$(this).attr('data-sex')}</p><p><strong>Size: </strong>${$(this).attr('data-size')}</p><p><strong>contact email: </strong>${$(this).attr('data-email')}</p><p><strong>Contact Phone: </strong>${$(this).attr('data-phone')}</p><p><strong>Location: </strong>${$(this).attr('data-city')}, ${$(this).attr('data-state')}</p>`);

	})

	$("#next-btn").on("click", function(){
		$("#adoption-info").empty();
		offset = offset + 25;
		queryUrl = `https://api.petfinder.com/pet.find?format=json&key=${key}&animal=${animal}&breed=${breed}&location=${location}&offset=${offset}&count=25&callback=?`;
		$.getJSON(queryUrl).done(function(response){
  		response.petfinder.pets.pet.forEach(function(item){
  			console.log(item);
  			var desc = "description unavailable";
  			if (item.description.$t !== undefined){
  				desc = item.description.$t.slice(0, 300) + "...";
  			}
		$('#adoption-info').append(`<div class="animal-div animated fadeIn" data-toggle="modal" data-target="#myModal" data-name="${item.name.$t}" data-img="${item.media.photos.photo[2].$t}" data-description="${item.description.$t}" data-sex="${item.sex.$t}" data-email="${item.contact.email.$t}" data-phone="${item.contact.phone.$t}" data-state="${item.contact.state.$t}" data-city="${item.contact.city.$t}" data-size="${item.size.$t}" data-age="${item.age.$t}"><img class="img-thumbnail" src="${item.media.photos.photo[2].$t}"><h4>${item.name.$t}</h4><p>${desc}</p></div>`);
  			$("#second-nav").css("height", $("#main-content").height() + "px");
  			// $('#adoption-info').append(`<div class="adoption-div" data-toggle="modal" data-target="#myModal" data-name="${item.name.$t}" data-img="${item.media.photos.photo[2].$t}" data-description="${item.description.$t}" data-sex="${item.sex.$t}" data-email="${item.contact.email.$t}" data-phone="${item.contact.phone.$t}" data-state="${item.contact.state.$t}" data-city="${item.contact.city.$t}" data-size="${item.size.$t}" data-age="${item.age.$t}"><img class="img-responsive" src="${item.media.photos.photo[2].$t}"><h4>${item.name.$t}</h4></div>`);
  		});

  		})
	})

	$("#previous-btn").on("click", function(){
		if(offset > 0){
			$("#adoption-info").empty();
			offset = offset - 25;
			queryUrl = `https://api.petfinder.com/pet.find?format=json&key=${key}&animal=${animal}&breed=${breed}&location=${location}&offset=${offset}&count=25&callback=?`;
			$.getJSON(queryUrl).done(function(response){
  			response.petfinder.pets.pet.forEach(function(item){
  			console.log(item);
  			var desc = "description unavailable";
  			if (item.description.$t !== undefined){
  				desc = item.description.$t.slice(0, 300) + "...";
  			}
		$('#adoption-info').append(`<div class="animal-div animated fadeIn" data-toggle="modal" data-target="#myModal" data-name="${item.name.$t}" data-img="${item.media.photos.photo[2].$t}" data-description="${item.description.$t}" data-sex="${item.sex.$t}" data-email="${item.contact.email.$t}" data-phone="${item.contact.phone.$t}" data-state="${item.contact.state.$t}" data-city="${item.contact.city.$t}" data-size="${item.size.$t}" data-age="${item.age.$t}"><img class="img-thumbnail" src="${item.media.photos.photo[2].$t}"><h4>${item.name.$t}</h4><p>${desc}</p></div>`);
  			// $('#adoption-info').append(`<div class="adoption-div" data-toggle="modal" data-target="#myModal" data-name="${item.name.$t}" data-img="${item.media.photos.photo[2].$t}" data-description="${item.description.$t}" data-sex="${item.sex.$t}" data-email="${item.contact.email.$t}" data-phone="${item.contact.phone.$t}" data-state="${item.contact.state.$t}" data-city="${item.contact.city.$t}" data-size="${item.size.$t}" data-age="${item.age.$t}"><img class="img-responsive" src="${item.media.photos.photo[2].$t}"><h4>${item.name.$t}</h4></div>`);
  		});
  		})
	}
	})


})