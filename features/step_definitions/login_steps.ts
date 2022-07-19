import { Given , When, Then }  from '@cucumber/cucumber'
// 1) Scenario: successfully login
Given('account information with email {string} password {string}', function (string, string2) {
    return 'pending';
  });

When('successfully login with user account', function () {

  return 'pending';
});

Then('after login a user should get a response with status code {int} with message {string}', function (int, string) {

  return 'pending';
});
       
// 2) Scenario: user does't exist 
Given('account information doest exist with email {string} password {string}', function (string, string2) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

When('try login with user account doest exist', function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

Then('after try to login user account doest exist should get a response with status code {int} with message {string}', function (int, string) {
// Then('after try to login user account doest exist should get a response with status code {float} with message {string}', function (float, string) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

//  3) Scenario: user enters incorrect input with existing account 
Given('incorrect account information with  email  {string}  password {string}', function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


When('login with user account incorrect email and password', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('after trying to login with incorrect info should get a response with status code {int} with message {string}', function (int, string) {
// Then('after trying to login with incorrect info should get a response with status code {float} with message {string}', function (float, string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

// 4) Scenario: user enter invalid input
Given('account information with  email  {string}  password {string}', function (string, string2) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

When('try login with user account invalid input', function () {
// Write code here that turns the phrase above into concrete actions
    return 'pending';
});
Then('after trying to login with invalid input a user should get a response with status code {int} with message {string}', function (int, string) {
    return 'pending'; 
});