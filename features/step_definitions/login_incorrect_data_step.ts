import { Given , When, Then }  from '@cucumber/cucumber';
import supertest from "supertest";
import { assertThat } from 'hamjest';
const userapi = require("../../src/app");
const request = supertest(userapi);
let data: object, statusCode: number, message: string ;
Given('account doest exist with email {string} password {string}', function (username, password) {
    data = {
        username,
        password
      };
      return data;
});

When('when user tries to login with incorrect data', async function () {
    const res = await request.post("/api/v1/user/login").send(data);
    console.log(res.body);
    message = res.body.message
    statusCode = res.status;
});

Then('after try to login user account doest exist should get a response with status code {int} with message {string}', function (expectedCode, expectedMessage) {
    assertThat(statusCode, expectedCode);
    assertThat(message, expectedMessage);
});