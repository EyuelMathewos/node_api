@user @reset @invalidReset
Feature: change password

Scenario: user enters an invalid password
    Given invalid password <password> confirmation password <confirmpassword> and with link id <resetId>
    When tries to send an invalid password
    Then A response is sent with status of <status> and message of invalid password message <message>

    # given when password is number
    Examples: 
|                resetId                  | password | confirmpassword  | status | message                                                   |
| '31c1540e-02bf-4b90-ac9e-fa5bea17cc11'  | 'pass'   |     'pass'       |  400   | 'The password must at least 6 characters long'            |
| '31c1540e-02bf-4b90-ac9e-fa5bea17cc11'  | '123456' |   'diffpasswrd'  |  400   | 'you entered different password on confirmation password' |
| '31c1540e-02bf-4b90-ac9e-fa5bea17cc11'  |   ' '    |      ' '         |  400   | 'password field is required'                              |
| '31c1540e-02bf-4b90-ac9e-fa5bea17cc11'  |    7     |        7         |  400   | 'email must be a string'                                  |