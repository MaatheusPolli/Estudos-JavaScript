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

    if(input !== ''){
        clearInfo();
        showWarnings('Carregando...');

        try {
            let json = await fetchWeather(input);

            if(json === null){
                clearInfo();
                showWarnings('Informe sua chave da OpenWeather acima para buscar o clima.');
                return;
            }

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

// Prioridade: servidor local (server.js, chave em variável de ambiente).
// Se ele não estiver rodando, usa a chave salva no navegador.
async function fetchWeather(city){
    try {
        let proxy = await fetch(`/api/weather?q=${encodeURIComponent(city)}`);
        // 404: página publicada sem servidor; 500: servidor sem a variável de ambiente
        if(proxy.status !== 404 && proxy.status !== 500) return proxy.json();
    } catch (error) {
        // servidor não disponível: segue para a chave do navegador
    }

    let apiKey = getApiKey();
    if(!apiKey) return null;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(apiKey)}&units=metric&lang=pt_br`;
    let results = await fetch(url);
    return results.json();
}

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
