/**
 * Hook customizado para consumo de notícias de uma categoria específica
 * Gerencia estados de loading, erro e retry
 */

import { useState, useEffect, useCallback } from 'react';
import { useNewsContext } from '../context/NewsContext';

/**
 * Hook para obter notícias de uma categoria
 * @param {string} categoryId - ID da categoria
 * @returns {Object} Estado e funções da categoria
 */
export const useNews = (categoryId) => {
  const { news, fetchCategory } = useNewsContext();
  const [refreshing, setRefreshing] = useState(false);

  // Obtém dados do contexto
  const categoryData = news[categoryId] || { articles: [], loading: false, error: null };

  // Efeito para buscar dados ao montar ou quando categoryId muda
  useEffect(() => {
    if (!categoryData.articles.length && !categoryData.loading && !categoryData.error) {
      fetchCategory(categoryId);
    }
  }, [categoryId, categoryData.articles.length, categoryData.loading, categoryData.error, fetchCategory]);

  /**
   * Função para recarregar dados
   */
  const refetch = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchCategory(categoryId);
    } finally {
      setRefreshing(false);
    }
  }, [categoryId, fetchCategory]);

  return {
    articles: categoryData.articles || [],
    loading: categoryData.loading || false,
    error: categoryData.error || null,
    refetch,
    refreshing
  };
};

export default useNews;
