Feature: Reset password

  Scenario: Reset password confirmed
    Given user enters an <emailaddress>
    When tries to reset the password
    Then A response is sent with status of <status> and message of successfully sent reset message<message>

    Examples: 
      | emailaddress   | status | message                                        |
      | fegh@gmail.com |    200 | password reset link sent to your email account |

  Scenario: account to reset does not exist
    Given user enters an <emailaddress> that does not exist
    When user tries to reset the password with an email address that does not exist
    Then A response is sent with status of <status> and message of invaid email account message<message>

    Examples: 
      | emailaddress   | status | message                              |
      | fegh@gmail.com |    400 | user with given email does not exist |

  Scenario: user enters an invalid email address
    Given in valid <emailaddress>
    When sends an invalid email
    Then A response is sent with status of <status> and message of invaid email message<message>

    Examples: 
      | emailaddress  | status | message                     |
      | feghgmail.com |    400 | the email format is invalid |
      |               |    400 | the email field is required |
      |             7 |    400 | email must be a string      |

  Scenario: reset email not sent
    Given email address <emailaddress>
    When tries to sent a reset email
    Then A response is sent with status of <status> and message of email not sent message<message>

    Examples: 
      | emailaddress   | status | message                              |
      | fegh@gmail.com |    400 | user with given email does not exist |

  Scenario: Admin reset password
    Given admin enters an <emailaddress>
    When admin sends email reset
    Then <message> is sent to email address with status <status>

    Examples: 
      | emailaddress   | status | message                                   |
      | fegh@gmail.com |    200 | email is sent to "fegh@gmail.com" address |
