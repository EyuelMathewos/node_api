@user @login @loginincorr
Feature: login

  Scenario: user enter invalid input
    Given account information with  email  <email>  password <password>
    When try login with user account invalid input
    Then after trying to login with invalid input a user should get a response with status code 412 with message <message>
   
    
    # Given email as a number & Given password as a number
    Examples: 
      | email               | password | error      | errorOcc                                      |
      | 'student'           | '123456' | 'email'    | 'The email format is invalid.'                |
      | ' '                 | '123456' | 'email'    | 'The email field is required.'                |
      |                   7 | '123456' | 'email'    | 'email must be a string'                      |
      | 'student@gmail.com' | ' '      | 'password' | 'The password field is required.'             |
      | 'student@gmail.com' | '123'    | 'passwo'   | 'The password must be at least 6 characters.' |
      | 'student@gmail.com' |        7 | 'password' | 'password must be a string'                   |

 