@user @reset @invalReset
Feature: change password

  Scenario: user enters an invalid reset link
    Given invalid reset link <resetLink>
    When tries to send an invalid reset link
    Then A response is sent with status of <status> and message of invalid reset link message <message>

    Examples: 
      | resetLink                              | status    | message                               |
      | 'UNKNOW6fd-fe6b-484c-895a-2602e7589da6'|       400 | 'make sure the reset link is correct' |