/**
 * ============================================
 * Componente: Checkout (Finalização de Compra)
 * ============================================
 *
 * Este componente exibe o formulário de finalização de compra.
 * Responsável por coletar e validar informações do cliente:
 * - Dados pessoais (nome, email, telefone, CPF)
 * - Endereço de entrega
 * - Forma de pagamento
 *
 * Funcionalidades:
 * - Validação de campos obrigatórios
 * - Múltiplas formas de pagamento (crédito, débito, PIX, boleto)
 * - Parcelamento para cartão de crédito
 * - Resumo do pedido com valores
 * - Simulação de processamento de pagamento
 */

import React, { useState, useMemo } from 'react';

// Hook personalizado para acessar as funcionalidades do carrinho
import { useCarrinho } from '../../context/CartContext';
import './Checkout.css';

/**
 * Componente funcional do checkout
 *
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onClose - Callback chamado para fechar o modal
 * @param {Function} props.onPurchaseComplete - Callback chamado quando a compra é finalizada
 * @returns {JSX.Element} Elemento JSX do checkout
 */
function Checkout({ onClose, onPurchaseComplete }) {
  // Hook do contexto do carrinho
  const { itens, totalCarrinho, limparCarrinho } = useCarrinho();

  /**
   * ============================================
   * Estados do Formulário
   ============================================
   * Armazena os dados preenchidos pelo usuário
   */
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    cep: '',
    pagamento: 'credit', // Método de pagamento padrão
    parcelas: 1
  });

  // Estado para armazenar erros de validação
  const [erros, setErros] = useState({});

  // Estado que indica se o pagamento está sendo processado
  const [estaProcessando, setEstaProcessando] = useState(false);

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
   * Hook useMemo: Opções de Parcelamento
   ============================================
   * Calcula as opções de parcelamento baseadas no valor total
   * - Compras >= R$ 200: até 10x
   * - Compras >= R$ 100: até 6x
   * - Compras < R$ 100: até 4x
   */
  const opcoesParcelas = useMemo(() => {
    const opcoes = [];
    // Determina o número máximo de parcelas baseado no valor
    const maxParcelas = totalCarrinho >= 200 ? 10 : totalCarrinho >= 100 ? 6 : 4;

    // Gera as opções de parcelamento
    for (let i = 1; i <= maxParcelas; i++) {
      const valorParcela = totalCarrinho / i;
      opcoes.push({
        value: i,
        label: `${i}x de ${formatarPreco(valorParcela)}${i === 1 ? ' (à vista)' : ''}`
      });
    }
    return opcoes;
  }, [totalCarrinho]);

  /**
   * ============================================
   * Função: Tratar Alteração de Input
   ============================================
   * Atualiza o estado do formulário quando o usuário digita
   * Limpa o erro do campo quando ele é corrigido
   *
   * @param {Object} evento - Evento de mudança do input
   */
  const tratarAlteracaoInput = (evento) => {
    const { name, value } = evento.target;
    setDadosFormulario(formularioAnterior => ({
      ...formularioAnterior,
      [name]: value
    }));

    // Limpa o erro do campo quando corrigido
    if (erros[name]) {
      setErros(errosAnteriores => ({
        ...errosAnteriores,
        [name]: ''
      }));
    }
  };

  /**
   * ============================================
   * Função: Validar Formulário
   ============================================
   * Verifica se todos os campos obrigatórios foram preenchidos
   * Retorna objeto com erros encontrados (se houver)
   *
   * @returns {boolean} True se o formulário for válido
   */
  const validarFormulario = () => {
    const novosErros = {};

    // Validação de nome
    if (!dadosFormulario.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    }

    // Validação de e-mail
    if (!dadosFormulario.email.trim()) {
      novosErros.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(dadosFormulario.email)) {
      novosErros.email = 'E-mail inválido';
    }

    // Validação de telefone
    if (!dadosFormulario.telefone.trim()) {
      novosErros.telefone = 'Telefone é obrigatório';
    }

    // Validação de CPF
    if (!dadosFormulario.cpf.trim()) {
      novosErros.cpf = 'CPF é obrigatório';
    }

    // Validação de endereço
    if (!dadosFormulario.endereco.trim()) {
      novosErros.endereco = 'Endereço é obrigatório';
    }

    // Validação de número
    if (!dadosFormulario.numero.trim()) {
      novosErros.numero = 'Número é obrigatório';
    }

    // Validação de cidade
    if (!dadosFormulario.cidade.trim()) {
      novosErros.cidade = 'Cidade é obrigatória';
    }

    // Validação de estado
    if (!dadosFormulario.estado.trim()) {
      novosErros.estado = 'Estado é obrigatório';
    }

    // Validação de CEP
    if (!dadosFormulario.cep.trim()) {
      novosErros.cep = 'CEP é obrigatório';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  /**
   * ============================================
   * Função: Tratar Envio do Formulário
   ============================================
   * Processa a submissão do formulário após validação
   * Simula o processamento do pagamento
   *
   * @param {Object} evento - Evento de submit do formulário
   */
  const tratarEnvio = (evento) => {
    evento.preventDefault();

    // Valida o formulário antes de processar
    if (!validarFormulario()) {
      return;
    }

    // Inicia o processamento
    setEstaProcessando(true);

    // Simula processamento de 2 segundos
    setTimeout(() => {
      limparCarrinho(); // Limpa o carrinho após compra concluída
      setEstaProcessando(false);
      onPurchaseComplete(); // Notifica o componente pai
    }, 2000);
  };

  /**
   * ============================================
   * Função: Tratar Mudança de Pagamento
   ============================================
   * Atualiza o método de pagamento selecionado
   * Reseta as parcelas para 1 ao mudar para outros métodos
   *
   * @param {string} metodoPagamento - Método de pagamento selecionado
   */
  const tratarMudancaPagamento = (metodoPagamento) => {
    setDadosFormulario(formularioAnterior => ({
      ...formularioAnterior,
      pagamento: metodoPagamento,
      parcelas: 1 // Reseta parcelas ao mudar o método
    }));
  };

  /**
   * ============================================
   * Renderização do Checkout
   ============================================
   */
  return (
    // Overlay que fecha ao clicar fora
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-container" onClick={e => e.stopPropagation()}>
        {/* Cabeçalho do checkout */}
        <div className="checkout-header">
          <h2>Finalizar Compra</h2>
          <button className="checkout-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Formulário de checkout */}
        <form className="checkout-form" onSubmit={tratarEnvio}>
          <div className="checkout-content">
            {/* Seções do formulário */}
            <div className="checkout-sections">
              {/* Seção: Dados Pessoais */}
              <section className="checkout-section">
                <h3>Dados Pessoais</h3>
                <div className="form-grid">
                  {/* Campo: Nome Completo */}
                  <div className="form-group">
                    <label htmlFor="nome">Nome Completo *</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={dadosFormulario.nome}
                      onChange={tratarAlteracaoInput}
                      className={erros.nome ? 'error' : ''}
                      placeholder="Seu nome completo"
                    />
                    {erros.nome && <span className="error-message">{erros.nome}</span>}
                  </div>

                  {/* Campo: E-mail */}
                  <div className="form-group">
                    <label htmlFor="email">E-mail *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={dadosFormulario.email}
                      onChange={tratarAlteracaoInput}
                      className={erros.email ? 'error' : ''}
                      placeholder="seu@email.com"
                    />
                    {erros.email && <span className="error-message">{erros.email}</span>}
                  </div>

                  {/* Campo: Telefone */}
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone *</label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={dadosFormulario.telefone}
                      onChange={tratarAlteracaoInput}
                      className={erros.telefone ? 'error' : ''}
                      placeholder="(11) 99999-9999"
                    />
                    {erros.telefone && <span className="error-message">{erros.telefone}</span>}
                  </div>

                  {/* Campo: CPF */}
                  <div className="form-group">
                    <label htmlFor="cpf">CPF *</label>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={dadosFormulario.cpf}
                      onChange={tratarAlteracaoInput}
                      className={erros.cpf ? 'error' : ''}
                      placeholder="000.000.000-00"
                    />
                    {erros.cpf && <span className="error-message">{erros.cpf}</span>}
                  </div>
                </div>
              </section>

              {/* Seção: Endereço de Entrega */}
              <section className="checkout-section">
                <h3>Endereço de Entrega</h3>
                <div className="form-grid">
                  {/* Campo: Endereço */}
                  <div className="form-group full-width">
                    <label htmlFor="endereco">Endereço *</label>
                    <input
                      type="text"
                      id="endereco"
                      name="endereco"
                      value={dadosFormulario.endereco}
                      onChange={tratarAlteracaoInput}
                      className={erros.endereco ? 'error' : ''}
                      placeholder="Rua, Avenida, etc."
                    />
                    {erros.endereco && <span className="error-message">{erros.endereco}</span>}
                  </div>

                  {/* Campo: Número */}
                  <div className="form-group">
                    <label htmlFor="numero">Número *</label>
                    <input
                      type="text"
                      id="numero"
                      name="numero"
                      value={dadosFormulario.numero}
                      onChange={tratarAlteracaoInput}
                      className={erros.numero ? 'error' : ''}
                      placeholder="123"
                    />
                    {erros.numero && <span className="error-message">{erros.numero}</span>}
                  </div>

                  {/* Campo: Complemento */}
                  <div className="form-group">
                    <label htmlFor="complemento">Complemento</label>
                    <input
                      type="text"
                      id="complemento"
                      name="complemento"
                      value={dadosFormulario.complemento}
                      onChange={tratarAlteracaoInput}
                      placeholder="Apto, sala, etc."
                    />
                  </div>

                  {/* Campo: Cidade */}
                  <div className="form-group">
                    <label htmlFor="cidade">Cidade *</label>
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      value={dadosFormulario.cidade}
                      onChange={tratarAlteracaoInput}
                      className={erros.cidade ? 'error' : ''}
                      placeholder="São Paulo"
                    />
                    {erros.cidade && <span className="error-message">{erros.cidade}</span>}
                  </div>

                  {/* Campo: Estado */}
                  <div className="form-group">
                    <label htmlFor="estado">Estado *</label>
                    <input
                      type="text"
                      id="estado"
                      name="estado"
                      value={dadosFormulario.estado}
                      onChange={tratarAlteracaoInput}
                      className={erros.estado ? 'error' : ''}
                      placeholder="SP"
                    />
                    {erros.estado && <span className="error-message">{erros.estado}</span>}
                  </div>

                  {/* Campo: CEP */}
                  <div className="form-group">
                    <label htmlFor="cep">CEP *</label>
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      value={dadosFormulario.cep}
                      onChange={tratarAlteracaoInput}
                      className={erros.cep ? 'error' : ''}
                      placeholder="00000-000"
                    />
                    {erros.cep && <span className="error-message">{erros.cep}</span>}
                  </div>
                </div>
              </section>

              {/* Seção: Forma de Pagamento */}
              <section className="checkout-section">
                <h3>Forma de Pagamento</h3>
                <div className="payment-methods">
                  {/* Opção: Cartão de Crédito */}
                  <label className={`payment-option ${dadosFormulario.pagamento === 'credit' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="pagamento"
                      value="credit"
                      checked={dadosFormulario.pagamento === 'credit'}
                      onChange={() => tratarMudancaPagamento('credit')}
                    />
                    <div className="payment-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                    </div>
                    <span className="payment-label">Cartão de Crédito</span>
                  </label>

                  {/* Opção: Cartão de Débito */}
                  <label className={`payment-option ${dadosFormulario.pagamento === 'debit' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="pagamento"
                      value="debit"
                      checked={dadosFormulario.pagamento === 'debit'}
                      onChange={() => tratarMudancaPagamento('debit')}
                    />
                    <div className="payment-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                    </div>
                    <span className="payment-label">Cartão de Débito</span>
                  </label>

                  {/* Opção: PIX */}
                  <label className={`payment-option ${dadosFormulario.pagamento === 'pix' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="pagamento"
                      value="pix"
                      checked={dadosFormulario.pagamento === 'pix'}
                      onChange={() => tratarMudancaPagamento('pix')}
                    />
                    <div className="payment-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <span className="payment-label">PIX</span>
                  </label>

                  {/* Opção: Boleto */}
                  <label className={`payment-option ${dadosFormulario.pagamento === 'boleto' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="pagamento"
                      value="boleto"
                      checked={dadosFormulario.pagamento === 'boleto'}
                      onChange={() => tratarMudancaPagamento('boleto')}
                    />
                    <div className="payment-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </div>
                    <span className="payment-label">Boleto</span>
                  </label>
                </div>

                {/* Seleção de parcelas (apenas para cartão de crédito) */}
                {dadosFormulario.pagamento === 'credit' && (
                  <div className="parcelas-select">
                    <label htmlFor="parcelas">Número de Parcelas</label>
                    <select
                      id="parcelas"
                      name="parcelas"
                      value={dadosFormulario.parcelas}
                      onChange={tratarAlteracaoInput}
                    >
                      {opcoesParcelas.map(opcao => (
                        <option key={opcao.value} value={opcao.value}>
                          {opcao.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </section>
            </div>

            {/* Resumo do pedido (sidebar) */}
            <div className="checkout-summary">
              <h3>Resumo do Pedido</h3>

              {/* Lista de itens */}
              <div className="summary-items">
                {itens.map((item, indice) => (
                  <div key={`${item.id}-${item.cor}-${item.armazenamento}-${indice}`} className="summary-item">
                    <img src={item.imagem} alt={item.nome} />
                    <div className="summary-item-info">
                      <span className="summary-item-name">{item.nome}</span>
                      <span className="summary-item-qty">Qty: {item.quantidade}</span>
                    </div>
                    <span className="summary-item-price">{formatarPreco(item.preco * item.quantidade)}</span>
                  </div>
                ))}
              </div>

              {/* Totais */}
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatarPreco(totalCarrinho)}</span>
                </div>
                <div className="summary-row">
                  <span>Frete</span>
                  <span className="free-shipping">Grátis</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatarPreco(totalCarrinho)}</span>
                </div>
              </div>

              {/* Botão de submit */}
              <button
                type="submit"
                className="submit-order-btn"
                disabled={estaProcessando}
              >
                {estaProcessando ? (
                  <span className="processing">
                    <svg className="spinner" width="20" height="20" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" />
                    </svg>
                    Processando...
                  </span>
                ) : (
                  `Pagar ${formatarPreco(totalCarrinho)}`
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
