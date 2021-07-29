// Dados Iniciais
let currentColor = 'black';
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

// Eventos
document.querySelectorAll('.colorArea .color').forEach(item =>{
    item.addEventListener('click', colorClickEvent);
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

// Funções
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    // remove quem estava ativo(cor)
    document.querySelector('.color.active').classList.remove('active');
    // adiciona nova cor selecionada
    e.target.classList.add('active');    
};

function mouseDownEvent(e){
    canDraw = true;
    /*pega o lugar que começou o desenho
      ponto do target(clique) - distancia do componente(#tela) - tela total
    */
    mouseX  = e.pageX - screen.offsetLeft;
    mouseY  = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e){      
    if(canDraw){
        draw(e.pageX, e.pageY);
    } 
}

function mouseUpEvent(){
    canDraw = false; 
}

function draw(x,y){
    //começo desenho
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //desenhar
    ctx.beginPath();    
    ctx.lineWidth = 5; //espessura da linha
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);//move pro inicio
    ctx.lineTo(pointX, pointY);//desenha do inicio até o point capturado
    ctx.closePath();
    ctx.strokeStyle = currentColor; //cor
    ctx.stroke();    

    //salvo onde parou, para dar continuidade ao desenho
    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen(){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}