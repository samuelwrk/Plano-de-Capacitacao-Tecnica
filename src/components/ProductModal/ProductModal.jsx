/**
 * ============================================
 * Componente: Modal de Produto (ProductModal)
 * ============================================
 *
 * Este componente exibe os detalhes completos de um produto em um modal.
 * Permite ao usuário:
 * - Visualizar todas as imagens do produto
 * - Selecionar a cor desejada
 * - Selecionar o armazenamento desejado
 * - Escolher a quantidade
 * - Adicionar ao carrinho de compras
 *
 * Funcionalidades:
 * - Galeria de imagens com thumbnail
 * - Seleção de cor e armazenamento
 * - Controle de quantidade
 * - Fechamento ao clicar fora ou pressionar Escape
 * - Integração com o carrinho de compras
 */

import React, { useState, useEffect } from 'react';

// Hook personalizado para acessar as funcionalidades do carrinho
import { useCarrinho } from '../../context/CartContext';
import './ProductModal.css';

/**
 * Componente funcional do modal de produto
 *
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.product - Objeto contendo dados completos do produto
 * @param {Function} props.onClose - Callback chamado para fechar o modal
 * @returns {JSX.Element} Elemento JSX do modal de produto
 */
const ProductModal = ({ product, onClose }) => {
  // Hook do contexto do carrinho para adicionar produtos
  const { adicionarItem } = useCarrinho();

  // Estado que controla qual imagem está sendo exibida (índice do array)
  const [imagemSelecionada, setImagemSelecionada] = useState(0);

  // Estado que armazena a cor selecionada pelo usuário
  const [corSelecionada, setCorSelecionada] = useState('');

  // Estado que armazena o armazenamento selecionado pelo usuário
  const [armazenamentoSelecionado, setArmazenamentoSelecionado] = useState('');

  // Estado que armazena a quantidade desejada
  const [quantidade, setQuantidade] = useState(1);

  /**
   * ============================================
   * Efeito: Inicializar Selecções Padrão
   ============================================
   * Executado quando o produto muda (modal abre)
   * Define os valores padrão para as selections
   */
  useEffect(() => {
    if (product) {
      // Define a primeira cor disponível como padrão
      setCorSelecionada(product.colors?.[0] || '');
      // Define o primeiro armazenamento disponível como padrão
      setArmazenamentoSelecionado(product.storage?.[0] || '');
      // Reseta para a primeira imagem
      setImagemSelecionada(0);
      // Reseta a quantidade para 1
      setQuantidade(1);
    }
  }, [product]);

  /**
   * ============================================
   * Função: Adicionar ao Carrinho
   ============================================
   * Adiciona o produto com as opções selecionadas ao carrinho
   * Após adicionar, fecha o modal
   */
  const adicionarAoCarrinho = () => {
    if (product && corSelecionada && armazenamentoSelecionado) {
      adicionarItem(product, corSelecionada, armazenamentoSelecionado, quantidade);
      onClose();
    }
  };

  /**
   * ============================================
   * Efeito: Listener de Tecla Escape
   ============================================
   * Permite fechar o modal pressionando a tecla Escape
   */
  useEffect(() => {
    // Função que trata o evento de tecla
    const tratarTecla = (evento) => {
      if (evento.key === 'Escape') {
        onClose();
      }
    };

    // Adiciona o listener ao window
    window.addEventListener('keydown', tratarTecla);

    // Cleanup: remove o listener quando o componente é desmontado
    return () => window.removeEventListener('keydown', tratarTecla);
  }, [onClose]);

  // Se não houver produto, não renderiza nada
  if (!product) return null;

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
   * Renderização do Modal de Produto
   ============================================
   */
  return (
    // Overlay que fecha o modal ao clicar fora
    <div className="modal-overlay" onClick={onClose}>
      {/* Conteúdo do modal (impede fechamento ao clicar dentro) */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botão de fechar (X) */}
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Corpo do modal dividido em galeria e detalhes */}
        <div className="modal-body">
          {/* Seção da galeria de imagens */}
          <div className="modal-gallery">
            {/* Imagem principal ampliada */}
            <div className="main-image-container">
              <img
                src={product.images?.[imagemSelecionada]}
                alt={product.name}
                className="main-image"
              />
            </div>

            {/* Lista de miniaturas das imagens */}
            <div className="thumbnail-list">
              {product.images?.map((imagem, indice) => (
                <button
                  key={indice}
                  // Adiciona classe 'active' se for a imagem selecionada
                  className={`thumbnail ${imagemSelecionada === indice ? 'active' : ''}`}
                  onClick={() => setImagemSelecionada(indice)}
                >
                  <img src={imagem} alt={`${product.name} ${indice + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Seção de detalhes do produto */}
          <div className="modal-details">
            {/* Nome do produto */}
            <h2 className="modal-title">{product.name}</h2>

            {/* Descrição completa do produto */}
            <p className="modal-description">{product.description}</p>

            {/* Especificação de câmeras (se disponível) */}
            {product.cameras && (
              <div className="product-spec">
                <h4>Câmeras:</h4>
                <p>{product.cameras}</p>
              </div>
            )}

            {/* Seleção de cores disponíveis */}
            <div className="product-spec">
              <h4>Cores Disponíveis:</h4>
              <div className="color-options">
                {product.colors?.map((cor, indice) => (
                  <button
                    key={indice}
                    // Adiciona classe 'selected' se for a cor selecionada
                    className={`color-option ${corSelecionada === cor ? 'selected' : ''}`}
                    onClick={() => setCorSelecionada(cor)}
                    title={cor}
                  >
                    {cor}
                  </button>
                ))}
              </div>
            </div>

            {/* Seleção de armazenamento */}
            <div className="product-spec">
              <h4>Armazenamento:</h4>
              <div className="storage-options">
                {product.storage?.map((armazenamento, indice) => (
                  <button
                    key={indice}
                    // Adiciona classe 'selected' se for o armazenamento selecionado
                    className={`storage-option ${armazenamentoSelecionado === armazenamento ? 'selected' : ''}`}
                    onClick={() => setArmazenamentoSelecionado(armazenamento)}
                  >
                    {armazenamento}
                  </button>
                ))}
              </div>
            </div>

            {/* Seleção de quantidade */}
            <div className="product-quantity">
              <h4>Quantidade:</h4>
              <div className="quantity-selector">
                {/* Botão de diminui quantidade */}
                <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))}>-</button>
                {/* Valor atual da quantidade */}
                <span>{quantidade}</span>
                {/* Botão de aumenta quantidade */}
                <button onClick={() => setQuantidade(quantidade + 1)}>+</button>
              </div>
            </div>

            {/* Exibição do preço */}
            <div className="modal-price">
              <span className="price-label">Preço:</span>
              <span className="price-value">{formatarPreco(product.price)}</span>
            </div>

            {/* Botão de adicionar ao carrinho */}
            <button className="add-to-cart-btn" onClick={adicionarAoCarrinho}>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
