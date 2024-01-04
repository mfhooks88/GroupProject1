//Read & Write Local Storage functions that I previously wrote
        //	Usage of functions
        
        //	Create projectName variable for the object key
        //	const projectName = 'weather-forcast-api';
        
        // 	Create the object to store
        // 	searchWrite = { city: search }; 
        
        //	call writeLocalStorage
        //	writeLocalStorage(projectName, searchWrite);
        
        //	call readLocalStorage -- returns an object/array from local data
        //	let localData = readLocalStorage(projectName)

function readLocalStorage(key) {
    //Function to read the local storage with passed object name
    let tempStorage = JSON.parse(localStorage.getItem(key));
    //Debug testing for if it's an object/array
    console.log("readLocalStorage | Not an Object: " + !tempStorage);

    if(!tempStorage) { tempStorage = []; localStorage.setItem(key, JSON.stringify(tempStorage)); } 
    console.log("readLocalStorage | " + JSON.stringify(tempStorage));
    //Function returns the local storage object
    return tempStorage;
}

function writeLocalStorage(key, toStoreAsObject) {
    //Function to write to LocalStorage
    var currObject = readLocalStorage(key);

    if(typeof toStoreAsObject !== 'object') { console.log("writeLocalStorage: Invalid type submitted."); return }
    currObject.push(toStoreAsObject)

    console.log('writeLocalStorage | ' + toStoreAsObject);
    console.log('writeLocalStorage | ' + JSON.stringify(toStoreAsObject));

    localStorage.setItem(key, JSON.stringify(currObject))
}