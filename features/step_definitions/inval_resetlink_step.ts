import { Given, When, Then } from '@cucumber/cucumber';
import supertest from "supertest";
import { assertThat } from 'hamjest';
const userapi = require("../../src/app");
const request = supertest(userapi);
let resetId: string, data: object, statusCode: number, message: string;
Given('invalid reset link {string}', function (id) {
    resetId = id;
    data = {
        password: "",
        confirmpassword: ""
    }
});


When('tries to send an invalid reset link', async function () {
    const res = await request.post(`/api/v1/user/reset/${resetId}`).send(data);
    console.log(res.body);
    message = res.body.message
    statusCode = res.status;
});

Then('A response is sent with status of {int} and message of invalid reset link message {string}', function (expectedCode, expectedMessage) {
    assertThat(statusCode, expectedCode);
    assertThat(message, expectedMessage);
});