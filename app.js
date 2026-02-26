// 1. DADOS LOCAIS (Carregamento instantâneo, sem simulação de rede)
const jogosData = [
    { id: 1, nome: "Counter-Strike 2", genero: "FPS Tático", desc: "A evolução do lendário CS:GO. Jogo tático de tiro em primeira pessoa.", img: "https://assets.propmark.com.br/uploads/2020/11/7ee27e3c7ca9b2434381b2728cedb5a4.CSGO-Operation-10-Details.jpg", plataformas: ["PC"], idade: 16, ano: 2012, dev: "Valve", url: "https://www.counter-strike.net/" },
    { id: 2, nome: "Valorant", genero: "FPS Tático", desc: "FPS tático 5v5 da Riot Games que combina tiro com agentes únicos.", img: "https://www.riotgames.com/darkroom/1440/8d5c497da1c2eeec8cffa99b01abc64b:5329ca773963a5b739e98e715957ab39/ps-f2p-val-console-launch-16x9.jpg", plataformas: ["PC", "PlayStation", "Xbox"], idade: 12, ano: 2020, dev: "Riot Games", url: "https://playvalorant.com/" },
    { id: 3, nome: "Rainbow Six Siege", genero: "FPS Tático", desc: "Shooter focado em destruição ambiental e cooperação entre equipes.", img: "https://noticias.maisesports.com.br/wp-content/uploads/2021/04/20200612-rainbow-six-siege.jpg", plataformas: ["PC", "PlayStation", "Xbox"], idade: 18, ano: 2015, dev: "Ubisoft", url: "https://www.ubisoft.com/pt-br/game/rainbow-six/siege" },
    { id: 4, nome: "PUBG: Battlegrounds", genero: "Battle Royale", desc: "O pioneiro do gênero Battle Royale moderno com até 100 jogadores.", img: "https://gamehall.com.br/wp-content/uploads/2020/11/PUBG-Screen-03.jpg", plataformas: ["PC", "PlayStation", "Xbox", "Mobile"], idade: 16, ano: 2017, dev: "PUBG Corp", url: "https://pubg.com/" },
    { id: 5, nome: "Call of Duty", genero: "FPS", desc: "Franquia popular com multiplayer intenso e o modo Warzone.", img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/42700/capsule_616x353.jpg?t=1748040520", plataformas: ["PC", "PlayStation", "Xbox"], idade: 18, ano: 2003, dev: "Activision", url: "https://www.callofduty.com/" },
    { id: 6, nome: "Apex Legends", genero: "Battle Royale", desc: "Battle Royale gratuito focado em movimentação fluida e heróis.", img: "https://w0.peakpx.com/wallpaper/58/222/HD-wallpaper-apex-legends-bloodhound.jpg", plataformas: ["PC", "PlayStation", "Xbox", "Nintendo Switch"], idade: 14, ano: 2019, dev: "Respawn", url: "https://www.ea.com/pt-br/games/apex-legends" }
];

const anoAtual = new Date().getFullYear();

// 2. RENDERIZAÇÃO DA GRADE E ESTATÍSTICAS
const renderizarInterface = () => {
    // Injeta os cartões de jogos diretamente no DOM
    document.getElementById('gradeJogos').innerHTML = jogosData.map(j => `
        <article class="cartao-jogo" id="jogo-${j.id}">
            <img src="${j.img}" alt="${j.nome}" class="imagem-cartao" loading="lazy">
            <div class="conteudo-cartao">
                <h3 class="titulo-cartao">${j.nome}</h3>
                <p class="desc-cartao">${j.desc}</p>
                <div class="info-cartao">
                    <div class="item-info"><span class="rotulo-info">Dev:</span><span>${j.dev}</span></div>
                    <div class="item-info"><span class="rotulo-info">Lançamento:</span><span>${j.ano} (${anoAtual - j.ano} anos)</span></div>
                    <div class="item-info"><span class="rotulo-info">Plataformas:</span>
                        <div class="lista-plataformas">${j.plataformas.map(p => `<span class="tag-plataforma">${p}</span>`).join('')}</div>
                    </div>
                    <div class="item-info"><span class="rotulo-info">Classificação:</span><span class="classificacao">${j.idade}+</span></div>
                </div>
                <a href="${j.url}" target="_blank" class="btn-cartao">Site Oficial</a>
            </div>
        </article>
    `).join('');

    // Cálculos rápidos para as estatísticas (usando flatMap e Set para performance)
    const platsUnicas = new Set(jogosData.flatMap(j => j.plataformas)).size;
    const mediaIdade = Math.round(jogosData.reduce((acc, j) => acc + j.idade, 0) / jogosData.length);

    document.getElementById('caixaEstatisticas').innerHTML = `
        <div class="cartao-estatistica"><div class="numero-estatistica">${jogosData.length}</div><div class="rotulo-estatistica">Jogos na Coleção</div></div>
        <div class="cartao-estatistica"><div class="numero-estatistica">${platsUnicas}</div><div class="rotulo-estatistica">Plataformas</div></div>
        <div class="cartao-estatistica"><div class="numero-estatistica">${mediaIdade}+</div><div class="rotulo-estatistica">Média Etária</div></div>
        <div class="cartao-estatistica"><div class="numero-estatistica">${anoAtual - 2003}</div><div class="rotulo-estatistica">Anos de História</div></div>
    `;
};

// 3. LÓGICA DO CARROSSEL
const initCarrossel = () => {
    const cxSlides = document.getElementById('slidesCarrossel');
    const cxInd = document.getElementById('indicadoresCarrossel');
    const total = jogosData.length;
    let atual = 0;
    
    // Montagem do HTML do carrossel
    cxSlides.innerHTML = jogosData.map(j => `
        <div class="slide-carrossel" data-id-jogo="${j.id}">
            <img src="${j.img}" alt="${j.nome}">
            <div class="conteudo-carrossel">
                <h2>${j.nome}</h2><p>Clique para detalhes</p><span class="genero-carrossel">${j.genero}</span>
            </div>
        </div>`).join('');
    cxInd.innerHTML = jogosData.map((_, i) => `<div class="indicador ${i === 0 ? 'ativo' : ''}" data-index="${i}"></div>`).join('');

    // Função para transição visual
    const mover = () => {
        cxSlides.style.transform = `translateX(-${atual * 100}%)`;
        document.querySelectorAll('.indicador').forEach((ind, i) => ind.classList.toggle('ativo', i === atual));
    };

    // Navegação manual e automática
    document.querySelector('.btn-ant').onclick = () => { atual = (atual - 1 + total) % total; mover(); };
    document.querySelector('.btn-prox').onclick = () => { atual = (atual + 1) % total; mover(); };
    cxInd.onclick = (e) => { if(e.target.dataset.index) { atual = Number(e.target.dataset.index); mover(); } };
    setInterval(() => { atual = (atual + 1) % total; mover(); }, 5000);

    // Scroll suave até o cartão do jogo ao clicar na imagem
    cxSlides.onclick = (e) => {
        const slide = e.target.closest('.slide-carrossel');
        if (slide) document.getElementById(`jogo-${slide.dataset.idJogo}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
};

// 4. LÓGICA DE BUSCA E FILTRO
const initBusca = () => {
    const input = document.getElementById('entradaBusca');
    const resultados = document.getElementById('resultadosBusca');
    const btnsFiltro = document.querySelectorAll('.btn-filtro');
    let platAtual = 'all';

    // Filtra os dados e atualiza a tela
    const atualizarResultados = () => {
        const termo = input.value.toLowerCase();
        const filtrados = jogosData.filter(j => 
            (termo === '' || j.nome.toLowerCase().includes(termo) || j.genero.toLowerCase().includes(termo)) &&
            (platAtual === 'all' || j.plataformas.includes(platAtual))
        );

        resultados.innerHTML = filtrados.length ? filtrados.map(j => `
            <div class="cartao-resultado" data-id-jogo="${j.id}">
                <img src="${j.img}" alt="${j.nome}" class="img-resultado">
                <div class="info-resultado"><h4>${j.nome}</h4><p>${j.genero}</p></div>
            </div>
        `).join('') : '<div class="sem-resultados">Nenhum jogo encontrado</div>';
    };

    // Gatilhos de pesquisa e clique
    input.oninput = atualizarResultados;
    btnsFiltro.forEach(btn => btn.onclick = () => {
        document.querySelector('.btn-filtro.ativo').classList.remove('ativo');
        btn.classList.add('ativo');
        platAtual = btn.dataset.plataforma;
        atualizarResultados();
    });

    resultados.onclick = (e) => {
        const cartao = e.target.closest('.cartao-resultado');
        if (cartao) document.getElementById(`jogo-${cartao.dataset.idJogo}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    atualizarResultados(); // Executa ao carregar
};

// 5. INICIALIZAÇÃO SÍNCRONA
// Removemos as Promises (async/await) para a interface carregar na mesma hora.
document.addEventListener('DOMContentLoaded', () => {
    renderizarInterface();
    initCarrossel();
    initBusca();
});