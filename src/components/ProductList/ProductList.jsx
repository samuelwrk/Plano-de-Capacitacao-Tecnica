/**
 * ============================================
 * Componente: Lista de Produtos (ProductList)
 * ============================================
 *
 * Este componente renderiza a grade de produtos na página principal.
 * Responsável por:
 * - Exibir cards de produtos em uma grade responsiva
 * - Tratamento de lista vazia (sem produtos na categoria)
 * - Passar dados dos produtos para os componentes ProductCard
 *
 * Funcionamento:
 * - Recebe um array de produtos via props
 * - Renderiza cada produto como um ProductCard
 * - Exibe mensagem amigável se não houver produtos
 */

import React from 'react';

// Importação do componente Card de Produto
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

/**
 * Componente funcional da lista de produtos
 *
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.products - Array de objetos de produto a serem exibidos
 * @param {Function} props.onProductClick - Callback chamado ao clicar em um produto
 * @returns {JSX.Element} Elemento JSX da lista de produtos
 */
const ProductList = ({ products, onProductClick }) => {
  /**
   * ============================================
   * Verificação de Lista Vazia
   ============================================
   * Se não houver produtos ou a lista estiver vazia,
   * exibe uma mensagem informativa ao usuário
   */
  if (!products || products.length === 0) {
    return (
      <div className="product-list-container">
        {/* Mensagem exibida quando não há produtos */}
        <div className="no-products">
          <p>Nenhum produto encontrado nesta categoria.</p>
        </div>
      </div>
    );
  }

  /**
   * ============================================
   * Renderização da Grade de Produtos
   ============================================
   */
  return (
    <div className="product-list-container">
      {/* Container da grade de produtos (grid responsivo) */}
      <div className="product-grid">
        {/* Mapeia cada produto para um Card de Produto */}
        {products.map((produto) => (
          <ProductCard
            key={produto.id}
            product={produto}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
