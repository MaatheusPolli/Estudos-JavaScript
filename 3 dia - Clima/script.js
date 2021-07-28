document.querySelector('.busca').addEventListener('submit', async (event)=>{
    /*Previne o comportamento padrão que ele deveria ter
    Ou seja, vai previnir dele enviar/carregar a página */
    event.preventDefault();

    let input = document.querySelector(`#searchInput`).value;

    if(input !== ''){
        clearInfo();
        showWarnings('Carregando...');

        let url  = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=REDACTED_OPENWEATHER_KEY&units=metric&lang=pt_br`
       
        /* Url reserva*/
        let url2 = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=REDACTED_OPENWEATHER_KEY&units=metric&lang=pt_br`
            

        /*await > faz a requisição e aguarda pra atribuir resultado */
        let results = await fetch(url2);        
        /*Converto o resultado para Json*/
        let json    = await results.json();

        /*Stats code 200 é que teve retorno*/
        if(json.cod === 200) {
            ShowInformation({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarnings('Não foi possível encontrar esta Localização...')
        }       
    } 
});

function ShowInformation(json) {
    showWarnings('');
    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
}

function clearInfo(){
    showWarnings('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarnings(msg){
    document.querySelector('.aviso').innerHTML = msg;
}