// Starter JS file for API calls, functionality of site
// Link: https://apidocs.cheapshark.com/
// Link: https://randomuser.me/

    // Define some elements for testing
        const storeList = $('body');
        const storeForm = $('#store-select');
        const storeDeals = $('#search-results');
        const priceSlider = $('#price-range-slider');
        const priceDisplayMin = $('#price-min');
        const priceDisplayMax = $('#price-max');
        const priceForm = $('#filter-results');

    // Default variables needed in fetch
    const baseURL = 'https://www.cheapshark.com'
    const apiStores = baseURL + '/api/1.0/stores';
    const apiDeal = baseURL + '/api/1.0/deals'
    const apiGame = baseURL + '/api/1.0/games'
    const urlDirect = baseURL + '/redirect?dealID='

    // Variables for project local storage
    const watchKey = 'game-deals-watchlist';

    //Price Range Values
    let priceMin = '0';
    let priceMax = '50';

function getStores() {
    // https://www.cheapshark.com/api/1.0/stores
    // Returns a full list of store IDs, names, and a flag specifying if store is active.
    // Response also includes an collection of banner / logo / icon image URLs for each store.

    var jqxhr = $.get(apiStores, function() {
        console.log("getStores:", "Success.")
      })
        .done(function(data) {
            console.log("Data:", data);

            //This is where the data is handled
            for(const key in data) { //Loops through each key in data array
                //console.log("Feched:", data[key].storeID + " | " + data[key].storeName)
                let storeID = data[key].storeID;
                let storeName = data[key].storeName;
                let storeActive = data[key].isActive;
                // Usage: storeImage.banner, storeImage.icon, storeImage.logo
                let storeImage = data[key].images;

                // storeList.append('<p><a name="store" href="' + apiDeal + "?storeID=" + storeID + '">' +
                // storeName + '</a>' + '<img name="image" src="' + baseURL + storeImage.banner + '"></p>');
                
                let checkBox = '<input type="checkbox" name="store" id="' + storeID + '" value="' + storeID + '" />'
                let label = '<label for="' + storeID + '">' + storeName + '</label>'

                storeForm.append('<div name="form-group">' + checkBox + label + "</div>");

                if(storeActive == 1) { // if active is 1 (true), set class to active for styling
                    $('label[for="' + storeID + '"]').addClass("active");
                }
                
            }
          
        })

        .fail(function() {
          console.log("getStores:", "Failed.")
        })
        .always(function() {
          
        });
       
      // Perform other work here
       


      // Set another completion function for the request above
      jqxhr.always(function() {
        console.log("getStores:", "Completed.")
      });
}

function getPriceDeals(stores, priceLow, priceHigh, title) {
  let searchDeals;
  let paramHandle = "?";

  console.log("Stores:", stores)
  console.log("Range:", priceLow + " - " + priceHigh)

  if(stores != '') { searchDeals = apiDeal + paramHandle + 'storeID=' + stores;}
  else { searchDeals = apiDeal; }

      //Handles changing the paramHandle from ? to &
      if (searchDeals.includes('?')) { paramHandle = "&"; }

  if(priceLow != '') { searchDeals = searchDeals + paramHandle + "lowerPrice=" + priceLow; }
  else { searchDeals = searchDeals; }

      //Handles changing the paramHandle from ? to &
      if (searchDeals.includes('?')) { paramHandle = "&"; }

  if(priceHigh != '') { searchDeals = searchDeals + paramHandle + "upperPrice=" + priceHigh; }
  else { searchDeals = searchDeals; }

  console.log('Getting Deals from:', searchDeals);

  var jqxhr = $.get(searchDeals, function() {
      console.log("getDeals:", "Success.")
    })
      .done(function(data) {
          console.log("Data:", data);

          storeDeals.html('');
          //This is where the data is handled
          for(const key in data) { //Loops through each key in data array
              let salePrice = '<mark>' + data[key].salePrice + '</mark>';
              let normalPrice = '<span class="strike">' + data[key].normalPrice + '</span>';
              let btnPrice = 'data-price="'  + data[key].normalPrice + '" data-sale="' + data[key].salePrice + '"';
              let saleInfo = salePrice + '<sup> ' + normalPrice + '</sup>';
              let btnInfo = 'data-gameID="' + data[key].gameID + '" data-gameTitle="' + data[key].title + '"';
              let saveWatch = '<button class="btn col s2 deep-purple darken-3" name="watch" id="game-' + data[key].gameID + '" ' + btnPrice + " " + btnInfo + '>Wish List</button>';
              let gameMetacritic = data[key].metacriticScore;
              let gameSteamRating = data[key].steamRatingPercent;
              let gameSteamRatingText = data[key].steamRatingText;
              
              storeDeals.append('<div name="deal" class="row"><a class="col s10" href="' + urlDirect + data[key].dealID + '" target="_blank">' + data[key].title + ' | ' + saleInfo + '</a>' + saveWatch + '</div>');
          }
        
      })

      .fail(function() {
        console.log("getDeals:", "Failed.")
      })
      .always(function() {
        
      });
     
    // Perform other work here
     
    // Set another completion function for the request above
    jqxhr.always(function() {
      $('button[name="watch"]').on("click", handleWatch);
      console.log("getDeals:", "Completed.")
    });
}

