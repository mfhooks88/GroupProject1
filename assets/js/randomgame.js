


// defined elements
const baseURL2 = 'https://www.cheapshark.com';
const randomGame = baseURL2 + '/api/1.0/games?id=';
const gameId = [612, 128, 129, 130, 131, 163, 133, 134, 135, 136, 137, 38, 39, 
40, 141, 149, 143, 144, 146, 147, 43, 33][Math.floor(Math.random() * 20)];
const url = randomGame + gameId;
function log() {
    console.log(url)
}
console.log(url) 

//defines function
function doFunction() {
    console.log(url);
}


//- Using a function pointer:
document.getElementById("clickMe").onclick = doFunction;

//- Using an anonymous function:
document.getElementById("clickMe").onclick = function () { alert(url); };

// event handler
const el = document.getElementById("clickMe");
if (el.addEventListener)
    el.addEventListener("click", doFunction, false);
else if (el.attachEvent)
    el.attachEvent('onclick', doFunction);


//<input id="clickMe" type="button" value="clickme" onclick="doFunction();">
// ^ html code for randomgame.js button

