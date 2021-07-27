let digitalElement = document.querySelector(`.digital`);
let segundoElement = document.querySelector(`.p_s`);
let minutoElement = document.querySelector(`.p_m`);
let horaElement = document.querySelector(`.p_h`);

function updateClock(){
    let now = new Date();
    let hour = fixZero(now.getHours());
    let minute = fixZero(now.getMinutes());
    let second = fixZero(now.getSeconds());

    digitalElement.innerHTML = `${hour}:${minute}:${second}`;


    let segundoDeg = ((360/60) * second ) - 90;
    let minuteDeg  = ((360/60) * minute ) - 90;
    let hourDeg  = ((360/12) * hour ) - 90;;
    
    segundoElement.style.transform = `rotate(${segundoDeg}deg)`;
    minutoElement.style.transform  = `rotate(${minuteDeg}deg)`;
    horaElement.style.transform    = `rotate(${hourDeg}deg)`;
};

function fixZero(time){
    return time < 10 ? `0${time}` : time;
};

setInterval(updateClock, 1000);
updateClock();