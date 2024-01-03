// Starter JS file for API calls, functionality of site
// Link: https://apidocs.cheapshark.com/
// Link: https://randomuser.me/

    // Define some elements for testing
        const storeList = $('body');

function getStores() {
    // https://www.cheapshark.com/api/1.0/stores
    // Returns a full list of store IDs, names, and a flag specifying if store is active.
    // Response also includes an collection of banner / logo / icon image URLs for each store.

    // Default variables needed in fetch
    const baseURL = 'https://www.cheapshark.com'
    const apiCall = baseURL + '/api/1.0/stores';
    const apiDeals = baseURL + '/api/1.0/deals'
    
    var jqxhr = $.get(apiCall, function() {
        console.log("Fetch:", "Success.")
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

                console.log()
                storeList.append('<p><a name="store" href="' + apiDeals + "?storeID=" + storeID + '">' +
                storeName + '</a>' + '<img name="image" src="' + baseURL + storeImage.banner + '"></p>');
                
                if(storeActive == 1) { // if active is 1 (true), set class to active for styling
                    $('a[name="store"]').addClass("active");
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


