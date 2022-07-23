@user @login @loginincorr
Feature: login

  Scenario: user enter invalid input
    Given account information with  email  <email>  password <password>
    When try login with user account invalid input
    Then after trying to login with invalid input a user should get a response with status code 401 with message <message>
   
    
    # Given email as a number & Given password as a number
    Examples: 
      | email               | password | error      | message                                         |
      | 'student'           | '123456' | 'email'    | 'the email format is invalid'                   |
      | ' '                 | '123456' | 'email'    | 'the email format is invalid'                   |
      |                   7 | '123456' | 'email'    | 'email must be a string'                        |
      | 'student@gmail.com' | ' '      | 'password' | 'The password must at least 6 characters long'  |
      | 'student@gmail.com' | '123'    | 'passwo'   | 'The password must at least 6 characters long'  |
      | 'student@gmail.com' |        7 | 'password' | 'password must be a string'                     |

 