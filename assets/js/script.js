// Starter JS file for API calls, functionality of site
// Link: https://apidocs.cheapshark.com/
// Link: https://randomuser.me/

    // Define some elements for testing
        const storeList = $('body');
        const storeForm = $('#store-select');
        const storeDeals = $('#store-deals');

    // Default variables needed in fetch
    const baseURL = 'https://www.cheapshark.com'
    const apiStores = baseURL + '/api/1.0/stores';
    const apiDeal = baseURL + '/api/1.0/deals'

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

function getDeals(stores) {
    let searchDeals;
    console.log("Get Deals:", stores)
    if(stores != '') { searchDeals = apiDeal + '?storeID=' + stores; }
    else { searchDeals = apiDeal; }

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
                storeDeals.append('<div name="deal">' + data[key].title + '<br/>' + saleInfo + '</div>');
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


//Page Load function/wait
$(function() {
    //Calls getStores on load for testing display of stores
    getStores();

    storeForm.submit(handleFormDeals);
});