# Battleships
## Setup
Run rails server and enjoy the game under `http://localhost:3000` (default).

## Rules
1. Only two players are allowed in-game.
2. The placement of ships is randomly generated.
3. As long as you hit enemy ships it's your turn.
4. If you miss, it's opponent's turn.
5. You will be notified when the ship sunk.
6. Game is done when you sunk all opponent's ships or opponent sunk yours.

## Page elements
1. Light blue bar displaying game information
2. 'Copy url' button - copies current game's url.
3. 'New game' button - creates a new game.
4. 'Statistics' button - points to a page with statistics about the current game.
5. Current player's board with statistics.
6. Opponent's board with statistics.

## Gameplay
1. To start a game, you need to open a web page with a game.
2. Game is created and the player's ships are automatically generated on board.
3. To make the first move, you need to wait for the opponent to join the game. To test it locally you can join the game from another browser.
4. Click 'Copy url' and pass copied url to the opponent you want to play with.
5. You will be notified when the opponent connects to the game and the game begins.
6. The first player is starting the game.
7. All moves are remembered, so knowing the game address you can re-join at any time.

# Statistics

The game statistics page contains information about players' moves, like:
- a number of hits on ships, 
- a number of no hits on ships, 
- a number of sunken ships.

# Zadanie (TODO: remove)
Zadanie ma pokazać przede wszystkim Pana wiedzę z zakresu web dev'u i umiejętności architektoniczne.
Wymagania minimalne: 
1) Jeden z graczy ma móc utworzyć pokój, do którego wyśle link innemu graczowi. 
2) Tylko gracz z linkiem ma mieć możliwość dołączenia do pokoju. 
3) Rozgrywka ma przebiegać według podstawowych zasad tej gry: “trafiłem, więc strzelam dalej, jeśli nie trafiłem to rozpoczynamy turę przeciwnika”. 
4) Wyniki mają być zapisywane i publikowane pod linkiem.
