/**
 * ============================================
 * Componente: Card de Produto (ProductCard)
 * ============================================
 *
 * Este componente exibe um card individual para cada produto na listagem.
 * Apresenta informações resumidas do produto:
 * - Imagem principal
 * - Nome do produto
 * - Descrição curta (limitada a 80 caracteres)
 * - Cores disponíveis (indicadores visuais)
 * - Preço formatado em Real Brasileiro
 *
 * Funcionalidades:
 * - Clique no card abre o modal de detalhes do produto
 * - Lazy loading de imagens para performance
 * - Exibição de até 4 cores disponíveis
 */

import React from 'react';
import './ProductCard.css';

/**
 * Componente funcional do card de produto
 *
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.product - Objeto contendo dados do produto
 * @param {Function} props.onProductClick - Callback chamado ao clicar no card
 * @returns {JSX.Element} Elemento JSX do card de produto
 */
const ProductCard = ({ product, onProductClick }) => {
  /**
   * ============================================
   * Função: Formatar Preço
   ============================================
   * Formata o valor numérico para o padrão brasileiro de moeda
   *
   * @param {number} preco - Valor numérico do preço
   * @returns {string} String formatada (ex: R$ 1.999,00)
   */
  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  /**
   * ============================================
   * Função: Tratar Clique no Card
   ============================================
   * Dispara o callback passando o produto clicado
   */
  const tratarClique = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  /**
   * ============================================
   * Renderização do Card de Produto
   ============================================
   */
  return (
    // Card clicável que abre o modal de detalhes
    <div className="product-card" onClick={tratarClique}>
      {/* Container da imagem do produto */}
      <div className="product-image-container">
        {/* Imagem principal do produto (primeira do array) */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
          loading="lazy" // Otimização: carrega imagem apenas quando visível
        />

        {/* Overlay com texto "Ver Detalhes" exibido ao hover */}
        <div className="product-overlay">
          <span className="view-details">Ver Detalhes</span>
        </div>
      </div>

      {/* Container de informações do produto */}
      <div className="product-info">
        {/* Nome do produto */}
        <h3 className="product-name">{product.name}</h3>

        {/* Descrição curta (limitada a 80 caracteres) */}
        <p className="product-description">{product.description.substring(0, 80)}...</p>

        {/* Container de cores disponíveis */}
        <div className="product-colors">
          {/* Mapeia as primeiras 4 cores como pontos visuais */}
          {product.colors.slice(0, 4).map((cor, indice) => (
            <span
              key={indice}
              className="color-dot"
              title={cor} // Tooltip com nome da cor ao passar o mouse
            />
          ))}
          {/* Se houver mais de 4 cores, exibe indicador de quantidade */}
          {product.colors.length > 4 && (
            <span className="more-colors">+{product.colors.length - 4}</span>
          )}
        </div>

        {/* Container do preço */}
        <div className="product-price-container">
          {/* Preço formatado em Real Brasileiro */}
          <span className="product-price">{formatarPreco(product.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
