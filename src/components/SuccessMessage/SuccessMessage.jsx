/**
 * ============================================
 * Componente: Mensagem de Sucesso (SuccessMessage)
 * ============================================
 *
 * Este componente exibe uma tela de sucesso após a finalização
 * de uma compra. É apresentado ao usuário para confirmar que
 * o processo de compra foi concluído com êxito.
 *
 * Funcionalidades:
 * - Ícone animado de checkmark
 * - Mensagem de confirmação
 * - Animação de confetes
 * - Exibição temporária (3 segundos)
 */

import React from 'react';
import './SuccessMessage.css';

/**
 * Componente funcional da mensagem de sucesso
 *
 * @returns {JSX.Element} Elemento JSX da mensagem de sucesso
 */
function SuccessMessage() {
  /**
   * ============================================
   * Renderização da Mensagem de Sucesso
   ============================================
   */
  return (
    // Overlay que cobre toda a tela
    <div className="success-overlay">
      <div className="success-content">
        {/* Ícone de sucesso animado */}
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Círculo externo */}
            <circle cx="12" cy="12" r="10"></circle>
            {/* Checkmark animado */}
            <path className="check-path" d="M9 12l2 2 4-4"></path>
          </svg>
        </div>

        {/* Título da mensagem */}
        <h2>Compra Realizada com Sucesso!</h2>

        {/* Mensagem informativa */}
        <p>Obrigado pela sua compra. Em breve você receberá um e-mail com os detalhes do pedido.</p>

        {/* Animação de confetes */}
        <div className="success-animation">
          {/* 10 elementos de confete para animação */}
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
