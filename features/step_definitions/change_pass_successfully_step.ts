import { Given , When, Then }  from '@cucumber/cucumber';
import supertest from "supertest";
import { assertThat } from 'hamjest';
const userapi = require("../../src/app");
const request = supertest(userapi);
let resetId: string, data: any, password: string, statusCode: number, message: string ;

Given('user use {string} and enter password {string} confirmation password {string}', function (id, password, confirmpassword) {
    resetId = id;
    data = {
      password,
      confirmpassword
    };
  });


When('sends passwording using rest link', async function () {
    const res = await request.post(`/api/v1/user/reset/${resetId}`).send(data);
    console.log(res.body);
    message = res.body.message
    statusCode = res.status;
    
});

Then('A response is sent with status of {int} and message of password changed successfully messag {string}', function (expectedCode, expectedMessage) {
    assertThat(statusCode, expectedCode);
    assertThat(message, expectedMessage);
});