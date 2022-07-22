Feature: change password

  Scenario: password changed successfully
    Given user enters <resetLink> and <password>
    When sends <resetLink> and <password>
    Then A response is sent with status of <status> and message of password changed successfully messag<message>

    Examples: 
      | resetLink       | password | status | message                       |
      | www.example.com | pass1234 |    200 | password changed successfully |

  Scenario: user enters an invalid password
    Given in valid <password>
    When tries to send an invalid password
    Then A response is sent with status of <status> and message of invalid password message<message>

    Examples: 
      | password | status | message                                      |
      | pass     |    400 | The password must at least 6 characters long |
      |          |    400 | password field is required                   |
      |        7 |    400 | email must be a string                       |

  Scenario: user enters an invalid reset link
    Given in valid <resetLink>
    When tries to send an invalid reset link
    Then A response is sent with status of <status> and message of invalid reset link message<message>

    Examples: 
      | resetlink       | status | message                             |
      | www.example.com |    400 | make sure the reset link is correct |
