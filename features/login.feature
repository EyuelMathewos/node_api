@user @login
Feature: login
  Scenario: successfully login
    Given account information with email <email> password <password>
    When  successfully login with user account
    Then  after login a user should get a response with status code 200 with message 'user loggedin successfully'
    
Examples:
     |        email              |   password        |          message                         |
     |   'newaccount@gmail.com'  |   '123456'        |        'user loggedin successfully'      |
     
  Scenario: user does't exist
    Given account information doest exist with email <email> password <password>
    When  try login with user account doest exist
    Then  after try to login user account doest exist should get a response with status code 404 with message "user does't exist"
    
Examples:
     |        email              |   password        |       message                       |
     |   'newaccount@gmail.com'  |   '123456'        |   'user does't exist'               |

  Scenario: user enters incorrect input with existing account
    Given incorrect account information with  email  "<email>"  password "<password>"
    When  login with user account incorrect email and password
    Then  after trying to login with incorrect info should get a response with status code 412 with message <message>
    Examples:
     |        email              |   password            |     message                       |
     |   'newacc@gmail.com'      |   '123456'            |   'email dont match'              |
     |   'newaccount@gmail.com'  |   '12345678'          |   'password incorrect'            |
    

  Scenario: user enter invalid input
    Given account information with  email  <email>  password <password>
    When  try login with user account invalid input
    Then  after trying to login with invalid input a user should get a response with status code 412 with message "user enters invalid input"
    
    Examples:
  |        email        |   password     |    error     |          errorOcc                            |
  | 'student'           |   '123456'     |  'email'     | 'The email format is invalid.'               |
  |       ' '           |   '123456'     |  'email'     | 'The email field is required.'               |     
  | 'student@gmail.com' |   ' '          |  'password'  | 'The password field is required.'            |  
  | 'student@gmail.com' |    '123'       |  'password'  | 'The password must be at least 6 characters.'|  