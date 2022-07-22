import { Given, When, Then } from '@cucumber/cucumber';

Given('account information with  email  {string}  password {string}', function (string, string2) {

    return 'pending';
});
// email as a number
Given('account information with  email  {int}  password {string}', function (int, string) {

    return 'pending';
});
//password as a number
Given('account information with  email  {string}  password {int}', function (string, int) {

    return 'pending';
});
When('try login with user account invalid input', function () {
    return 'pending';
});

Then('after trying to login with invalid input a user should get a response with status code {int} with message <message>', function (int) {
    // Then('after trying to login with invalid input a user should get a response with status code {float} with message <message>', function (float) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});