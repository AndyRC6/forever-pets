$(document).ready(function(){
	var videoPrefix = `https://www.youtube.com/embed/`;
	var videoURL;

	$.ajax({
		url:"https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=how+to+take+care+of+a+dog&key=AIzaSyClMZo5Ng1IBYgw7cqD7LPkF8mfWXN4Fog",
		method: "GET"
	}).done(function(result){
		console.log(result);
		result.items.forEach(function(item){
			videoURL = `${videoPrefix}${item.id.videoId}`;
			$("#main-content").append(`<div class="general-video" data-toggle="modal" data-target="#myModal" data-url="${videoURL}"><iframe class="video-iframe" height="200" width="200" src="${videoURL}" allowfullscreen="allowfullscreen"></iframe></div>`);
			console.log(videoURL);
		})
	})

	$(document).on("click", ".general-video", function(){
		$(".modal-body").empty();
		$(".modal-body").append(`<iframe class="modal-iframe" src="${$(this).attr("data-url")}" allowfullscreen="allowfullscreen"></iframe>`);
	})

})