@user @login @loginsucc
Feature: login

  Scenario: successfully login
    Given account information with email <email> password <password>
    When successfully login with user account
    Then after login a user should get a response with status code 200 with message 'user loggedin successfully'

    Examples: 
      | email                  | password | message                      |
      | 'newaccount@gmail.com' | '123456' | 'user loggedin successfully' |