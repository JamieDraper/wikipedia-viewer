/*
- Allow users to enter text into field
- When seach button hit, fire ajax using contents of textfield (check for char type?)
*/

// Search bar //
"use strict";
(function(window){

    // get vars
    var searchEl = $("#input");
    var labelEl = $("#label");


    // register clicks on search box and toggle classes
    labelEl.click(function(){
        if (searchEl.hasClass("focus")) {
            searchEl.remove(searchEl,"focus");
            labelEl.remove(labelEl,"active");
        } else {
            searchEl.addClass("focus");
            labelEl.addClass("active");
        }
    });

    // this register clicks outside search box, and toggles correct classes
    document.addEventListener("click",function(e){
        var clickedID = e.target.id;
        if (clickedID != "search-terms" && clickedID != "search-label") {
            if (searchEl.has("focus")) {
                searchEl.removeClass("focus");
                labelEl.removeClass("active");
            }
        }
    });
}(window));


var main = function() {

    var searchInput = $("#search-terms");


    function getSearchURL() {
        var BASE_URL = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=20&prop=extracts&exintro&explaintext&exsentences=2&exlimit=max&gsrsearch=";
        return BASE_URL + searchInput.val();
    }

    function makeResultBox(id, title, extract) {
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

    function sendRequest() {
        // forget previous data
        $(".result-box").remove();
        console.log(getSearchURL());
        $.ajax({
            // check for empty string.
            type: "GET",
            url: getSearchURL(),
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "jsonp",
            success: function (data, textStatus, jqXHR) {

                var results = data.query.pages;
                console.log(results);
                $("#results").hide();
                for (var result in results) {   // loop each result and make a box for each
                    var pageID = results[result]["pageid"];
                    var title = results[result]["title"];
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
    }

    // event handlers
    $("#search-terms").keyup(function(event){
        if(event.keyCode == 13){
            console.log("Enter key pressed");
            sendRequest();
        }
    });



};

$(document).ready(main);





