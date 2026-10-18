// Lógica pura do jogo da velha (sem DOM), para ser testada com `node --test`.

const WIN_LINES = [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'b2', 'c3'],
    ['a3', 'b2', 'c1']
];

// Verdadeiro se a marca (X ou O) ocupa alguma linha completa do tabuleiro
function checkWinner(square, mark){
    return WIN_LINES.some(line => line.every(pos => square[pos] === mark));
}

// Verdadeiro se todas as casas estão preenchidas
function isFull(square){
    return Object.values(square).every(value => value !== '');
}

// Retorna 'X', 'O', 'draw' (empate) ou null (jogo em andamento)
function getResult(square){
    if(checkWinner(square, 'X')) return 'X';
    if(checkWinner(square, 'O')) return 'O';
    if(isFull(square)) return 'draw';
    return null;
}

if(typeof module !== 'undefined'){
    module.exports = { WIN_LINES, checkWinner, isFull, getResult };
}
