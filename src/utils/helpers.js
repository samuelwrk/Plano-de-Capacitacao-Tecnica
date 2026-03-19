/**
 * Funções utilitárias para formatação e manipulação de dados
 */

/**
 * Formata uma data ISO para formato legível em português
 * @param {string} isoDate - Data no formato ISO
 * @returns {string} Data formatada
 */
export const formatDate = (isoDate) => {
  if (!isoDate) return 'Data não disponível';

  try {
    const date = new Date(isoDate);
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    return date.toLocaleDateString('pt-BR', options);
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data não disponível';
  }
};

/**
 * Formata uma data ISO para formato curto
 * @param {string} isoDate - Data no formato ISO
 * @returns {string} Data formatada
 */
export const formatDateShort = (isoDate) => {
  if (!isoDate) return '';

  try {
    const date = new Date(isoDate);
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };

    return date.toLocaleDateString('pt-BR', options);
  } catch (error) {
    return '';
  }
};

/**
 * Obtém a imagem de destaque de um artigo
 * @param {Object} article - Artigo da API
 * @returns {string|null} URL da imagem ou null
 */
export const getArticleImage = (article) => {
  if (!article || !article.multimedia || article.multimedia.length === 0) {
    return null;
  }

  const image = article.multimedia.find(m => m.format === 'Super Jumbo') ||
                article.multimedia.find(m => m.format === 'Jumbo') ||
                article.multimedia.find(m => m.format === 'mediumThreeByTwo210') ||
                article.multimedia[0];

  return image ? image.url : null;
};

/**
 * Trunca um texto para um número máximo de caracteres
 * @param {string} text - Texto a ser truncado
 * @param {number} maxLength - Número máximo de caracteres
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Remove tags HTML de um texto
 * @param {string} html - Texto com HTML
 * @returns {string} Texto sem HTML
 */
export const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

/**
 * Capitaliza a primeira letra de uma string
 * @param {string} str - String a ser capitalizada
 * @returns {string} String capitalizada
 */
export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Extrai o nome do autor de uma string byline
 * @param {string} byline - String de crédito do autor
 * @returns {string} Nome do autor
 */
export const extractAuthor = (byline) => {
  if (!byline) return 'New York Times';

  const cleanByline = byline.replace(/^(Por|By)\s+/i, '').trim();

  return cleanByline || 'New York Times';
};

/**
 * Valida se uma URL é válida
 * @param {string} url - URL a ser validada
 * @returns {boolean} True se válida
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
