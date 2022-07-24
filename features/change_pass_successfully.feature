@user @reset @succReset
Feature: change password

  Scenario: password changed successfully
    Given user use <resetLink> and enter password <password> confirmation password <confirmpassword>
    When sends passwording using rest link
    Then A response is sent with status of <status> and message of password changed successfully messag <message>

    Examples: 
      | resetLink                              | password  |  confirmpassword | status | message                              |
      | '99e56316-adf8-41ce-a800-8904abd175d1' | '123456'  |      '123456'    |    200 | 'user password successfully changed' |