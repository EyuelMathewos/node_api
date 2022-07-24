import { Given , When, Then }  from '@cucumber/cucumber';
import supertest from "supertest";
import { assertThat } from 'hamjest';

const userapi = require("../../src/app");
const request = supertest(userapi);
let data: object, statusCode: number, message: string ;
Given('account information with  email  {string}  password {string}', function (username, password) {
    data = {
        username,
        password
      };
      return data;
});
// email as a number
Given('account information with  email  {int}  password {string}', function (username, password) {
    data = {
        username,
        password
      };
      return data;
});
//password as a number
Given('account information with  email  {string}  password {int}', function (username, password) {
    data = {
        username,
        password
      };
      return data;
});
When('try login with user account invalid input', async function () {
    const res = await request.post("/api/v1/user/login").send(data);
    console.log(res.body);
    message = res.body.message;
    statusCode = res.status;
});

Then('after trying to login with invalid input a user should get a response with status code {int} with message {string}', function (expectedCode, expectedMessage) {
    assertThat(statusCode, expectedCode);
    assertThat(message, expectedMessage);
});
