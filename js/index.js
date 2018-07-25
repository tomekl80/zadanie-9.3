'use strict'

// Podpinam główne zmienne
var output = document.getElementById('output'); // Przypinam miejsce pokazywania wyniku
var viewResults = document.getElementById('result'); // Przypinam miejsce do pokazywania ilości wygranych
var outputNewGame = document.getElementById('outputNewGame');
var playerWins = 0;
var computerWins = 0;
var maxRounds = 0;
var completeRounds = 0;

// Podpinam przyciski
var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissor = document.getElementById('scissors');
var buttonNewGame = document.getElementById('newGame');

// Pętla i przypisana funkcja dla wszystkich guzików jednocześnie
var btnPlayerMove = document.querySelectorAll('player-move');

for (var i = 0; i < btnPlayerMove.length; i++) {
  btnPlayerMove[i].addEventListener('click', playerMove() {
    document.playerMove.getAttribute('data-move');
  };
}

buttonNewGame.addEventListener('click', function() {
  // var outputNewGame = document.getElementById('outputNewGame');
  output.innerHTML = '';
  viewResults.innerHTML = '';
  maxRounds = window.prompt('Podaj liczbę partii do rozegrania');
  outputNewGame.innerHTML = 'Masz ' + maxRounds + ' rund do rozegrania. Powodzenia!';
  completeRounds = 0;
  playerWins = 0;
  computerWins = 0;
  buttonPaper.removeAttribute('disabled');
  buttonRock.removeAttribute('disabled');
  buttonScissor.removeAttribute('disabled');
  
  if (maxRounds === null || maxRounds === '') {
    outputNewGame.innerHTML = 'Podaj liczbę!';
  }
  else if (isNaN(maxRounds)) {
    outputNewGame.innerHTML = 'To nie jest właściwa forma podania liczby!';
  }
  else if (maxRounds == completeRounds) {
    buttonPaper.removeAttribute('disabled');
    buttonRock.removeAttribute('disabled');
    buttonScissor.removeAttribute('disabled');
  }
})

// Funkcja losowania liczby przez komputer między 1 a 3
var getComputerMove = function() {
  var posibleMoves = ['paper', 'rock', 'scissors'];
  return posibleMoves[Math.floor(Math.random() * posibleMoves.length)];
};

// Funkcja wyświetlająca wynik
var displayResults = function(winnerIs, playerMove, computerMove) {
  if (winnerIs === 'none') {
		output.innerHTML = 'Remis!<br>' + output.innerHTML;
	} 
  
  else if (winnerIs === 'player') {
		output.innerHTML = 'Wygrałeś! Zagrałeś ' + playerMove + ' a komputer zagrał ' + computerMove + '<br>' + output.innerHTML;
		playerWins++;
    completeRounds++;
	} 
  
  else {
		output.innerHTML = 'Przegrałeś! Zagrałeś ' + playerMove + ' a komputer zagrał ' + computerMove + '<br>';
		computerWins++;
    completeRounds++;
	}
  
	viewResults.innerHTML = playerWins + ' : ' + computerWins + '<br>';
  
//   Wyświetlanie wyniku końcowego
  if (maxRounds == completeRounds) {
    viewResults.insertAdjacentHTML('beforeend', 'Gra została zakończona! Naciśnij przycisk "Nowa Gra", aby rozpocząć nową rozgrywkę.<br>');
    buttonPaper.setAttribute('disabled', true);
    buttonRock.setAttribute('disabled', true);
    buttonScissor.setAttribute('disabled', true);
    outputNewGame.innerHTML = '';
  }
  else if (playerWins === completeRounds) {
    viewResults.insertAdjacentHTML('beforeend', 'Gratulacje! Wygrałeś tę rundę!<br>');
  }
  else if (computerWins === completeRounds) {
    viewResults.insertAdjacentHTML('beforeend', 'Przykro mi, ale przegrałeś<br>');
  }

};

// Funkcja wyliczająca ruchy gracza
var playerMove = function(playerMove) {
  var computerMove = getComputerMove();
  var winnerIs = 'player';
  if (computerMove === 'scissors' && playerMove === 'paper' ||
      computerMove === 'rock' && playerMove === 'scissors' ||
      computerMove === 'paper' && playerMove === 'rock') {
    winnerIs = "computer";
  }
  else if (computerMove === playerMove) {
    winnerIs = 'none';
  }
  // displayResults('Rundę wygrywa ' + winnerIs + '<br>');
  displayResults(winnerIs, playerMove, computerMove);
}