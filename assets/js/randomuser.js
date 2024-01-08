function getRandomUser(gender, nationality, onlyReturn) {
    const userAPI = 'https://randomuser.me/api/?results=1';
    const noInfo = '&noinfo';

    var jqxhr = $.get(userAPI + noInfo)
    .done(function(data) {
      //Loaded Information Successfully
      console.log(data.results);
    })
    .fail(function() {
      console.log("RandomUser:", "Failed.")
    })
    .always(function() {
      console.log("RandomUser:", "Completed.")
    });
}


getRandomUser('male','gb,us');