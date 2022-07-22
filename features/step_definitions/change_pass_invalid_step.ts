import {
  Given,
  When,
  Then
} from '@cucumber/cucumber';



Given('in valid {string}', function (string) {
  return 'pending';
});
// given when password is number
Given('in valid {int}', function (int) {
  return 'pending';
});

When('tries to send an invalid password', function () {
  return 'pending';
});

Then('A response is sent with status of {int} and message of invalid password message {string}', function (int, string) {
  return 'pending';
});