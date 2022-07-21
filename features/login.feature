@user @login
Feature: login

  Scenario: successfully login
    Given account information with email <email> password <password>
    When successfully login with user account
    Then after login a user should get a response with status code 200 with message 'user loggedin successfully'

    Examples: 
      | email                  | password | message                      |
      | 'newaccount@gmail.com' | '123456' | 'user loggedin successfully' |

  Scenario: user enters incorrect data
    Given account information doest exist with email <email> password <password>
    When when user tries to login with incorrect data
    Then after try to login user account doest exist should get a response with status code 404 with message <message>

    Examples: 
      | email                  | password   | message                                |
      | 'newaccount@gmail.com' | '123456'   | 'The email you entered does not exist' |
      | 'newaccount@gmail.com' | '12345678' | 'Incorrect password'                   |

  Scenario: user enter invalid input
    Given account information with  email  <email>  password <password>
    When try login with user account invalid input
    Then after trying to login with invalid input a user should get a response with status code 412 with message <message>

    Examples: 
      | email               | password | error      | errorOcc                                      |
      | 'student'           | '123456' | 'email'    | 'The email format is invalid.'                |
      | ' '                 | '123456' | 'email'    | 'The email field is required.'                |
      |                   7 | '123456' | 'email'    | 'email must be a string'                      |
      | 'student@gmail.com' | ' '      | 'password' | 'The password field is required.'             |
      | 'student@gmail.com' | '123'    | 'passwo'   | 'The password must be at least 6 characters.' |
      | 'student@gmail.com' |        7 | 'password' | 'password must be a string'                   |
