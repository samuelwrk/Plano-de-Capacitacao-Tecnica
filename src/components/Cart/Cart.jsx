/**
 * ============================================
 * Componente: Carrinho de Compras (Cart)
 * ============================================
 *
 * Este componente exibe o modal do carrinho de compras.
 * Permite ao usuário:
 * - Visualizar todos os itens adicionados
 * - Modificar quantidade de cada item
 * - Remover itens do carrinho
 * - Limpar todo o carrinho
 * - Finalizar a compra (ir para checkout)
 *
 * Funcionalidades:
 * - Exibição de lista vazia quando não há itens
 * - Cálculo automático de subtotais e total
 * - Controle de quantidade com botões +/-
 * - Confirmação antes de limpar o carrinho
 * - Fechamento ao clicar fora do modal
 */

import React, { useMemo } from 'react';

// Hook personalizado para acessar as funcionalidades do carrinho
import { useCarrinho } from '../../context/CartContext';
import './Cart.css';

/**
 * Componente funcional do carrinho de compras
 *
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onClose - Callback chamado para fechar o modal
 * @param {Function} props.onCheckout - Callback chamado para ir ao checkout
 * @returns {JSX.Element} Elemento JSX do carrinho de compras
 */
function Cart({ onClose, onCheckout }) {
  // Hook do contexto do carrinho para gerenciar itens
  const { itens, removerItem, atualizarQuantidade, totalCarrinho, quantidadeItens } = useCarrinho();

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
   * Função: Tratar Alteração de Quantidade
   ============================================
   * Atualiza a quantidade de um item específico
   *
   * @param {Object} item - Item do carrinho
   * @param {number} novaQuantidade - Nova quantidade desejada
   */
  const tratarAlteracaoQuantidade = (item, novaQuantidade) => {
    atualizarQuantidade(item.id, item.cor, item.armazenamento, novaQuantidade);
  };

  /**
   * ============================================
   * Função: Tratar Remoção de Item
   ============================================
   * Remove um item específico do carrinho
   *
   * @param {Object} item - Item do carrinho a ser removido
   */
  const tratarRemocao = (item) => {
    removerItem(item.id, item.cor, item.armazenamento);
  };

  /**
   * ============================================
   * Função: Tratar Limpeza do Carrinho
   ============================================
   * Remove todos os itens do carrinho após confirmação
   */
  const tratarLimparCarrinho = () => {
    // Exibe diálogo de confirmação antes de limpar
    if (window.confirm('Tem certeza que deseja limpar o carrinho?')) {
      // Remove cada item do carrinho
      itens.forEach(item => {
        removerItem(item.id, item.cor, item.armazenamento);
      });
    }
  };

  // Calcula o número de itens únicos no carrinho (para display)
  const quantidadeItemsUnicos = useMemo(() => itens.length, [itens]);

  /**
   * ============================================
   * Renderização: Carrinho Vazio
   ============================================
   * Se não houver itens, exibe mensagem informativa
   */
  if (itens.length === 0) {
    return (
      // Overlay que fecha ao clicar fora
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-container empty-cart" onClick={e => e.stopPropagation()}>
          {/* Botão de fechar */}
          <button className="cart-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Conteúdo do carrinho vazio */}
          <div className="empty-cart-content">
            {/* Ícone de carrinho vazio */}
            <svg className="empty-cart-icon" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {/* Mensagem informativa */}
            <h3>Seu carrinho está vazio</h3>
            <p>Adicione produtos para continuar</p>
            {/* Botão para continuar comprando */}
            <button className="continue-shopping-btn" onClick={onClose}>
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * ============================================
   * Renderização: Carrinho com Itens
   ============================================
   */
  return (
    // Overlay que fecha ao clicar fora
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-container" onClick={e => e.stopPropagation()}>
        {/* Cabeçalho do carrinho */}
        <div className="cart-header">
          {/* Título com quantidade de itens */}
          <h2>Meu Carrinho ({quantidadeItens} {quantidadeItens === 1 ? 'item' : 'itens'})</h2>
          {/* Botão de fechar */}
          <button className="cart-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Lista de itens do carrinho */}
        <div className="cart-items">
          {itens.map((item, indice) => (
            <div key={`${item.id}-${item.cor}-${item.armazenamento}-${indice}`} className="cart-item">
              {/* Imagem do produto */}
              <div className="cart-item-image">
                <img src={item.imagem} alt={item.nome} />
              </div>

              {/* Detalhes do produto */}
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.nome}</h3>

                {/* Exibição da cor selecionada */}
                {item.cor && (
                  <p className="cart-item-option">
                    <span className="option-label">Cor:</span>
                    <span className="option-value">{item.cor}</span>
                  </p>
                )}

                {/* Exibição do armazenamento selecionado */}
                {item.armazenamento && (
                  <p className="cart-item-option">
                    <span className="option-label">Armazenamento:</span>
                    <span className="option-value">{item.armazenamento}</span>
                  </p>
                )}

                {/* Preço unitário */}
                <p className="cart-item-price">{formatarPreco(item.preco)}</p>
              </div>

              {/* Ações do item (quantidade e remoção) */}
              <div className="cart-item-actions">
                {/* Controles de quantidade */}
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => tratarAlteracaoQuantidade(item, item.quantidade - 1)}
                    disabled={item.quantidade <= 1}
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantidade}</span>
                  <button
                    className="qty-btn"
                    onClick={() => tratarAlteracaoQuantidade(item, item.quantidade + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Botão de remoção */}
                <button
                  className="remove-btn"
                  onClick={() => tratarRemocao(item)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Remover
                </button>
              </div>

              {/* Subtotal do item (preço × quantidade) */}
              <div className="cart-item-subtotal">
                <span className="subtotal-label">Subtotal</span>
                <span className="subtotal-value">{formatarPreco(item.preco * item.quantidade)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé do carrinho com total e ações */}
        <div className="cart-footer">
          {/* Total da compra */}
          <div className="cart-total">
            <span className="total-label">Total</span>
            <span className="total-value">{formatarPreco(totalCarrinho)}</span>
          </div>

          {/* Botões de ação */}
          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={tratarLimparCarrinho}>
              Limpar Carrinho
            </button>
            <button className="checkout-btn" onClick={onCheckout}>
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
