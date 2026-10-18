const KEY_STORAGE = 'openweather_api_key';

const apiKeyInput = document.querySelector('#apiKey');
apiKeyInput.value = getApiKey();

document.querySelector('.config').addEventListener('submit', (event)=>{
    event.preventDefault();
    saveApiKey(apiKeyInput.value.trim());
    showWarnings(getApiKey() ? 'Chave salva neste navegador.' : 'Chave removida.');
});

document.querySelector('.busca').addEventListener('submit', async (event)=>{
    /*Previne o comportamento padrão que ele deveria ter
    Ou seja, vai previnir dele enviar/carregar a página */
    event.preventDefault();

    let input = document.querySelector(`#searchInput`).value;
    let apiKey = getApiKey();

    if(!apiKey){
        clearInfo();
        showWarnings('Informe sua chave da OpenWeather acima para buscar o clima.');
        return;
    }

    if(input !== ''){
        clearInfo();
        showWarnings('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(input)}&appid=${encodeURIComponent(apiKey)}&units=metric&lang=pt_br`

        try {
            /*await > faz a requisição e aguarda pra atribuir resultado */
            let results = await fetch(url);
            /*Converto o resultado para Json*/
            let json    = await results.json();

            /*Stats code 200 é que teve retorno (a API devolve cod como número ou string)*/
            if(Number(json.cod) === 200) {
                ShowInformation({
                    name: json.name,
                    country: json.sys.country,
                    temp: json.main.temp,
                    tempIcon: json.weather[0].icon,
                    windSpeed: json.wind.speed,
                    windAngle: json.wind.deg
                });
            } else if(Number(json.cod) === 401){
                clearInfo();
                showWarnings('Chave inválida ou não ativada ainda.');
            } else {
                clearInfo();
                showWarnings('Não foi possível encontrar esta Localização...')
            }
        } catch (error) {
            clearInfo();
            showWarnings('Erro de conexão. Tente novamente.');
        }
    }
});

function getApiKey(){
    try {
        return localStorage.getItem(KEY_STORAGE) || '';
    } catch (error) {
        return '';
    }
}

function saveApiKey(key){
    try {
        if(key){
            localStorage.setItem(KEY_STORAGE, key);
        } else {
            localStorage.removeItem(KEY_STORAGE);
        }
    } catch (error) {
        showWarnings('Não foi possível salvar a chave neste navegador.');
    }
}

function ShowInformation(json) {
    showWarnings('');
    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
}

function clearInfo(){
    showWarnings('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarnings(msg){
    document.querySelector('.aviso').innerHTML = msg;
}
