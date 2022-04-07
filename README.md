Welcome to Mine Sweeper Extreme!!

to play on browser:
https://andrewrbader.github.io/sei321-Project-1-BrowserGame/

In this game, the game board is divided into cells. Hidden within these cells are randomly distributed bombs, or mines. 

When a player clicks a cell, one of three choices are possible with respect to the resultant identity of that cell:

1) There is a bomb! You hit a mine with your mouse and the game is over

2) there is a number corresponding to the number of bombs adjacent to the square

3) there is a blank cell, meaning there are no bombs around. In this case the adjacent squares will automatically reveal themselves in all 8 directions (sides and diagonals) up until a square is revealed that has a number identity. This happens in all 8 adjacent directions simultaneously.

For Mine Sweeper Extreme, all mines will have to be flagged to win! A player should use the cell numbers to guide them as a strategy.

A player can choose whether to play against a timer or # of moves

Wire frame of the main page:

Wire frame image main page
![wireFrame_mainPage text](./images/wireframe_main1.png)

Main page wireframe explanation with pseudocode functionality

There are four "states" of the game's main page

State 1) the Welcome State or Home Game State:
    - title header
    - cool vid or gif with a hidden overlayed button that starts the game (changes to State 2)
    - maybe a menu of game options here
        - either timer game play 
        - or # of moves game play
        - or just flag all of the mines game play

State 2) the Active "Start Game" state
    - here you see the un touched cells
    - there is a start timer button
    - there is a reset button that returns the game to its original "start game state"
    - there is a flag button to mark the guessed mines
    - There is a button that returns to the Home Game State (state 1)
    - note the Start Game state = Play game state when player is active

State 3) Win State
    - if a player wins the main page of game converts to a win state
    - Header says "you win!!"
    - there is a cool winner video/graphic/something
    - Reset button remains to reset game to State 2 (active state)
    - Main menu button returns to State 1 (home state)

State 4) Lose State
    - if player loses in State 2, Start Game State (which equals play game state), becomes "Lose State"
    - There is a cool explosion graphic/gif/somthing
    - Header becomes "You Lose! Game Over!"
    - Reset button remains to reset game to State 2 (active state)
    - Main menu button returns to State 1 (home state)


Wire frame of the active gameplay state:

Wire frame image game play
![wireFrame_gamePlay text](./images/wireframe_gameplay.png)

Game Play PseudoCode:
Additional Active Game State Functionality:
    - with have a bombs remaining counter
    - will have a bombs found/diffused counter
    - will have a # of moves/moves left counter
    - note the bombs remaining !== bombs found, need to flag and diffuse for bombs remaining to decrement

Game Play pseudocode within cells:

Three hidden options of clicked cells:

1) the hidden ID of clicked cell is a bomb, end of game
    - return to the lose state (state 4)
    - move count is set back to 0

2) the hidden ID of clicked cell is a number
    - number correlates to number of adjacent bombs
    - move increments
    - game play continues

3) the hidden ID of click cell is blank
    - In this case the adjacent squares will automatically reveal themselves in all 8 directions (sides and diagonals) 
    - loops through revealed squares up until a square is revealed that has a number identity. 
    - This looping/revealing happens in all 8 adjacent directions simultaneously.
    - this logic seems similar to tic tac toe... not sure about this yet


Wire frame of flag and win conditions, continued from active game play state
![wireFrame_flagAndWin text](./images/wireframe_flagAndWin.png)


Flag and win conditions pseudocode:

4) Flag placed ID conditions:
    a. flag is placed on a cell with bomb ID
        - note don't necessarily have to dig (click) first
        - count of bomb # --
        - count of diffused bombs ++
        - move # increments
    b. if flag is placed in wrong spot
        - no diffused count or bomb count change
        - move # still increments

5) Win state:
    - all bombs are flagged (ie diffused)
    - not all cells have to be un hidden first
    - goes to win state (State 3)


Conditions for loss (change to Lose State, State 4):

1) hit a bomb

Additional loss possibilities if certain features chosen

2) run out of moves
3) run out of time




