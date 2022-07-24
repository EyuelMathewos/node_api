@user @reset @invalidReset
Feature: change password

Scenario: user enters an invalid password
    Given invalid password <password> confirmation password <confirmpassword> and with link id <resetId>
    When tries to send an invalid password
    Then A response is sent with status of <status> and message of invalid password message <message>

    # given when password is number
    Examples: 
|                resetId                  | password | confirmpassword  | status | message                                                   |
| '99e56316-adf8-41ce-a800-8904abd175d1'  | 'pass'   |     'pass'       |  400   | 'The password must at least 6 characters long'            |
| '99e56316-adf8-41ce-a800-8904abd175d1'  | '123456' |   'diffpasswrd'  |  400   | 'You entered different Password on password confirmation' |
| '99e56316-adf8-41ce-a800-8904abd175d1'  |   ''     |      ''          |  400   | 'The password field is required'                          |
| '99e56316-adf8-41ce-a800-8904abd175d1'  |    7     |        7         |  400   | 'password must be a string'                               |