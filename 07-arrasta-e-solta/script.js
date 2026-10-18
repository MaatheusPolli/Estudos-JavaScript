let areas = {
    a: null,
    b: null,
    c: null
};

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart',dragStart);
    item.addEventListener('dragend',dragEnd);
    item.addEventListener('pointerdown',touchDragStart);
});

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover',dragOver);
    area.addEventListener('dragleave',dragLeave);
    area.addEventListener('drop',drop);
});

document.querySelector('.neutralArea').addEventListener('dragover',dragOverNeutal);
document.querySelector('.neutralArea').addEventListener('dragleave',dragLeaveNeutal);
document.querySelector('.neutralArea').addEventListener('drop',dropNeutal);

//funcoes item
function dragStart(e){
    e.currentTarget.classList.add('dragging');
};

function dragEnd(e){
    e.currentTarget.classList.remove('dragging');
};

//arrastar com toque/caneta (a API de Drag and Drop não funciona em telas de toque)
function touchDragStart(e){
    if(e.pointerType === 'mouse') return;

    let item = e.currentTarget;
    let startX = e.clientX;
    let startY = e.clientY;

    item.setPointerCapture(e.pointerId);
    item.style.touchAction = 'none';
    item.classList.add('dragging');

    let onMove = (ev) => {
        item.style.transform = `translate(${ev.clientX - startX}px, ${ev.clientY - startY}px)`;
    };

    let onEnd = (ev) => {
        item.removeEventListener('pointermove', onMove);
        item.removeEventListener('pointerup', onEnd);
        item.removeEventListener('pointercancel', onEnd);
        item.releasePointerCapture(ev.pointerId);

        item.style.transform = '';
        item.classList.remove('dragging');

        // Descobre o que está embaixo do dedo, ignorando o próprio item
        item.style.pointerEvents = 'none';
        let target = document.elementFromPoint(ev.clientX, ev.clientY);
        item.style.pointerEvents = '';

        if(ev.type === 'pointercancel' || !target) return;

        let area = target.closest('.area');
        let neutral = target.closest('.neutralArea');

        if(area && area.querySelector('.item') === null){
            area.appendChild(item);
            updateAreas();
        } else if(neutral){
            neutral.appendChild(item);
            updateAreas();
        }
    };

    item.addEventListener('pointermove', onMove);
    item.addEventListener('pointerup', onEnd);
    item.addEventListener('pointercancel', onEnd);
};

//funcoes area
function dragOver(e){
    if(e.currentTarget.querySelector('.item') === null){
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    };
};

function dragLeave(e){
    e.currentTarget.classList.remove('hover');
};

function drop(e){
    e.currentTarget.classList.remove('hover');

    //ver se área está vazia
    if(e.currentTarget.querySelector('.item') === null){
        //item que estou arrastando
        let dragItem = document.querySelector('.item.dragging');

        //adiciona um item no currentTarget - arrasta aproveitando eventos já vinculados
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
};

// functions Neutral Area
function dragOverNeutal(e){
    e.preventDefault();
    e.currentTarget.classList.add('hover');
};

function dragLeaveNeutal(e){
    e.currentTarget.classList.remove('hover');
};

function dropNeutal(e){
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
};

//logicas do processo
function updateAreas(){
    document.querySelectorAll('.area').forEach(area =>{
        let name = area.getAttribute('data-name');

        if(area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML;
        }else{
            areas[name] = null;
        }
    });

    if(areas.a === '1' && areas.b === '2' && areas.c === '3'){
        document.querySelector('.areas').classList.add('correct');
    } else{
        document.querySelector('.areas').classList.remove('correct');
    }

}
