//jQuery Selectors
const priceSlider = $('#price-range-slider')
const priceDisplayMin = $('#price-min');
const priceDisplayMax = $('#price-max');
const priceForm = $('#filter-results-form');
const storeDeals = $('#display-results');

//API Calls
const baseURL = 'https://www.cheapshark.com'
const apiDeal = baseURL + '/api/1.0/deals'

//Price Range Values
let priceMin = '0';
let priceMax = '50';

// Same function used in script.js to get deals from the store list
// Adding more passed variables for priceLow and priceHigh in range
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
                let salePrice = '<mark>' + data[key].salePrice + '</mark>'
                let normalPrice = '<span class="strike">' + data[key].normalPrice + '</span>'
                let saleInfo = normalPrice + " is now " + salePrice;
                let btnPrice = 'data-price="'  + data[key].normalPrice + '" data-sale="' + data[key].salePrice + '"' ;
                let btnInfo = 'data-gameID="' + data[key].gameID + '" data-gameTitle="' + data[key].title + '"';
                let saveWatch = '<button name="watch" id="game-' + data[key].gameID + '" ' + btnPrice + " " + btnInfo + '>Watch</button>';
                storeDeals.append('<p name="deal">' + data[key].title + '<br/>' + saleInfo + '<br/>' + saveWatch + '</p>');
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

// jQuery min-max slider
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


//Handle waiting for page load
$( function() {
    
    makeSlider();
    priceForm.on("submit", handlePriceRangeForm);

});