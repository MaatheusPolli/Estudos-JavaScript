// Lógica pura do quiz (sem DOM), para ser testada com `node --test`.

// Percentual de acerto arredondado para baixo (0 a 100)
function calculatePoints(correctAnswers, totalQuestions){
    if(totalQuestions === 0) return 0;
    return Math.floor((correctAnswers / totalQuestions) * 100);
}

// Mensagem e cor do resultado de acordo com o percentual
function getFeedback(points){
    if(points < 30){
        return { text: 'Tá ruim em?!', color: '#ff5d73' };
    }
    if(points < 70){
        return { text: 'Quase lá...', color: '#ffb03b' };
    }
    return { text: 'Parabéns!!', color: '#22c55e' };
}

if(typeof module !== 'undefined'){
    module.exports = { calculatePoints, getFeedback };
}
