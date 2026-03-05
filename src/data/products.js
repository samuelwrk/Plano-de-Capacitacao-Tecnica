export const categories = [
  { id: 'apple', name: 'Apple', image: 'https://imgs.search.brave.com/key9I2LGUIZAtQm1MXVUC-icm3tMU5HIz2JqIUWM2Xw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cuYXBwbGUuY29tL3YvaXBob25lL2hvbWUvY29vaWltYWdlcy9vdmVydmlldy9jb25zaWRlcl9tb2RhbHMvaW5ub3ZhdGlvbi9tb2RhbF9zZWNvbmRfX2Q5bGhiZTlvdXU4Ml9sYXJnZS5qcGc' },
  { id: 'samsung', name: 'Samsung', image: 'https://imgs.search.brave.com/OASRQWtoNkrNPDp3943Bs8bu3yS3G87DoSlmu9DaVLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcuZ2xvYmFsLm5ld3Muc2Ftc3VuZy5jb20vZ2xvYmFsL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI2LzAyLzI2MDMzMjA0L1NhbXN1bmctTW9iaWxlLUdhbGF4eS1VbnBhY2tlZC0yMDI2LUdhbGF4eS1TMjYtU2VyaWVzLUEtRmlyc3RMb29rX2RsMy5qcGc' },
  { id: 'xiaomi', name: 'Xiaomi', image: 'https://imgs.search.brave.com/PN4Ke19ECktVLDh8rhksEsob9BMTK4rWfaNKqgSiDuE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9maWxlcy50ZWNub2Jsb2cubmV0L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI0LzAyL3hpYW9taS0xNC11bHRyYS1pbWFnZS0yMS0xNDIweDEwNDMtMS0xMDYweDc3OS53ZWJw' },
  { id: 'motorola', name: 'Motorola', image: 'https://brmotorolanew.vtexassets.com/assets/vtex.file-manager-graphql/images/c8db9a7c-1f74-4a23-84b6-e12257420e87___e2d9d1e51518f5df03d28b3286bc7bef.jpg' },
  { id: 'notebooks', name: 'Notebooks', image: 'https://imgs.search.brave.com/uQr9pqsFKuyrdVF8u0vCYwY-k9w0N53Oy-VOCryueFU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1OTI5MTk5MzM1MTEtZWE5ZDQ4N2M4NWU0P2ZtPWpwZyZxPTYwJnc9MzAwMCZhdXRvPWZvcm1hdCZmaXQ9Y3JvcCZpeGxpYj1yYi00LjEuMCZpeGlkPU0zd3hNakEzZkRCOE1IeHpaV0Z5WTJoOE5IeDhiV0ZqWW05dmF5VXlNSEJ5YjN4bGJud3dmSHd3Zkh4OE1BPT0' },
  { id: 'tablets', name: 'Tablets', image: 'https://imgs.search.brave.com/LTBeiukbs9YGI2dL5bjtrhfb_RVPsVshtw6hpFHG_a8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zbS5pZ24uY29tL2lnbl9ici9pbWFnZS9lL2V2ZXJ5LWlwYWQvZXZlcnktaXBhZC1nZW5lcmF0aW9uLWEtZnVsbC1oaXN0b3J5LW9mLXJlbGVhc2UtZGF0ZXNfanV1cS5qcGc' }
];

