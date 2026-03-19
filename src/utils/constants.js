/**
 * Mapeamento de categorias da aplicação para as seções da API do NYT
 * Cada categoria local corresponde a uma seção específica da API
 */
export const CATEGORIES = [
  {
    id: 'mundo',
    name: 'Mundo',
    apiSection: 'world',
    icon: '🌍',
    description: 'Cobertura internacional e notícias do mundo'
  },
  {
    id: 'politica',
    name: 'Política',
    apiSection: 'politics',
    icon: '🏛️',
    description: 'Política estadounidense e atualidades políticas'
  },
  {
    id: 'economia',
    name: 'Economia',
    apiSection: 'business',
    icon: '📈',
    description: 'Mercados, finanças e economia global'
  },
  {
    id: 'tecnologia',
    name: 'Tecnologia',
    apiSection: 'technology',
    icon: '💻',
    description: 'Inovação, startups e tecnologia'
  }
];

/**
 * Configuração da API do NYT
 */
export const API_CONFIG = {
  BASE_URL: 'https://api.nytimes.com/svc/topstories/v2',
  API_KEY: 'xMRTyKQ2WZC0FGoDTuODuF0kcbcUg3ya2jdZTVMAL3sBM4oE',
  TIMEOUT: 10000,
  CACHE_DURATION: 5 * 60 * 1000
};

/**
 * Breakpoints para responsividade
 */
export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  large: '1280px'
};

/**
 * Número máximo de artigos por categoria
 */
export const MAX_ARTICLES = 20;

/**
 * Mapeamento de IDs de categoria para nomes
 */
export const getCategoryById = (id) => {
  return CATEGORIES.find(cat => cat.id === id);
};

/**
 * Mapeamento de seções da API para IDs de categoria
 */
export const getCategoryIdBySection = (section) => {
  const category = CATEGORIES.find(cat => cat.apiSection === section);
  return category ? category.id : null;
};
