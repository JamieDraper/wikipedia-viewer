/////////////////

// https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Guitar&utf8&srlimit=max

//  use underscore in search for spaces?

var main = function() {
	"use strict";

	function getSearchURL(subject) {
		var BASE_URL = ["https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=", "&srlimit=max&callback=?"];
		return BASE_URL[0] + subject + BASE_URL[1];
	}

	function stripMarkUp(html) {
		var div = $('<div id="strip-wrapper">');
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		$("#strip-wrapper").remove();
		console.log(text);
		return text;
	}

	function removeTags(html){
	    var txt = html;
	    var rex = /(<([^>]+)>)/ig;
	    return txt.replace(rex , "");

	}


	$.ajax({
        type: "GET",
        //url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?",
        url: getSearchURL("dance music"),
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            var results = data.query.search;
            results.forEach(function(result) { // for each result returned
            	// make result box
            	// assign title -- result.title
            	// strip markup from -- result.snippet then assign
            	// snippet not long enough, need rvprop=content ??? ********
            });
        },
        error: function (errorMessage) {
        	console.log("Unable to retrieve data from wiki :(")
        }
    });



};

$(document).ready(main);





