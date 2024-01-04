//Set key name for games being watched
const watchKey = 'game-deals-watchlist';


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



//jQuery checking that site is loaded
$( function() {
    
    const watchListTxt = readLocalStorage(watchKey);

    $('#watch-list').innerHTML = '';
    watchListTxt.forEach(element => {
        $('#watch-list').append("<p>" + element.id + " - " + element.title + " - " + element.sale + "</p>"); });
    
});