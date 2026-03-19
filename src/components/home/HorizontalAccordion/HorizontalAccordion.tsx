/**
 * HorizontalAccordion - Componente de accordion horizontal para categorias
 * Exibe as 6 categorias de notícias em um layout horizontal expansível
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../../utils/constants.js';
import { useNewsContext } from '../../../context/NewsContext.jsx';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import { getArticleImage, truncateText } from '../../../utils/helpers.js';
import './HorizontalAccordion.css';

const HorizontalAccordion = () => {
  const navigate = useNavigate();
  const { news, featuredImages, fetchCategory } = useNewsContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const promises = CATEGORIES.map(category => fetchCategory(category.id));
        await Promise.all(promises);
        setIsLoading(false);
      } catch (err) {
        setError('Erro ao carregar as categorias. Tente novamente.');
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [fetchCategory]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleCategoryNavigate = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  if (isLoading) {
    return (
      <div className="horizontal-accordion">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="horizontal-accordion">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="horizontal-accordion">
      <div className="horizontal-accordion__container">
        {CATEGORIES.map((category, index) => {
          const isActive = index === activeIndex;
          const categoryNews = news[category.id];
          const featuredData = featuredImages[category.apiSection];
          const firstArticle = categoryNews?.articles?.[0];
          const imageUrl = featuredData?.image || (firstArticle ? getArticleImage(firstArticle) : null);
          const title = featuredData?.title || firstArticle?.title || category.description;

          return (
            <div
              key={category.id}
              className={`accordion-item ${isActive ? 'accordion-item--active' : ''}`}
              onClick={() => handleItemClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleItemClick(index)}
            >
              <div className="accordion-item__background">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title}
                    className="accordion-item__image"
                    loading="lazy"
                  />
                ) : (
                  <div className="accordion-item__placeholder">
                    <span>{category.icon}</span>
                  </div>
                )}
                <div className="accordion-item__overlay"></div>
              </div>

              <div className="accordion-item__content">
                <div className="accordion-item__header">
                  <span className="accordion-item__icon">{category.icon}</span>
                  <h2 className="accordion-item__title">{category.name}</h2>
                </div>

                {isActive && (
                  <div className="accordion-item__details">
                    <p className="accordion-item__description">
                      {truncateText(title, 150)}
                    </p>
                    <button
                      className="accordion-item__button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryNavigate(category.id);
                      }}
                    >
                      Ver todas as notícias
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalAccordion;
