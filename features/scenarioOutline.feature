Feature: User Login Portal

  Scenario Outline: Verify login attempts with multiple credential sets using scenario outline
    Given the user navigates to login page
    When the user enters username "<username>" and password "<password>" and clicks login button
    Then validate login result based on message "<message>"

    Examples: 

      | username                   | password | message                                                                                        |
      | pavanoltraining@gmail.com   | test@123 | My Account                                                                                     |
      | 4324                       | pppp     | Warning: No match for E-Mail Address and/or Password.                                          |
      | 4324                       | pppp     | Warning: No match for E-Mail Address and/or Password.                                          |
      | 4324                       | pppp     | Warning: No match for E-Mail Address and/or Password.                                          |
      | n.shravankarthik@gmail.com | pp       | Warning: No match for E-Mail Address and/or Password.                                          |