function handleFormDeals(event) {
    event.preventDefault();

    var values = [];
    $("#store-select :input").each(function() {
       //values[this.id] = $(this).is(":checked");
       if($(this).is(":checked")) {
        values.push($(this).val());
       }
    });

    let strValues = values.toString();
    if(strValues == '') { console.log("nothing selected"); }

    getDeals(strValues);
}

function handleWatch(event) {
    event.preventDefault();
    console.log("Watch List:", event.target.getAttribute("data-gameID") + " | " + event.target.getAttribute("data-gameTitle"));

    //Create object with game information to watch
    let watchThisGame = {
        id: event.target.getAttribute("data-gameID"),
        title: event.target.getAttribute("data-gameTitle"),
        sale: event.target.getAttribute("data-sale"),
        price: event.target.getAttribute("data-price")
    }

    //Write to local storage
    writeLocalStorage(watchKey, watchThisGame);
}

function makeSlider() {
  priceSlider.slider({
      range: true,
      min: 0,
      max: 50,
      values: [0, 50],
      slide: function(event, ui) {
          //Set Deal Price Variables
              priceMin = ui.values[0];
              priceMax = ui.values[1];
          //Handle displaying values
          priceDisplayMin.text("$" + ui.values[0]);
          if(ui.values[1] == 50) { priceDisplayMax.text("$" + ui.values[1] + "+"); }
              else { priceDisplayMax.text("$" + ui.values[1]); }
      }
    });
        priceDisplayMin.text("$" + priceSlider.slider("values", 0))
        if(priceSlider.slider("values", 1) == 50) { priceDisplayMax.text("$" + priceSlider.slider("values", 1) + "+");
         } else { priceDisplayMax.text("$" + priceSlider.slider("values", 1)); }
}

function handlePriceRangeForm(event) {
  event.preventDefault();
  console.log("Submitted Form.")
  getPriceDeals('', priceMin, priceMax);
}

function createWishList() {
  const watchListTxt = readLocalStorage(watchKey);

  $('#watch-list-content').empty();
  watchListTxt.forEach(element => {
      $('#watch-list-content').append("<p>" + element.id + " - " + element.title + " - " + element.sale + "</p>"); });
}

//Page Load function/wait
$(document).ready(function() {
    //Calls getStores on load for testing display of stores
    //getStores();
    makeSlider();

    storeForm.submit(handleFormDeals);
    priceForm.submit(handlePriceRangeForm);

  
  //Materialize Sidenav Navigation
  $('.sidenav').sidenav();
  
  //Modal Information
      document.addEventListener('DOMContentLoaded', function() {
          var elems = document.querySelectorAll('.modal');
          var instances = M.Modal.init(elems, options);
      });
  // Modal Control
  $('.modal').modal();
});