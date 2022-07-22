@user @reset @invalidReset
Feature: change password

Scenario: user enters an invalid password
    Given in valid <password>
    When tries to send an invalid password
    Then A response is sent with status of <status> and message of invalid password message "<message>"

    # given when password is number
    Examples: 
      | password | status | message                                      |
      | 'pass'   |    400 | The password must at least 6 characters long |
      |   ' '    |    400 | password field is required                   |
      |        7 |    400 | email must be a string                       |