import { Given , When, Then }  from '@cucumber/cucumber'

 Given('a user provides firstname {string} lastname {string} email {string} password  and social medias accounts {string}', function (string, string2, string3, string4) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  When('user registers for an account', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('A response is sent with status of {int} and message of {string}', function (int, string) {
  // Then('A response is sent with status of {float} and message of {string}', function (float, string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  
///----------------Scenario: a user entering already existing data 
 Given('a user enters firstname {string}, lastname {string} ,email {string} and social medios accounts {string}', function (string, string2, string3, string4) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

 When('registers using existing data', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

Then('A response is sent with {int} and message of {string}', function (int, string) {
         // Then('A response is sent with {float} and message of {string}', function (float, string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

//------------------Scenario: a user entering invalid data


Given('a user enters firstname {string}, lastname {string} ,email {string} password pass and social medios accounts {string}', function (string, string2, string3, string4) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  When('a user registers using invalid data', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('A response is sent with {int} and message of {string}', function (int, string) {
  // Then('A response is sent with {float} and message of {string}', function (float, string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });



