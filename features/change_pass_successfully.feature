@user @reset @succReset
Feature: change password

  Scenario: password changed successfully
    Given user enters <resetLink> and <password>
    When sends <resetLink> and <password>
    Then A response is sent with status of <status> and message of password changed successfully messag<message>

    Examples: 
      | resetLink       | password | status | message                       |
      | www.example.com | pass1234 |    200 | password changed successfully |