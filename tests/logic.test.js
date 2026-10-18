const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const ttt = require('../04-jogo-da-velha/logic.js');
const quiz = require('../06-quiz/logic.js');

const emptyBoard = () => ({
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
});

describe('Jogo da velha', () => {
    test('detecta vitória em linha, coluna e diagonal', () => {
        const row = { ...emptyBoard(), a1: 'X', a2: 'X', a3: 'X' };
        const col = { ...emptyBoard(), a2: 'O', b2: 'O', c2: 'O' };
        const diag = { ...emptyBoard(), a3: 'X', b2: 'X', c1: 'X' };

        assert.equal(ttt.getResult(row), 'X');
        assert.equal(ttt.getResult(col), 'O');
        assert.equal(ttt.getResult(diag), 'X');
    });

    test('vitória do O não é confundida com vitória do X (regressão)', () => {
        const board = { ...emptyBoard(), a1: 'O', b1: 'O', c1: 'O' };

        assert.equal(ttt.checkWinner(board, 'X'), false);
        assert.equal(ttt.checkWinner(board, 'O'), true);
        assert.equal(ttt.getResult(board), 'O');
    });

    test('tabuleiro cheio sem vencedor é empate', () => {
        const board = {
            a1: 'X', a2: 'O', a3: 'X',
            b1: 'X', b2: 'O', b3: 'O',
            c1: 'O', c2: 'X', c3: 'X'
        };

        assert.equal(ttt.isFull(board), true);
        assert.equal(ttt.getResult(board), 'draw');
    });

    test('jogo em andamento retorna null', () => {
        const board = { ...emptyBoard(), a1: 'X', b2: 'O' };

        assert.equal(ttt.isFull(board), false);
        assert.equal(ttt.getResult(board), null);
    });
});

describe('Quiz', () => {
    test('calcula o percentual arredondado para baixo', () => {
        assert.equal(quiz.calculatePoints(1, 3), 33);
        assert.equal(quiz.calculatePoints(3, 3), 100);
        assert.equal(quiz.calculatePoints(0, 5), 0);
    });

    test('não divide por zero quando não há perguntas', () => {
        assert.equal(quiz.calculatePoints(0, 0), 0);
    });

    test('feedback muda nas faixas 30 e 70', () => {
        assert.equal(quiz.getFeedback(29).text, 'Tá ruim em?!');
        assert.equal(quiz.getFeedback(30).text, 'Quase lá...');
        assert.equal(quiz.getFeedback(69).text, 'Quase lá...');
        assert.equal(quiz.getFeedback(70).text, 'Parabéns!!');
    });
});
