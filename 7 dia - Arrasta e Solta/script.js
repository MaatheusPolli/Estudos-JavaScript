let areas = {
    a: null,
    b: null,
    c: null
};

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart',dragStart);
    item.addEventListener('dragend',dragEnd);
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
