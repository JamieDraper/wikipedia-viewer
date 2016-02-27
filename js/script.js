/////////////////

// https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Guitar&utf8&srlimit=max

//  use underscore in search for spaces?

var main = function() {
	"use strict";

	function getSearchURL(subject) {
		var BASE_URL = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=20&prop=extracts&exintro&explaintext&exsentences=2&exlimit=max&gsrsearch=";
		return BASE_URL + subject;
	}

    function makeResultBox(id, title, extract) {
        // function for turning pageid into div's link
        var div = document.createElement("div");
        var pageLink = document.createElement("a");
        var heading = document.createElement("h2");
        var body = document.createElement("p");

        pageLink.href = "https://en.wikipedia.org/?curid=" + id;
        div.className = "result-box";
        heading.className = "item-heading";
        body.className = "item-body";

        heading.innerText = title;
        body.innerText = extract;
        pageLink.appendChild(div);
        div.appendChild(heading);
        div.appendChild(body);

        return pageLink;

    }

	$.ajax({
        type: "GET",
        url: getSearchURL("music"),
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        success: function (data, textStatus, jqXHR) {

            var results = data.query.pages;
            console.log(results);
            $("#results").hide();
            for (var result in results) {
                // results.pageid
                var pageID = results[result]["pageid"]; // undefined
                // results.title
                var title = results[result]["title"];
                // results.extract
                var extract = results[result]["extract"];

                var link = makeResultBox(pageID, title, extract);
                $("#results").append(link);
                console.log(pageID);
            }
            $("#results").show("slow");

        },
        error: function (errorMessage) {
        	console.log("Unable to retrieve matched titles from wiki :(")
        }
    });



};

$(document).ready(main);





