'use strict'

// Podpinam przyciski
var buttonPaper = document.getElementById('paper');
var buttonRock = document.getElementById('rock');
var buttonScissor = document.getElementById('scissors');
var buttonNewGame = document.getElementById('newGame');

// Tworzenie zmiennej "params" dla zmiennych globalnych
var params = {
  output: document.getElementById('output'),
  viewResults: document.getElementById('result'),
  outputNewGame: document.getElementById('outputNewGame'),
  playerWins: 0,
  computerWins: 0,
  maxRounds: 0,
  completeRounds: 0
};

// Pętla i przypisana funkcja dla wszystkich guzików jednocześnie
var btnPlayerMove = document.querySelectorAll('.player-move'); // Ustalam zmienną dla wszystkich elementów, które mają klasę "player-move"

for (var i = 0; i < btnPlayerMove.length; i++) {
  var dataMove = btnPlayerMove[i].getAttribute('data-move'); // Tworzę pętlę, która wyciąga z przeszukanych elementów atrybut "data-move"
  
  btnPlayerMove[i].addEventListener('click', function() { // Wywołuję proces nasłuchiwania i wykonuję funkcję z argumentem "dataMove"
    
    playerMove(dataMove);
  });
}

buttonNewGame.addEventListener('click', function() {
  // var outputNewGame = document.getElementById('outputNewGame');
  params.output.innerHTML = '';
  params.viewResults.innerHTML = '';
  params.maxRounds = window.prompt('Podaj liczbę partii do rozegrania');
  params.outputNewGame.innerHTML = 'Masz ' + params.maxRounds + ' rund do rozegrania. Powodzenia!';
  params.completeRounds = 0;
  params.playerWins = 0;
  params.computerWins = 0;
  buttonPaper.removeAttribute('disabled');
  buttonRock.removeAttribute('disabled');
  buttonScissor.removeAttribute('disabled');
  
  if (params.maxRounds === null || params.maxRounds === '') {
    params.outputNewGame.innerHTML = 'Podaj liczbę!';
  }
  else if (isNaN(params.maxRounds)) {
    params.outputNewGame.innerHTML = 'To nie jest właściwa forma podania liczby!';
  }
  else if (params.maxRounds == params.completeRounds) {
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
		params.output.innerHTML = 'Remis!<br>' + params.output.innerHTML;
	} 
  
  else if (winnerIs === 'player') {
		params.output.innerHTML = 'Wygrałeś! Zagrałeś ' + playerMove + ' a komputer zagrał ' + computerMove + '<br>' + params.output.innerHTML;
		params.playerWins++;
    params.completeRounds++;
	} 
  
  else {
		params.output.innerHTML = 'Przegrałeś! Zagrałeś ' + playerMove + ' a komputer zagrał ' + computerMove + '<br>';
		params.computerWins++;
    params.completeRounds++;
	}
  
	params.viewResults.innerHTML = params.playerWins + ' : ' + params.computerWins + '<br>';
  
//   Wyświetlanie wyniku końcowego
  if (params.maxRounds == params.completeRounds) {
    params.viewResults.insertAdjacentHTML('beforeend', 'Gra została zakończona! Naciśnij przycisk "Nowa Gra", aby rozpocząć nową rozgrywkę.<br>');
    buttonPaper.setAttribute('disabled', true);
    buttonRock.setAttribute('disabled', true);
    buttonScissor.setAttribute('disabled', true);
    params.outputNewGame.innerHTML = '';
  }
  else if (params.playerWins === params.completeRounds) {
    params.viewResults.insertAdjacentHTML('beforeend', 'Gratulacje! Wygrałeś tę rundę!<br>');
  }
  else if (params.computerWins === params.completeRounds) {
    params.viewResults.insertAdjacentHTML('beforeend', 'Przykro mi, ale przegrałeś<br>');
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

// Modals







// Funkcja otwierająca modal

var showModal = function(event){
  event.preventDefault();
  
  if (event.target.getAttribute('href') == '#modal-one') {
      document.getElementById('modal-one').classList.add('show');
  } else if (event.target.getAttribute('href') == '#modal-two') {
      document.getElementById('modal-two').classList.add('show');
  } else if (event.target.getAttribute('href') == '#modal-three') {
      document.getElementById('modal-three').classList.add('show');
  }
  
  document.querySelector('#modal-overlay').classList.add('show');
};
  
  // Mimo, że obecnie mamy tylko jeden link, stosujemy kod dla wielu linków. W ten sposób nie będzie trzeba go zmieniać, kiedy zechcemy mieć więcej linków lub guzików otwierających modale
  
  var modalLinks = document.querySelectorAll('.show-modal');
  
  for(var i = 0; i < modalLinks.length; i++){
    modalLinks[i].addEventListener('click', showModal);
  }
  
  // Dodajemy też funkcję zamykającą modal, oraz przywiązujemy ją do kliknięć na elemencie z klasą "close". 

  var hideModal = function(event){
      var activeModal = document.querySelectorAll('.modal')

      event.preventDefault();
      document.querySelector('#modal-overlay').classList.remove('show');
    
      for (var i = 0; i < activeModal.length; i++) {
        activeModal[i].classList.remove('show');
      }
  };
  
  var closeButtons = document.querySelectorAll('.modal .close');
  
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }
  
  // Dobrą praktyką jest również umożliwianie zamykania modala poprzez kliknięcie w overlay. 
  
  document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  
  // Musimy jednak pamiętać, aby zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 
  
  var modals = document.querySelectorAll('.modal');
  
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    });
  }
