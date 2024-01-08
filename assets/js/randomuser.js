let whoUser = '';
const userAreaImage = $('#random-user-image');
const userAreaInfo = $('#random-user-info');
const userAreaHeading = $('#random-user-heading');

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

function checkUser() {
  let myUser = readLocalStorage('game-deals-user');
    if(myUser == '') {
        getRandomUser('male','us','login,name,dob,registered,email,picture');
    }
    myUser = readLocalStorage('game-deals-user');
  return myUser;
}

$(document).ready(function() {
    
  let loginUser = checkUser();
  console.log(loginUser);
  userAreaImage.append('<img src="' + loginUser[0].picture.large + '" class="rounded">')
  userAreaInfo.append('<div>Name: ' + loginUser[0].name.first + " " + loginUser[0].name.last + '</div>');
  userAreaHeading.append('Welcome, ' + loginUser[0].login.username + '</p>');
  userAreaInfo.append('<div>Email: ' + loginUser[0].email + '</div>');
  userAreaInfo.append('<div>Registered Date: ' + loginUser[0].registered.date + '</div>')

});