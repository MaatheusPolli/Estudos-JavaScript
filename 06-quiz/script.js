//dados iniciais
let currentQuestion = 0;
let correctAnswers  = 0;

showQuestion();

//eventos
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//funções
function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display    = 'none';
        document.querySelector('.questionArea').style.display = 'block';                
        
        document.querySelector('.question').innerHTML = q.question;    
        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div data-op=${i} class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        //manipula só uma vez DOM (menos consumo memória)
        document.querySelector('.options').innerHTML = optionsHtml;
        
        document.querySelectorAll('.options .option').forEach(item =>{
            item.addEventListener('click', optionClickEvent);
        });
    }else{
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++;             
    }
    
    currentQuestion++; //aumenta para ir na próxima pergunta
    showQuestion(); //pra carregar a 2 pergunta visualizando
};

function finishQuiz(){
    let points = calculatePoints(correctAnswers, questions.length);
    let feedback = getFeedback(points);

    document.querySelector('.scoreText1').innerHTML = feedback.text;
    document.querySelector('.scorePct').style.color = feedback.color;

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

    document.querySelector('.scoreArea').style.display    = 'block';
    document.querySelector('.questionArea').style.display = 'none';                
    document.querySelector('.progress--bar').style.width = '100%';

};

function resetEvent(){
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}