export const products = [
  // Apple iPhones
  {
    id: 'iphone-15-pro-max',
    category: 'apple',
    name: 'iPhone 15 Pro Max',
    description: 'O ápice da engenharia da Apple. Construído em titânio aeroespacial, é mais leve e resistente. Possui o novo botão de Ação configurável e o chip A17 Pro, que permite rodar jogos de console nativamente.',
    cameras: 'Sistema Pro de 48MP (Principal), Ultra Angular e Teleobjetiva de 5x (exclusiva do Max).',
    colors: ['Titânio Natural', 'Titânio Azul', 'Titânio Branco', 'Titânio Preto'],
    price: 8999.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_747522-MLA95493130164_102025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_862717-MLA95493259362_102025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_651409-MLA95493149994_102025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_628719-MLA95933414791_102025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_754064-MLA95493040786_102025-F.webp'
    ],
    storage: ['256GB', '512GB', '1TB']
  },
  {
    id: 'iphone-15',
    category: 'apple',
    name: 'iPhone 15',
    description: 'Traz a inovadora Dynamic Island para a linha base. Com vidro colorido por infusão e estrutura em alumínio, oferece um design elegante e ergonômico. Agora com transição total para USB-C.',
    cameras: 'Principal de 48MP com tecnologia quad-pixel para fotos de altíssima resolução.',
    colors: ['Rosa', 'Amarelo', 'Verde', 'Azul', 'Preto'],
    price: 5299.00,
    images: [
      'https://m.media-amazon.com/images/I/416MG51rNgL._AC_SX522_.jpg',
      'https://m.media-amazon.com/images/I/31-dbiAq-iL._AC_SX522_.jpg',
      'https://m.media-amazon.com/images/I/51ntU3xdK0L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/41EkEIXTQHL._AC_SL1000_.jpg'
    ],
    storage: ['128GB', '256GB', '512GB']
  },
  {
    id: 'iphone-14',
    category: 'apple',
    name: 'iPhone 14',
    description: 'Um smartphone equilibrado com tela Super Retina XDR. Introduziu o Modo Ação para vídeos extremamente estáveis mesmo sem gimbal e a Detecção de Acidente para segurança do usuário.',
    cameras: 'Sistema duplo de 12MP com processamento Photonic Engine.',
    colors: ['Estelar', 'Meia-noite', 'Azul', 'Roxo', 'Vermelho'],
    price: 4300.00,
    images: [
      'https://imgs.casasbahia.com.br/1568160765/1xg.jpg?imwidth=500',
      'https://imgs.casasbahia.com.br/1568160765/2xg.jpg?imwidth=500',
      'https://imgs.casasbahia.com.br/1568160765/4xg.jpg?imwidth=500'
    ],
    storage: ['128GB', '256GB', '512GB']
  },
  {
    id: 'iphone-13',
    category: 'apple',
    name: 'iPhone 13',
    description: 'O clássico moderno. Oferece o chip A15 Bionic que ainda supera muitos concorrentes atuais. Sua bateria foi um grande salto na categoria, garantindo um dia inteiro de uso intenso.',
    cameras: 'Diagonal de 12MP com Estabilização Óptica por deslocamento de sensor.',
    colors: ['Verde', 'Rosa', 'Azul', 'Meia-noite', 'Estelar'],
    price: 3600.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_644553-MLA95664299542_102025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_626788-MLA74781943683_022024-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_773558-MLA47781591515_102021-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_620142-MLA47781742033_102021-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_707609-MLA47781742034_102021-F.webp'
    ],
    storage: ['128GB', '256GB', '512GB']
  },
  {
    id: 'iphone-se',
    category: 'apple',
    name: 'iPhone SE (3ª Gen)',
    description: 'Para quem prefere o design compacto com botão Home e Touch ID, mas não abre mão da velocidade. Equipado com o mesmo processador do iPhone 13, é o modelo de entrada mais potente da marca.',
    cameras: 'Grande-angular de 12MP com Smart HDR 4 e Estilos Fotográficos.',
    colors: ['Meia-noite', 'Estelar', 'Vermelho'],
    price: 2900.00,
    images: [
      'https://imgs.search.brave.com/igTUeVcqu9tp7y6cAgWLZ-BoFSnHK_PSa4YHQ4ZCI2Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9maWxlcy50ZWNub2Jsb2cubmV0L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDIyLzAzL25vdm8taXBob25lLXNlLTIwMjItYXBwbGUtYTE1LWJpb25pYy0xMDYweDU5Ni5wbmc',
      'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111866_sp867-iphone-se-3gen.png'
    ],
    storage: ['64GB', '128GB', '256GB']
  },

  // Samsung
  {
    id: 'galaxy-s24-ultra',
    category: 'samsung',
    name: 'Galaxy S24 Ultra',
    description: 'O rei da produtividade. Tela plana de 6.8" com brilho de até 2600 nits. Inclui a S Pen e o conjunto Galaxy AI para tradução em tempo real, edição de fotos generativa e busca por círculo.',
    cameras: 'Sensor principal de 200MP e zoom óptico de até 10x com auxílio de IA.',
    colors: ['Titânio Cinza', 'Titânio Preto', 'Titânio Violeta', 'Titânio Amarelo'],
    price: 7500.00,
    images: [
      'https://m.media-amazon.com/images/I/71EYdKsNPxL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71WvIAyeWHL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71oZEEMaoxL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71l6+jM1tJL._AC_SL1500_.jpg'
    ],
    storage: ['256GB', '512GB', '1TB']
  },
  {
    id: 'galaxy-s23-fe',
    category: 'samsung',
    name: 'Galaxy S23 FE',
    description: 'Reúne os recursos que os fãs mais amam em um pacote mais acessível. Resistência IP68 contra água e poeira, tela Dynamic AMOLED 2X e um processador potente para jogos e multitarefa.',
    cameras: '50MP (Principal) + 12MP (Ultra Wide) + 8MP (Telefoto).',
    colors: ['Grafite', 'Creme', 'Verde', 'Roxo'],
    price: 2800.00,
    images: [
      'https://m.magazineluiza.com.br/a-static/420x420/usado-samsung-galaxy-s23-fe-256gb-grafite-bom/ecophone/brzdev12494-cc3/0def29cab3e5f56afffd9424d73860cc.jpeg',
      'https://a-static.mlcdn.com.br/420x420/usado-samsung-galaxy-s23-fe-256gb-grafite-bom/ecophone/brzdev12494-cc3/aedacf36f79b0f18f79890319cf2e2d4.jpeg',
      'https://a-static.mlcdn.com.br/420x420/usado-samsung-galaxy-s23-fe-256gb-grafite-bom/ecophone/brzdev12494-cc3/8dd05b8511c44ab3cd1bdebfd20fcbd1.jpeg'
    ],
    storage: ['128GB', '256GB']
  },
  {
    id: 'galaxy-a55',
    category: 'samsung',
    name: 'Galaxy A55 5G',
    description: 'O melhor custo-benefício intermediário premium. Acabamento em vidro e metal, tela de 120Hz fluida e atualizações de sistema garantidas por 4 anos. Focado em segurança com o Knox Vault.',
    cameras: 'Principal de 50MP com OIS (estabilização óptica) e frontal de 32MP.',
    colors: ['Azul Escuro', 'Azul Claro', 'Rosa'],
    price: 2100.00,
    images: [
      'https://m.media-amazon.com/images/I/51vo8kSh4+L._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/61GOhLk2IWL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/51pSTVDn-EL._AC_SX679_.jpg'
    ],
    storage: ['128GB', '256GB']
  },
  {
    id: 'galaxy-z-fold5',
    category: 'samsung',
    name: 'Galaxy Z Fold5',
    description: 'Um smartphone que se desdobra em um tablet. Ideal para quem trabalha com várias janelas abertas simultaneamente. Possui uma dobradiça zero-gap que o torna mais fino quando fechado.',
    cameras: 'Três lentes traseiras potentes e uma câmera sob a tela interna.',
    colors: ['Icy Blue', 'Preto', 'Creme'],
    price: 9000.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_824455-MLA74807966341_022024-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_827732-MLA91644387668_092025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_849216-MLU75329574017_032024-F.webp'
    ],
    storage: ['256GB', '512GB', '1TB']
  },
  {
    id: 'galaxy-m54',
    category: 'samsung',
    name: 'Galaxy M54 5G',
    description: 'Focado em autonomia. Com uma bateria de 6.000 mAh, é perfeito para usuários que passam muito tempo longe da tomada. Possui tela grande de 6.7" para consumo de vídeos.',
    cameras: 'Sensor de alta resolução com 108MP para fotos detalhadas.',
    colors: ['Azul', 'Prata'],
    price: 1700.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_814797-MLA99850024745_112025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_840362-MLU80421837906_112024-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_759985-MLU74110338021_012024-F.webp'
    ],
    storage: ['128GB', '256GB']
  },

  // Xiaomi
  {
    id: 'xiaomi-14-ultra',
    category: 'xiaomi',
    name: 'Xiaomi 14 Ultra',
    description: 'Mais câmera do que celular. Co-desenvolvido com a Leica, possui abertura variável e o processador Snapdragon 8 Gen 3. A traseira imita a textura de couro de câmeras profissionais.',
    cameras: 'Quatro sensores de 50MP cada, cobrindo todas as distâncias focais.',
    colors: ['Black', 'White'],
    price: 6500.00,
    images: [
      'https://m.media-amazon.com/images/I/71EYdKsNPxL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71WvIAyeWHL._AC_SL1500_.jpg'
    ],
    storage: ['256GB', '512GB', '1TB']
  },
  {
    id: 'redmi-note-13-pro',
    category: 'xiaomi',
    name: 'Redmi Note 13 Pro+ 5G',
    description: 'O modelo mais premium da linha Redmi. Pela primeira vez com tela curva e resistência IP68. O carregamento de 120W vai de 0 a 100% em apenas 19 minutos.',
    cameras: 'Impressionante sensor de 200MP com zoom no sensor sem perda de qualidade.',
    colors: ['Midnight Black', 'Moonlight White', 'Aurora Purple'],
    price: 2900.00,
    images: [
      'https://m.media-amazon.com/images/I/71213l3oWnL._AC_SX522_.jpg',
      'https://m.media-amazon.com/images/I/71n6di9tEOL._AC_SX522_.jpg'
    ],
    storage: ['256GB', '512GB']
  },
  {
    id: 'poco-x6-pro',
    category: 'xiaomi',
    name: 'Poco X6 Pro',
    description: 'O favorito dos gamers. Equipado com o chip Dimensity 8300-Ultra, entrega performance de topo de linha por um preço intermediário. Tela CrystalRes de 1.5K muito nítida.',
    cameras: '64MP com OIS e gravação em 4K.',
    colors: ['Black', 'Yellow', 'Grey'],
    price: 2300.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_624308-MLA99395903530_112025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_967671-MLA82084092349_012025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_772463-MLA81804825748_012025-F.webp'
    ],
    storage: ['256GB', '512GB']
  },
  {
    id: 'xiaomi-13t',
    category: 'xiaomi',
    name: 'Xiaomi 13T',
    description: 'Resistência e fotografia avançada. Conta com certificação IP68 e uma tela AMOLED CrystalRes de 144Hz, proporcionando uma das navegações mais fluidas do mercado Android.',
    cameras: 'Lentes Leica Vario-Summicron com excelente modo noturno.',
    colors: ['Alpine Blue', 'Meadow Green', 'Black'],
    price: 3200.00,
    images: [
      'https://files.tecnoblog.net/wp-content/uploads/2025/03/Xiaomi-13T-Alpine-Blue-700x700.png',
      'https://files.tecnoblog.net/wp-content/uploads/2025/03/Xiaomi-13T-Black-700x700.png',
      'https://files.tecnoblog.net/wp-content/uploads/2025/03/Xiaomi-13T-Meadow-Green-700x700.png'
    ],
    storage: ['256GB', '512GB']
  },
  {
    id: 'redmi-12-5g',
    category: 'xiaomi',
    name: 'Redmi 12 5G',
    description: 'Entrada no mundo 5G com estilo. Possui traseira em vidro, algo raro nessa faixa de preço, e o processador Snapdragon 4 Gen 2, que é muito eficiente energeticamente.',
    cameras: 'Sistema duplo com IA de 50MP.',
    colors: ['Sky Blue', 'Polar Silver', 'Midnight Black'],
    price: 1200.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_745306-MLA99882986475_112025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_686036-MLA74676491014_022024-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_922133-MLA91949738131_092025-F.webp'
    ],
    storage: ['128GB', '256GB']
  },

  // Tablets
  {
    id: 'ipad-air-m2',
    category: 'tablets',
    name: 'iPad Air (M2)',
    description: 'O equilíbrio perfeito entre o iPad base e o Pro. Agora com o chip M2, suporta o Apple Pencil Pro e o recurso "Hover". Ideal para ilustradores e editores de vídeo em trânsito.',
    colors: ['Cinza Espacial', 'Azul', 'Roxo', 'Estelar'],
    price: 6200.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_879665-MLB83249943084_042025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_929258-MLB83541591405_042025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_600929-MLB83249992560_042025-F.webp'
    ],
    storage: ['128GB', '256GB', '512GB']
  },
  {
    id: 'galaxy-tab-s9-ultra',
    category: 'tablets',
    name: 'Galaxy Tab S9 Ultra',
    description: 'O tablet Android definitivo. Tela Dynamic AMOLED 2X de 14.6 polegadas. Acompanha a S Pen na caixa e pode substituir um notebook com o modo Samsung DeX.',
    colors: ['Grafite', 'Bege'],
    price: 6800.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_662146-MLA99949012619_112025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_902909-MLU77312515243_062024-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_874873-MLA79218611622_092024-F.webp'
    ],
    storage: ['256GB', '512GB', '1TB']
  },
  {
    id: 'ipad-10gen',
    category: 'tablets',
    name: 'iPad (10ª Geração)',
    description: 'Cores vibrantes e design renovado. Perdeu o botão home, ganhou USB-C e a câmera frontal agora fica na horizontal, facilitando chamadas de vídeo e aulas online.',
    colors: ['Prateado', 'Azul', 'Rosa', 'Amarelo'],
    price: 3300.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_750590-MLA95652741532_102025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_621895-MLA79796125010_102024-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_706074-MLA79796134756_102024-F.webp'
    ],
    storage: ['64GB', '256GB']
  },
  {
    id: 'xiaomi-pad-6',
    category: 'tablets',
    name: 'Xiaomi Pad 6',
    description: 'Tela WQHD+ de 11 polegadas com taxa de 144Hz. Excelente para produtividade com sua interface MIUI Pad otimizada e quatro alto-falantes estéreo com Dolby Atmos.',
    colors: ['Gravity Gray', 'Gold', 'Mist Blue'],
    price: 2500.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_745503-MLA95535689998_102025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_719065-MLA95535572102_102025-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_818120-MLA95535561952_102025-F.webp'
    ],
    storage: ['128GB', '256GB']
  },
  {
    id: 'galaxy-tab-a9',
    category: 'tablets',
    name: 'Galaxy Tab A9+',
    description: 'Tablet focado em entretenimento familiar. Tela de 90Hz para navegação suave e suporte para até 3 janelas divididas, facilitando o estudo e o lazer simultâneo.',
    colors: ['Grafite', 'Prata'],
    price: 1300.00,
    images: [
      'https://m.media-amazon.com/images/I/51nXXAJGj4L._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/51ZiNW8NkZL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/41O5aLeuqVL._AC_SX679_.jpg'
    ],
    storage: ['64GB', '128GB']
  },

  // Notebooks
  {
    id: 'macbook-air-m3',
    category: 'notebooks',
    name: 'MacBook Air M3 (13")',
    description: 'O notebook mais popular do mundo, agora com o chip M3. É incrivelmente rápido para tarefas diárias e edição leve de mídia, sem precisar de ventoinhas (totalmente silencioso).',
    colors: ['Meia-noite', 'Estelar', 'Prateado', 'Cinza Espacial'],
    price: 9500.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_745471-MLB107659832625_022026-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_951460-MLB106973201172_022026-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_737927-MLB106973111742_022026-F.webp'
    ],
    storage: ['256GB', '512GB']
  },
  {
    id: 'dell-xps-13',
    category: 'notebooks',
    name: 'Dell XPS 13 (9340)',
    description: 'O padrão ouro para notebooks Windows ultraportáteis. Design minimalista com teclado "lattice" e touch bar tátil. Tela infinita com cores extremamente precisas.',
    colors: ['Prata', 'Grafite'],
    price: 8000.00,
    images: [
      'https://cdn.mos.cms.futurecdn.net/bBMRRVesbSK74eavRQxsYm-1024-80.jpg.webp',
      'https://cdn.mos.cms.futurecdn.net/ET9DTAPMkYGRCdBmoGJKvB-768-80.jpg.webp',
      'https://cdn.mos.cms.futurecdn.net/dzT7YcZXGQTbtr7naAyrsF-768-80.jpg.webp'
    ],
    storage: ['512GB', '1TB']
  },
  {
    id: 'galaxy-book4-ultra',
    category: 'notebooks',
    name: 'Samsung Galaxy Book4 Ultra',
    description: 'O mais potente da Samsung. Tela Touch AMOLED 2X e placa de vídeo dedicada NVIDIA RTX 4050/4070. Perfeito para integração com celulares Samsung e trabalhos pesados de renderização.',
    colors: ['Cinza Moonstone'],
    price: 12000.00,
    images: [
      'https://m.media-amazon.com/images/I/61Hu3pyGtTL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/511CNeF9SpL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/517Ot9TCpyL._AC_SL1500_.jpg'
    ],
    storage: ['512GB', '1TB']
  },
  {
    id: 'lenovo-legion-slim-5i',
    category: 'notebooks',
    name: 'Lenovo Legion Slim 5i',
    description: 'Notebook gamer com design sóbrio que não parece "espalhafatoso". Ótimo sistema de resfriamento e teclado retroiluminado. Ideal para quem joga e trabalha no mesmo dispositivo.',
    colors: ['Tempest Grey'],
    price: 7500.00,
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_713674-MLB108010206229_032026-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_850357-MLB108010206227_032026-F.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_883167-MLB108010206221_032026-F.webp'
    ],
    storage: ['512GB', '1TB']
  },
  {
    id: 'acer-swift-go-14',
    category: 'notebooks',
    name: 'Acer Swift Go 14',
    description: 'Um notebook "Intel Evo" focado em portabilidade e qualidade de imagem. Possui uma tela OLED 2.8K que oferece pretos perfeitos e cores vibrantes, com webcam QHD para reuniões nítidas.',
    colors: ['Prata'],
    price: 4200.00,
    images: [
      'https://m.media-amazon.com/images/I/7128VEFLbLL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/71eUhCFGRyL._AC_SY879_.jpg',
      'https://m.media-amazon.com/images/I/61Xjzj54YQL._AC_SL1500_.jpg'
    ],
    storage: ['512GB', '1TB']
  }
];
