/**
 * Hook customizado para gerenciamento de estado de uma categoria específica
 * Fornece informações da categoria e artigos relacionados
 */

import { useMemo } from 'react';
import { CATEGORIES } from '../utils/constants';
import { useNews } from './useNews';

/**
 * Hook para obter informações e dados de uma categoria
 * @param {string} categoryId - ID da categoria
 * @returns {Object} Informações e dados da categoria
 */
export const useCategory = (categoryId) => {
  const { articles, loading, error, refetch, refreshing } = useNews(categoryId);

  // Obtém informações da categoria
  const category = useMemo(() => {
    return CATEGORIES.find(cat => cat.id === categoryId) || null;
  }, [categoryId]);

  return {
    category,
    articles,
    loading,
    error,
    refetch,
    refreshing,
    articleCount: articles.length
  };
};

export default useCategory;
