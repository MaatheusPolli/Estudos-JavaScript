// Initial Data
let square ={
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
};

let player     = '';
let warning = '';
let playing = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click', itemClick);
    item.addEventListener('keydown', itemKeyDown);
});

// Functions
function itemClick(event) {
    play(event.currentTarget.getAttribute('data-item'));
}

// Teclado: Enter/Espaço jogam; setas movem o foco entre as casas
function itemKeyDown(event) {
    let key = event.key;

    if(key === 'Enter' || key === ' '){
        event.preventDefault();
        play(event.currentTarget.getAttribute('data-item'));
    } else if(key.startsWith('Arrow')){
        event.preventDefault();
        moveFocus(event.currentTarget.getAttribute('data-item'), key);
    }
}

function play(item){
    if(playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

// Linha = letra (a, b, c), coluna = número (1, 2, 3)
function moveFocus(item, key){
    let row = item.charCodeAt(0) - 97;
    let col = Number(item[1]) - 1;

    if(key === 'ArrowUp') row--;
    if(key === 'ArrowDown') row++;
    if(key === 'ArrowLeft') col--;
    if(key === 'ArrowRight') col++;

    if(row < 0 || row > 2 || col < 0 || col > 2) return;

    let next = String.fromCharCode(97 + row) + (col + 1);
    document.querySelector(`div[data-item=${next}]`).focus();
}

function reset(){
    warning = '';
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'X': 'O';

    for (let i in square){
        square[i] = '';
    }

    playing = true;
    renderSquare();
    renderInfo();
}

function renderSquare(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
}

function renderInfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}
//change player
function togglePlayer(){
    player = (player === 'X') ? 'O' : 'X';
    renderInfo();
}
//check game result (lógica em logic.js)
function checkGame(){
    let result = getResult(square);

    if(result === 'X'){
        warning = 'O "X" venceu!';
        playing  = false;
    } else if(result === 'O'){
        warning = 'O "O" venceu!';
        playing  = false;
    } else if(result === 'draw'){
        warning = 'Deu empate!';
        playing  = false;
    }
}
