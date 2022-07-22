@user @reset @invalReset
Feature: change password

  Scenario: user enters an invalid reset link
    Given in valid <resetLink>
    When tries to send an invalid reset link
    Then A response is sent with status of <status> and message of invalid reset link message<message>

    Examples: 
      | resetlink       | status | message                             |
      | www.example.com |    400 | make sure the reset link is correct |
