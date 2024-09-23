// Seleção dos elementos do DOM
const circles = [];
const colors = ['green', 'yellow', 'red'];
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1; // 1 para Jogador 1, 2 para Jogador 2
let gameInterval;
let countdownInterval;
let remainingTime = 45;
let transitionSpeed = 1000; // Velocidade padrão em milissegundos
let clicksPlayer1 = { green: 0, yellow: 0, red: 0 };
let clicksPlayer2 = { green: 0, yellow: 0, red: 0 };

const player1NameInput = document.getElementById('player1Name');
const player2NameInput = document.getElementById('player2Name');
const startButton = document.getElementById('startButton');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');
const timerDisplay = document.getElementById('timer');
const gameBoard = document.getElementById('gameBoard');
const resultDisplay = document.getElementById('result');
const finalScore = document.getElementById('finalScore');
const clicksInfo = document.getElementById('clicksInfo');
const winnerDisplay = document.getElementById('winner');
const player1ClicksDisplay = document.getElementById('player1Clicks');
const player2ClicksDisplay = document.getElementById('player2Clicks');

// Função para criar os círculos do jogo
function createCircles() {
  for (let i = 0; i < 12; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.addEventListener('click', () => handleCircleClick(circle));
    circles.push(circle);
    gameBoard.appendChild(circle);
  }
}

// Função para lidar com cliques nos círculos
function handleCircleClick(circle) {
  if (remainingTime <= 0) return; // Ignorar cliques após o término do jogo

  const color = circle.classList[1];
  
  if (!color) return; // Ignorar se o círculo não tiver cor
  
  let points = 0;
  if (color === 'green') {
    points = 3;
    if (currentPlayer === 1) clicksPlayer1.green++;
    else clicksPlayer2.green++;
  } else if (color === 'yellow') {
    points = -1;
    if (currentPlayer === 1) clicksPlayer1.yellow++;
    else clicksPlayer2.yellow++;
  } else if (color === 'red') {
    points = -2;
    if (currentPlayer === 1) clicksPlayer1.red++;
    else clicksPlayer2.red++;
  }

  // Atualizar pontuação do jogador atual
  if (currentPlayer === 1) {
    player1Score += points;
    player1ScoreDisplay.textContent = `Jogador 1 (${player1Score})`;
  } else if (currentPlayer === 2) {
    player2Score += points;
    player2ScoreDisplay.textContent = `Jogador 2 (${player2Score})`;
  }

  // Remover a cor após o clique
  circle.classList.remove(color);
  updateClicksDisplay();
}

// Função para aplicar a sequência de cores aos círculos aleatoriamente
function applyRandomColors() {
  circles.forEach((circle) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    circle.classList.remove('green', 'yellow', 'red');
    circle.classList.add(randomColor);
  });
}

// Função para iniciar o jogo
function startGame() {
  const player1Name = player1NameInput.value.trim();
  const player2Name = player2NameInput.value.trim();
  
  if (!player1Name || !player2Name) {
    alert("Por favor, insira os nomes de ambos os jogadores.");
    return;
  }

  // Resetar variáveis
  player1Score = 0;
  player2Score = 0;
  currentPlayer = 1; // Jogador 1 começa
  remainingTime = 45;
  transitionSpeed = 1000; // Velocidade padrão
  clicksPlayer1 = { green: 0, yellow: 0, red: 0 };
  clicksPlayer2 = { green: 0, yellow: 0, red: 0 };
  player1ScoreDisplay.textContent = `Jogador 1 (0)`;
  player2ScoreDisplay.textContent = `Jogador 2 (0)`;
  timerDisplay.textContent = `Tempo: 45s`;
  resultDisplay.classList.add('hidden');

  // Aplicar cores aleatórias para o jogador 1
  applyRandomColors();

  // Iniciar intervalos
  gameInterval = setInterval(applyRandomColors, transitionSpeed);
  countdownInterval = setInterval(updateTimer, 1000);
}

// Função para atualizar o cronômetro
function updateTimer() {
  remainingTime--;
  timerDisplay.textContent = `Tempo: ${remainingTime}s`;

  // Acelerar a transição nos últimos 10 segundos
  if (remainingTime === 10) {
    clearInterval(gameInterval);
    transitionSpeed = 450; // Velocidade aumentada para os últimos 10 segundos
    gameInterval = setInterval(applyRandomColors, transitionSpeed);
  }

  // Parar o cronômetro
  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    clearInterval(gameInterval);

    // Trocar para o segundo jogador ou terminar o jogo
    if (currentPlayer === 1) {
      alert('Agora é a vez do Jogador 2!');
      currentPlayer = 2; // Passa para o segundo jogador
      remainingTime = 45; // Resetar o tempo
      transitionSpeed = 1000; // Reiniciar a velocidade
      gameInterval = setInterval(applyRandomColors, transitionSpeed);
      countdownInterval = setInterval(updateTimer, 1000);
    } else {
      endGame(); // Terminar o jogo após o segundo jogador
    }
  }
}

// Função para atualizar a exibição dos cliques
function updateClicksDisplay() {
  player1ClicksDisplay.innerHTML = `
    Jogador 1: Verde (+3): ${clicksPlayer1.green}, Amarelo (-1): ${clicksPlayer1.yellow}, Vermelho (-2): ${clicksPlayer1.red}
  `;
  player2ClicksDisplay.innerHTML = `
    Jogador 2: Verde (+3): ${clicksPlayer2.green}, Amarelo (-1): ${clicksPlayer2.yellow}, Vermelho (-2): ${clicksPlayer2.red}
  `;
}

// Função para terminar o jogo
function endGame() {
  clearInterval(gameInterval);
  clearInterval(countdownInterval);

  // Remover quaisquer cores restantes
  circles.forEach(circle => circle.classList.remove('green', 'yellow', 'red'));

  // Exibir resultados
  finalScore.textContent = `Jogador 1: ${player1Score} pontos | Jogador 2: ${player2Score} pontos`;
  clicksInfo.innerHTML = `
    Cliques na Verde (+3): ${clicksPlayer1.green} (Jogador 1) | ${clicksPlayer2.green} (Jogador 2)<br>
    Cliques na Amarela (-1): ${clicksPlayer1.yellow} (Jogador 1) | ${clicksPlayer2.yellow} (Jogador 2)<br>
    Cliques na Vermelha (-2): ${clicksPlayer1.red} (Jogador 1) | ${clicksPlayer2.red} (Jogador 2)
  `;
  
  // Determinar o vencedor
  let winnerText;
  if (player1Score > player2Score) {
    winnerText = `${player1NameInput.value} é o vencedor com ${player1Score} pontos!`;
  } else if (player2Score > player1Score) {
    winnerText = `${player2NameInput.value} é o vencedor com ${player2Score} pontos!`;
  } else {
    winnerText = "Empate!";
  }
  winnerDisplay.textContent = winnerText;

  resultDisplay.classList.remove('hidden');
}

// Adicionar evento ao botão de iniciar jogo
startButton.addEventListener('click', startGame);

// Criar os círculos ao carregar a página
createCircles();
