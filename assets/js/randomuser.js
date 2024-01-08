let whoUser = '';

function getRandomUser(gender, nationality, onlyReturn) {
    const userAPI = 'https://randomuser.me/api/?results=1';
    const noInfo = '&noinfo';
    const userGender = '&gender=' + gender;
    const userNationality = '&nat=' + nationality;
    const userInclude = "&inc=" + onlyReturn;

    var jqxhr = $.get(userAPI + noInfo + userGender + userNationality + userInclude)
    .done(function(data) {
      //Loaded Information Successfully
      console.log("RandomUser:", data.results[0]);
      whoUser = data.results[0];

      writeLocalStorage('game-deals-user', whoUser)
    })
    .fail(function() {
      console.log("RandomUser:", "Failed.")
    })
    .always(function() {
      console.log("RandomUser:", "Completed.")
    });
}

$(document).ready(function() {

    let myUser = readLocalStorage('game-deals-user');
    if(myUser == '') {
        getRandomUser('male','us','login,name,dob,registered,email,picture');
    }

});