// Starter JS file for API calls, functionality of site
// Link: https://apidocs.cheapshark.com/
// Link: https://randomuser.me/

    // Define some elements for testing
        const storeList = $('body');

function getStores() {
    // https://www.cheapshark.com/api/1.0/stores
    // Returns a full list of store IDs, names, and a flag specifying if store is active.
    // Response also includes an collection of banner / logo / icon image URLs for each store.
    const apiCall = 'https://www.cheapshark.com/api/1.0/stores';
    const baseURL = 'https://www.cheapshark.com'

    var jqxhr = $.get(apiCall, function() {
        console.log("Fetch:", "Success.")
      })
        .done(function(data) {
            console.log("Data:", data);

            //This is where the data is handled
            for(const key in data) { //Loops through each key in data array
                //console.log("Feched:", data[key].storeID + " | " + data[key].storeName)
                let storeIdentification = data[key].storeID + " | " + data[key].storeName
                let storeActive = data[key].isActive;
                let storeBanner = baseURL + data[key].images.banner;
                let storeLogo = baseURL + data[key].images.logo;
                let storeIcon = baseURL + data[key].images.icon;
                let storeImages = storeBanner + " | " + storeLogo + " | " + storeIcon;

                console.log()
                //storeList.append('<p name="store">' + storeIdentification + '<br />' + storeImages + '</p>');
                storeList.append('<p name="store">' + storeIdentification + '</p>' + '<img name="image" src="' + storeBanner + '">');
                
                if(storeActive == 1) { // if active is 1 (true), set class to active for styling
                    $('p[name="store"]').addClass("active");
                }
                
            }
          
        })

        .fail(function() {
          console.log("Fetch Error:", "")
        })
        .always(function() {
          
        });
       
      // Perform other work here
       


      // Set another completion function for the request above
      jqxhr.always(function() {
        console.log("Fetch:", "Completed.")
      });
}


//Page Load function/wait
$(function() {
    //Calls getStores on load for testing display of stores
    getStores();
});


