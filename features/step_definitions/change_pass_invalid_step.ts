import { Given , When, Then }  from '@cucumber/cucumber';
import supertest from "supertest";
import { assertThat } from 'hamjest';
const userapi = require("../../src/app");
const request = supertest(userapi);
let data: any, resetId: string, statusCode: number, message: string ;

Given('invalid password {string} confirmation password {string} and with link id {string}', function (password, confirmpassword, id) {
  resetId = id;
  data = {
    password,
    confirmpassword
  };
});
// given when password is number
Given('invalid password {int} confirmation password {int} and with link id {string}', function (password, confirmpassword, id) {
  resetId = id;
  data = {
    password,
    confirmpassword
  };
});

When('tries to send an invalid password', async function () {
  const res = await request.post(`/api/v1/user/reset/${resetId}`).send(data);
  console.log(res.body);
  message = res.body.message
  statusCode = res.status;
});

Then('A response is sent with status of {int} and message of invalid password message {string}', function (expectedCode, expectedMessage) {
  assertThat(statusCode, expectedCode);
  assertThat(message, expectedMessage);
});