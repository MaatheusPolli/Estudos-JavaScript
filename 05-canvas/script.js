// Dados Iniciais
let currentColor = 'black';
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

// Impede o navegador de rolar a página ao arrastar o dedo sobre o canvas
screen.style.touchAction = 'none';

// Eventos (Pointer Events funcionam com mouse, toque e caneta)
document.querySelectorAll('.colorArea .color').forEach(item =>{
    item.addEventListener('click', colorClickEvent);
});
screen.addEventListener('pointerdown', pointerDownEvent);
screen.addEventListener('pointermove', pointerMoveEvent);
screen.addEventListener('pointerup', pointerUpEvent);
screen.addEventListener('pointercancel', pointerUpEvent);
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

// Converte a posição do ponteiro (tela) para coordenadas do canvas,
// considerando que o canvas pode ser exibido em outro tamanho via CSS
function getPoint(e){
    let rect = screen.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * (screen.width / rect.width),
        y: (e.clientY - rect.top) * (screen.height / rect.height)
    };
}

function pointerDownEvent(e){
    canDraw = true;
    screen.setPointerCapture(e.pointerId);

    let point = getPoint(e);
    mouseX = point.x;
    mouseY = point.y;
}

function pointerMoveEvent(e){
    if(canDraw){
        let point = getPoint(e);
        draw(point.x, point.y);
    }
}

function pointerUpEvent(e){
    canDraw = false;
    screen.releasePointerCapture(e.pointerId);
}

function draw(x,y){
    //desenhar
    ctx.beginPath();
    ctx.lineWidth = 5; //espessura da linha
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);//move pro inicio
    ctx.lineTo(x, y);//desenha do inicio até o point capturado
    ctx.closePath();
    ctx.strokeStyle = currentColor; //cor
    ctx.stroke();

    //salvo onde parou, para dar continuidade ao desenho
    mouseX = x;
    mouseY = y;
}

function clearScreen(){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}
