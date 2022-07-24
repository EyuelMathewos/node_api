@user @login @logininDat
Feature: login

  Scenario: user enters incorrect data
    Given account doest exist with email <email> password <password>
    When when user tries to login with incorrect data
    Then after try to login user account doest exist should get a response with status code 401 with message <message>

    Examples: 
      | email                  | password   | message                                |
      | 'newaccount@gmail.com' | '123456'   | 'The email you entered does not exist' |
      | 'hello@gmail.com'      | '12345678' | 'Incorrect password'                   |
