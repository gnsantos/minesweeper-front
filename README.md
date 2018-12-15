# minesweeper-front

Repository to hold the front end for a simple Minesweeper game played on the cloud.

The game can be played [here](http://fathomless-river-62164.herokuapp.com/).

The code containing the backend for the game is at [this repo.](https://github.com/gnsantos/minesweeper-scala-api)

This front was written in simple JavaScript, HTML and CSS, using jQuery. It uses Ajax for requests.

The reason there are PHP project files is because Heroku does not allow the deployment of a simple static HTML page, so a PHP wrapper had to be implemented.

The file `tableSetup.js` contains both the logic to communicate with the backend API and to display the results retured.
