/**
 * Context API para gerenciamento de estado global das notícias
 * Permite compartilhamento de dados entre componentes sem prop drilling
 */

import { createContext, useContext, useState, useCallback } from 'react';
import { CATEGORIES } from '../utils/constants';
import { fetchSection } from '../services/nytApi';

const NewsContext = createContext(null);

/**
 * Estado inicial de uma categoria
 */
const createInitialCategoryState = () => ({
  articles: [],
  loading: false,
  error: null
});

/**
 * Hook customizado para acessar o contexto de notícias
 * @returns {Object} Contexto de notícias
 */
export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext deve ser usado dentro de um NewsProvider');
  }
  return context;
};

/**
 * Provider de contexto de notícias
 * Gerencia o estado global de todas as categorias
 */
export const NewsProvider = ({ children }) => {
  // Estado para artigos de cada categoria
  const [news, setNews] = useState(() => {
    const initialState = {};
    CATEGORIES.forEach(category => {
      initialState[category.id] = createInitialCategoryState();
    });
    return initialState;
  });

  // Estado para imagens de destaque
  const [featuredImages, setFeaturedImages] = useState(() => {
    const initialImages = {};
    CATEGORIES.forEach(category => {
      initialImages[category.apiSection] = { image: null, title: null };
    });
    return initialImages;
  });

  /**
   * Busca artigos de uma categoria específica
   * @param {string} categoryId - ID da categoria
   */
  const fetchCategory = useCallback(async (categoryId) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    if (!category) {
      console.error(`Categoria não encontrada: ${categoryId}`);
      return;
    }

    console.log(`[Context] Buscando categoria: ${categoryId}`);

    // Define estado de loading
    setNews(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        loading: true,
        error: null
      }
    }));

    try {
      const articles = await fetchSection(category.apiSection);

      // Atualiza estado com artigos
      setNews(prev => ({
        ...prev,
        [categoryId]: {
          articles,
          loading: false,
          error: null
        }
      }));

      // Atualiza imagem de destaque se disponível
      if (articles && articles.length > 0) {
        const firstArticleWithImage = articles.find(article =>
          article.multimedia && article.multimedia.length > 0
        );

        if (firstArticleWithImage) {
          setFeaturedImages(prev => ({
            ...prev,
            [category.apiSection]: {
              image: firstArticleWithImage.multimedia[0].url,
              title: firstArticleWithImage.title
            }
          }));
        }
      }

    } catch (error) {
      console.error(`[Context] Erro ao buscar categoria ${categoryId}:`, error);

      setNews(prev => ({
        ...prev,
        [categoryId]: {
          articles: [],
          loading: false,
          error: error.message || 'Erro ao carregar notícias'
        }
      }));
    }
  }, []);

  /**
   * Limpa os dados de uma categoria específica
   * @param {string} categoryId - ID da categoria
   */
  const clearCategory = useCallback((categoryId) => {
    setNews(prev => ({
      ...prev,
      [categoryId]: createInitialCategoryState()
    }));
  }, []);

  /**
   * Limpa todos os dados
   */
  const clearAllCategories = useCallback(() => {
    const clearedState = {};
    CATEGORIES.forEach(category => {
      clearedState[category.id] = createInitialCategoryState();
    });
    setNews(clearedState);
  }, []);

  /**
   * Obtém dados de uma categoria específica
   * @param {string} categoryId - ID da categoria
   * @returns {Object} Dados da categoria
   */
  const getCategoryData = useCallback((categoryId) => {
    return news[categoryId] || createInitialCategoryState();
  }, [news]);

  /**
   * Valor do contexto
   */
  const value = {
    news,
    featuredImages,
    fetchCategory,
    clearCategory,
    clearAllCategories,
    getCategoryData
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsContext;
