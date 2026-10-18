// Servidor local sem dependências: serve a página e faz proxy da API da OpenWeather.
// A chave fica na variável de ambiente OPENWEATHER_API_KEY e nunca chega ao navegador.
//
// Uso (Node 18+):
//   Windows PowerShell:  $env:OPENWEATHER_API_KEY="sua_chave"; node server.js
//   Linux/macOS:         OPENWEATHER_API_KEY=sua_chave node server.js
// Depois abra http://localhost:3000

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY || '';
const ROOT = __dirname;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
};

async function handleWeather(query, res) {
    if (!API_KEY) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ cod: 500, message: 'OPENWEATHER_API_KEY não definida no servidor.' }));
    }

    const city = query.get('q') || '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(API_KEY)}&units=metric&lang=pt_br`;

    try {
        const upstream = await fetch(url);
        const body = await upstream.text();
        res.writeHead(upstream.status, { 'Content-Type': 'application/json' });
        res.end(body);
    } catch (error) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ cod: 502, message: 'Falha ao contatar a OpenWeather.' }));
    }
}

function serveStatic(pathname, res) {
    const requested = pathname === '/' ? '/index.html' : pathname;
    const filePath = path.normalize(path.join(ROOT, requested));

    // Impede acesso a arquivos fora da pasta do projeto
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        return res.end();
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end('Não encontrado');
        }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        res.end(data);
    });
}

http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    if (url.pathname === '/api/weather') {
        return handleWeather(url.searchParams, res);
    }
    serveStatic(url.pathname, res);
}).listen(PORT, () => {
    console.log(`Clima rodando em http://localhost:${PORT}`);
    if (!API_KEY) console.log('Atenção: defina OPENWEATHER_API_KEY para usar o proxy.');
});
