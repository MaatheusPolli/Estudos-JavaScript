/*Adiciona um observador de evento na página toda*/
document.body.addEventListener('keydown', (event)=>{
    // Não toca enquanto o usuário digita a composição
    if(event.target.matches('input') || event.repeat) return;
    playSound( event.code.toLocaleLowerCase() );
});

/*Clique ou toque nos pads*/
document.querySelectorAll('.key').forEach((pad)=>{
    pad.addEventListener('pointerdown', ()=>{
        playSound(pad.dataset.key);
    });
});

document.querySelector('.composer').addEventListener('submit', (event) => {
    event.preventDefault();
    let song = document.querySelector('#input').value.toLowerCase();

    if(song !== ''){
        let songArray = song.split('');
        playComposition(songArray);
    };
});

function playSound(sound){
    let audioElement = document.querySelector(`#s_${sound}`);
    let KeyElement = document.querySelector(`[data-key="${sound}"]`);
    let led = document.querySelector('.led');

    if(audioElement){
        audioElement.currentTime = 0;
        audioElement.play();
        led.classList.add('on');
        setTimeout(()=>{
            led.classList.remove('on');
        },120);
    };

    if(KeyElement){
        KeyElement.classList.add('active');
        setTimeout(()=>{
            KeyElement.classList.remove('active');
        },200);
    };
};

function playComposition(songArray){
    let wait = 0;

    for(let songItem of songArray){
        setTimeout(()=>{
            playSound(`key${songItem}`);
        }, wait);
        wait += 250;
    };
};
