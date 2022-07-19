@register

Feature: create user accounts

    Scenario:  A user account succefully created
    Given a user provides firstname <firstname> lastname <lastname> email <email> password <password> and social medias accounts <social>
    When user registers for an account
    Then A response is sent with status of <status> and message of <message>
   Examples: 
    | firstname   | lastname |      email      | social      | status   | message  | password |
    |'yehone'     |'created' | "hfjd@email.com"|   '{"facebook": "acc"}' | 201      | "User created" | |

Scenario:  a user entering already existing data
    Given a user enters firstname <firstname>, lastname <lastname> ,email <email> and social medios accounts <social>
      When registers using existing data 
      Then A response is sent with <status> and message of <message>
      Examples: 
      | firstname   | lastname |     email       |        social           | status   | message  |
      |'yehone'     |'created' | "hfjd@email.com"|   '{"facebook": "acc"}' | 409      | "User already exists" |


Scenario: a user entering invalid data
    Given a user enters firstname <firstname>, lastname <lastname> ,email <email> password <password> and social medios accounts <social>
      When a user registers using invalid data
      Then A response is sent with <status> and message of <message>
    Examples: 
    | firstname | lastname |      email      | social      | status   | message  | password |
    |'firstname'|'lastname'| ""              |     " "     | 422      | "email cannot be an empty field" |pass| 
    | 'Dex'     | 67       | "mon@email.com" |    " "      | 422      | "input needs to be string only"||
    |           | 'babe'   | "mon@email.com" |    " "      | 422      | "firstname cannot be an empty field" ||
