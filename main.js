$(document).ready(function () {
	// ——————————————————————————————— //
	// ——————————————————————————————— //
	// ——————————————————————————————— //
	$("#submitBtn").on("click", function (e) {
		e.preventDefault();
		// grab the search term and set it to a variable
		var term = $("#search-term").val();
		// grab the number of records and set it to a variable
		var numRecords = $("#num-records").val();
		console.log(numRecords);
		// collect begin date and store it in a variable
		var begin = $("#begin").val();

		// collect begin date and store it in a variable
		var end = $("#end").val();

		console.log(end);
		// api key
		var key = "MW06HUr3j0I3WAD31mwbWRocnrddSPcg";
		// dynamically create the queryURL
		var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${key}`;
		console.log(queryURL);
		// if the user defines a begin year, then add it to the query
		if (begin != "") {
			begin = "begin_date=" + begin + "0101";
			queryURL = queryURL + "&" + begin;
		}
		// if the user defines a end year, then add it to the query
		if (end != "") {
			end = "end_date=" + end + "1231";
			queryURL = queryURL + "&" + end;
		}
		// call the api and retrieve a response
		$.ajax({
			url: queryURL,
			method: "GET",
		}).then(function (nyTimes) {
			console.log(nyTimes);
			var count = 1;
			// pulls the number of records requested by the user
			for (var i = 0; i < numRecords; i++) {
				var article = nyTimes.response.docs[i].headline.main;
				var author = nyTimes.response.docs[i].byline.original;
				// create the article div and add it to the dom
				var articleDiv = $(`<div class="container mx-auto my-4">`);
				$(articleDiv).html(
					`<h3>${count}: ${article}</h3><br><h5>${author}</h5>`
				);
				$("#article-results").append(articleDiv);
				count++;
			}
		});
	});
	$("#clearBtn").on("click", function () {
		$("#article-results").empty();
	});
	// ——————————————————————————————— //
	// ——————————————————————————————— //
	// ——————————————————————————————— //
});
