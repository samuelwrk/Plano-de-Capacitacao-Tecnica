/**
 * Serviço de comunicação com a API do New York Times
 * Gerencia todas as requisições HTTP utilizando Fetch API
 */

import { API_CONFIG, CATEGORIES } from '../utils/constants';

// Cache em memória para otimizar o uso da API
const cache = new Map();

/**
 * Busca notícias de uma seção específica da API
 * @param {string} section - Seção da API (world, politics, business, etc)
 * @param {boolean} useCache - Se deve usar cache (padrão: true)
 * @returns {Promise<Array>} Lista de artigos
 */
export const fetchSection = async (section, useCache = true) => {
  const cacheKey = `section_${section}`;
  const cached = cache.get(cacheKey);

  // Verifica se há dados em cache válidos antes de realizar a requisição
  if (useCache && cached && Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
    console.log(`[API] Usando cache para: ${section}`);
    return cached.data;
  }

  const url = `${API_CONFIG.BASE_URL}/${section}.json?api-key=${API_CONFIG.API_KEY}`;

  try {
    console.log(`[API] Buscando seção: ${section}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`API retornou status: ${data.status}`);
    }

    // Armazena no cache
    cache.set(cacheKey, {
      data: data.results,
      timestamp: Date.now()
    });

    console.log(`[API] Sucesso: ${data.results.length} artigos para ${section}`);
    return data.results;

  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Tempo limite excedido. Tente novamente.');
    }
    console.error(`[API] Erro ao buscar seção ${section}:`, error);
    throw error;
  }
};

/**
 * Busca notícias de múltiplas seções simultaneamente
 * @param {Array<string>} sections - Lista de seções
 * @returns {Promise<Object>} Objeto com artigos por seção
  */
export const fetchMultipleSections = async (sections) => {
  console.log(`[API] Buscando ${sections.length} seções simultaneamente`);

  try {
    const promises = sections.map(section => fetchSection(section));
    const results = await Promise.all(promises);

    const data = sections.reduce((acc, section, index) => {
      acc[section] = results[index];
      return acc;
    }, {});

    console.log(`[API] Todas as seções carregadas com sucesso`);
    return data;

  } catch (error) {
    console.error('[API] Erro ao buscar múltiplas seções:', error);
    throw error;
  }
};

/**
 * Busca a primeira imagem de destaque para cada categoria
 * Útil para o accordion horizontal
 * @returns {Promise<Object>} Objeto com URL da imagem por seção
 */
export const fetchFeaturedImages = async () => {
  console.log('[API] Buscando imagens de destaque');

  const featuredImages = {};
  const sections = CATEGORIES.map(cat => cat.apiSection);

  try {
    const promises = sections.map(async (section) => {
      const articles = await fetchSection(section);
      if (articles && articles.length > 0) {
        const firstArticleWithImage = articles.find(article =>
          article.multimedia && article.multimedia.length > 0
        );

        if (firstArticleWithImage) {
          return {
            section,
            image: firstArticleWithImage.multimedia[0].url,
            title: firstArticleWithImage.title
          };
        }
      }
      return { section, image: null, title: null };
    });

    const results = await Promise.all(promises);

    results.forEach(result => {
      featuredImages[result.section] = {
        image: result.image,
        title: result.title
      };
    });

    console.log(`[API] Imagens de destaque carregadas`);
    return featuredImages;

  } catch (error) {
    console.error('[API] Erro ao buscar imagens de destaque:', error);
    throw error;
  }
};

/**
 * Limpa o cache
 */
export const clearCache = () => {
  cache.clear();
  console.log('[API] Cache limpo');
};

/**
 * Obtém estatísticas do cache
 * @returns {Object} Estatísticas do cache
 */
export const getCacheStats = () => {
  const entries = [];
  cache.forEach((value, key) => {
    entries.push({
      key,
      age: Date.now() - value.timestamp,
      articleCount: Array.isArray(value.data) ? value.data.length : 0
    });
  });

  return {
    totalEntries: cache.size,
    entries
  };
};
