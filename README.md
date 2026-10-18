# Estudos-JavaScript — 7 dias, 7 projetos

Sete mini-projetos em JavaScript puro, um por dia, feitos em 2021 com a didática do **Bonieky Lacerda**. Cada pasta é independente e abre direto no navegador.

**Galeria:** abra o [`index.html`](index.html) da raiz para ver todos os projetos.

> Projeto de estudo.

## Projetos

| Dia | Pasta | O que faz | Conceitos |
|-----|-------|-----------|-----------|
| 1 | `01-bateria/` | Bateria tocada pelo teclado (Q, W, E, A, S, D, Z, X, C), com composição de sequências | `keydown`, `Audio`, `setTimeout` |
| 2 | `02-relogio-analogico/` | Relógio com ponteiros analógicos e hora digital | `setInterval`, `Date`, `transform: rotate` |
| 3 | `03-clima/` | Busca o clima de uma cidade na API da OpenWeather | `fetch`, `async/await`, JSON, `localStorage` |
| 4 | `04-jogo-da-velha/` | Jogo da velha para dois jogadores, com verificação de vitória e empate. Jogável por teclado | estado do jogo, eventos de clique e teclado |
| 5 | `05-canvas/` | Quadro para desenhar com mouse, toque ou caneta, com seleção de cores e limpeza | Canvas 2D, Pointer Events |
| 6 | `06-quiz/` | Quiz de múltipla escolha com pontuação final (`questions.js`) | renderização dinâmica, arrays |
| 7 | `07-arrasta-e-solta/` | Organizar itens arrastando entre áreas (mouse: Drag and Drop; toque: Pointer Events) | Drag and Drop API, Pointer Events |

## Como rodar

Abra o `index.html` da pasta desejada no navegador. Não há dependências nem build.

**Clima:** precisa de uma chave própria da [OpenWeather](https://openweathermap.org/api). Cole a chave no campo da página; ela fica salva apenas no `localStorage` do seu navegador e nunca entra no código.

## Testes e validação

A lógica pura (vitória e empate do jogo da velha, pontuação do quiz) fica em `logic.js` de cada pasta e é testada com o test runner nativo do Node 18+:

```bash
node --test tests/logic.test.js
```

O HTML é validado com [html-validate](https://html-validate.org/):

```bash
npx html-validate "**/*.html"
```

Ambos rodam no CI (`.github/workflows/ci.yml`).

## Tecnologias

HTML5, CSS3 e JavaScript ES6+.

## Licença

Este projeto usa **licença dupla**. O texto completo está em [LICENSE](LICENSE).

- **Uso pessoal, educacional e não comercial:** livre, nos termos da licença MIT (mantenha o aviso de copyright).
- **Uso comercial:** exige licença comercial. Isso inclui usar em produto ou serviço comercial, vender acesso ou derivados, usar em atividades com fins lucrativos e implantar em empresas.

Contato para licença comercial: ma.polli@hotmail.com
