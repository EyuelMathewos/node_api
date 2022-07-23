@user @login @loginsucc
Feature: login

  Scenario: successfully login
    Given account information with email <email> password <password>
    When successfully login with user account
    Then after login a user should get a response with status code <code> with message <message>

    Examples: 
      | email                  | password|     code    | message                       |
      | 'hello@gmail.com'      | '123456'|      200    | 'user logged in successfully' |