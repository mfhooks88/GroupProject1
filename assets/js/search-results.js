const resultsArea = $('#title-results');

$(function(){
    //Wait for page elements to load & check location bar
    getSearchResults();

});


function getSearchResults() {
    let userSearch = document.location.search;
    console.log("Title:", userSearch);

    let userTitle = userSearch.split('=')[1];
    console.log("Title:", userTitle);

    let apiLookup = apiDeal + "?title=" + userTitle + "&pageSize=30";

    if(userSearch.includes('store')) { 
        apiLookup = apiDeal + "?storeID=" + userTitle + "&pageSize=30";
    }
    
    resultsArea.html('');
    resultsArea.append('<p>You searched for: ' + userTitle + '</p>');

    console.log(apiLookup)

    var jqxhr = $.get(apiLookup, function() {
        console.log("Title:", "Success.")
      })
        .done(function(data) {
            console.log("Data:", data);

            for(const key in data) { //Loops through each key in data array
                let salePrice = '<mark>' + data[key].salePrice + '</mark>';
                let normalPrice = '<span class="strike">' + data[key].normalPrice + '</span>';
                let btnPrice = 'data-price="'  + data[key].normalPrice + '" data-sale="' + data[key].salePrice + '"';
                let saleInfo = salePrice + '<sup> ' + normalPrice + '</sup>';
                let btnInfo = 'data-gameID="' + data[key].gameID + '" data-gameTitle="' + data[key].title + '"';
                let saveWatch = '<button class="btn col s2 deep-purple accent-3 flow-text" name="watch" id="game-' + data[key].gameID + '" ' + btnPrice + " " + btnInfo + '>+ Wish</button>';
                let gameMetacritic = data[key].metacriticScore;
                let gameSteamRating = data[key].steamRatingPercent;
                let gameSteamRatingText = data[key].steamRatingText;
                let storeIcon = baseURL + '/img/stores/icons/' + (data[key].storeID - 1) + '.png';
  
                resultsArea.append('<div name="deal" class="row valign-wrapper"><img src="' + storeIcon + '" style="padding-left: .3rem;"><a class="col s10 deep-purple-text text-darken-4" href="' + urlDirect + data[key].dealID + '" target="_blank">' + data[key].title + ' ' + saleInfo + '</a>' + saveWatch + '</div>');
            }
          
        })

        .fail(function() {
          console.log("Title:", "Failed.")
        })
        .always(function() {
            $('button[name="watch"]').on("click", handleWatch);
            console.log("Title:", "Completed.")
        });
}