@register
Feature: create user accounts

  Scenario: A user account succefully created
    Given a user provides firstname <firstname> lastname <lastname> email <email> password <password> and social medias accounts <social>
    When user registers for an account
    Then A response is sent with status of <status> and message of <message>

    Examples: 
      | firstname | lastname  | email            | passowrd | social                | status | message                     |
      | 'yehone'  | 'created' | "hfjd@email.com" | password | '{"facebook": "acc"}' |    201 | "User created successfully" |

  Scenario: a user entering already existing data
    Given a user enters firstname <firstname>, lastname <lastname> ,email <email> and social medios accounts <social>
    When registers using existing data
    Then A response is sent with <status> and message of <message>

    Examples: 
      | firstname | lastname  | email            | password | social                | status | message               |
      | 'yehone'  | 'created' | "hfjd@email.com" | password | '{"facebook": "acc"}' |    409 | "User already exists" |

  Scenario: a user entering invalid data
    Given a user enters firstname <firstname>, lastname <lastname> ,email <email> password <password> and social medios accounts <social>
    When a user registers using invalid data
    Then A response is sent with <status> and message of <message>

    Examples: 
      | firstname   | lastname   | email           | password   | social social | status | message                                      |
      | 'firstname' | 'lastname' | ""              | "password" | " "           |    422 | "email cannot be an empty field"             |
      | 'firstname' | 'lastname' |               7 | "password" | " "           |    422 | "email must be a string"                     |
      | 'firstname' | 'lastname' | "email"         | "password" | " "           |    422 | "must enter valid email"                     |
      |          78 | 'Dexe'     | "mon@email.com" | "password" | " "           |    422 | "first name must be a string"                |
      | ""          | 'babe'     | "mon@email.com" | "password" | " "           |    422 | "firstname cannot be an empty field"         |
      | "test"      | 'babe'     | "mon@email.com" | "password" | " "           |    422 | "firstname must be longer than 4 characters" |
      | "Dexe"      |         56 | "mon@email.com" | "password" | " "           |    422 | "last name must be a string"                 |
      | "Dexe"      | ''         | "mon@email.com" | "password" | " "           |    422 | "last name cannot be an empty field"         |
      | "test"      | 'lat'      | "mon@email.com" | "password" | " "           |    422 | "last name must be longer than 4 characters" |
      | "test       | 'Dexe'     | "mon@email.com" |         67 | " "           |    422 | "password must be a string"                  |
      | "rewq"      | 'babe'     | "mon@email.com" | ""         | " "           |    422 | "password cannot be an empty field"          |
      | "test"      | 'babe'     | "mon@email.com" | pass       | " "           |    422 | "password must be longer than 6 characters"  |
