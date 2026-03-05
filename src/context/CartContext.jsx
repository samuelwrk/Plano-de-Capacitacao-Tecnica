/**
 * ============================================
 * Context API para Gerenciamento do Carrinho
 * ============================================
 *
 * Este arquivo implementa o gerenciamento de estado global do carrinho de compras
 * utilizando React Context API + useReducer. Fornece funcionalidades para:
 * - Adicionar produtos ao carrinho
 * - Remover produtos do carrinho
 * - Atualizar quantidade de produtos
 * - Limpar todo o carrinho
 * - Persistência de dados via localStorage
 *
 * Hook personalizado: useCarrinho() - Utilizado para acessar as funcionalidades do carrinho em qualquer componente
 */

import React, { createContext, useContext, useReducer, useMemo, useEffect, useCallback } from 'react';

/**
 * Criação do Context para o carrinho de compras
 * Permite que componentes filhos acessem o estado e funções do carrinho
 */
const CarrinhoContext = createContext();

/**
 * ============================================
 * Constantes de Ações do Reducer
 * ============================================
 * Definem os tipos de operações que podem ser realizadas no carrinho
 */
export const ACOES_CARRINHO = {
  ADICIONAR_ITEM: 'ADICIONAR_ITEM',
  REMOVER_ITEM: 'REMOVER_ITEM',
  ATUALIZAR_QUANTIDADE: 'ATUALIZAR_QUANTIDADE',
  LIMPAR_CARRINHO: 'LIMPAR_CARRINHO',
  CARREGAR_CARRINHO: 'CARREGAR_CARRINHO'
};

/**
 * ============================================
 * Estado Inicial do Carrinho
 * ============================================
 * Estado padrão quando a aplicação inicia ou quando o carrinho é limpo
 */
const estadoInicial = {
  itens: []
};

/**
 * ============================================
 * Reducer - Função Pure de Gerenciamento de Estado
 * ============================================
 * Responsável por processar as ações e retornar o novo estado do carrinho
 *
 * @param {Object} estado - Estado atual do carrinho
 * @param {Object} acao - Ação contendo tipo e payload com dados necessários
 * @returns {Object} Novo estado do carrinho
 */
const carrinhoReducer = (estado, acao) => {
  switch (acao.tipo) {
    // Adiciona um novo item ao carrinho ou atualiza quantidade se já existir
    case ACOES_CARRINHO.ADICIONAR_ITEM: {
      const { produto, cor, armazenamento, quantidade } = acao.payload;

      // Verifica se o item já existe no carrinho (mesmo produto, cor e armazenamento)
      const indiceItemExistente = estado.itens.findIndex(
        item => item.id === produto.id && item.cor === cor && item.armazenamento === armazenamento
      );

      // Se o item já existe, atualiza a quantidade
      if (indiceItemExistente >= 0) {
        const itensAtualizados = [...estado.itens];
        itensAtualizados[indiceItemExistente] = {
          ...itensAtualizados[indiceItemExistente],
          quantidade: itensAtualizados[indiceItemExistente].quantidade + quantidade
        };
        return { ...estado, itens: itensAtualizados };
      }

      // Se o item não existe, adiciona como novo item
      return {
        ...estado,
        itens: [...estado.itens, {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagens[0],
          cor,
          armazenamento,
          quantidade
        }]
      };
    }

    // Remove um item específico do carrinho baseado em id, cor e armazenamento
    case ACOES_CARRINHO.REMOVER_ITEM:
      return {
        ...estado,
        itens: estado.itens.filter(
          item => !(item.id === acao.payload.id && item.cor === acao.payload.cor && item.armazenamento === acao.payload.armazenamento)
        )
      };

    // Atualiza a quantidade de um item específico
    case ACOES_CARRINHO.ATUALIZAR_QUANTIDADE: {
      const { id, cor, armazenamento, quantidade } = acao.payload;

      // Se quantidade for menor ou igual a zero, remove o item
      if (quantidade <= 0) {
        return {
          ...estado,
          itens: estado.itens.filter(
            item => !(item.id === id && item.cor === cor && item.armazenamento === armazenamento)
          )
        };
      }

      // Atualiza a quantidade do item
      return {
        ...estado,
        itens: estado.itens.map(item =>
          item.id === id && item.cor === cor && item.armazenamento === armazenamento
            ? { ...item, quantidade }
            : item
        )
      };
    }

    // Limpa todos os itens do carrinho
    case ACOES_CARRINHO.LIMPAR_CARRINHO:
      return { ...estado, itens: [] };

    // Carrega o carrinho do localStorage ao iniciar a aplicação
    case ACOES_CARRINHO.CARREGAR_CARRINHO:
      return { ...estado, itens: acao.payload };

    // Retorna o estado atual para qualquer ação desconhecida
    default:
      return estado;
  }
};

/**
 * ============================================
 * Componente Provider - Fornece Contexto aos Filhos
 * ============================================
 * Envolve a aplicação para disponibilizar as funcionalidades do carrinho
 *
 * @param {ReactNode} children - Componentes filhos que terão acesso ao contexto
 */
export const ProvedorCarrinho = ({ children }) => {
  // useReducer: gerencia o estado do carrinho de forma previsível
  const [estado, despachar] = useReducer(carrinhoReducer, estadoInicial);

  /**
   * ============================================
   * Efeito: Carregar Carrinho do localStorage
   ============================================
   * Executado apenas uma vez ao montar o componente
   * Restaura os itens do carrinho salvos no navegador do usuário
   */
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('electrostore_carrinho');
    if (carrinhoSalvo) {
      try {
        const carrinhoAnalisado = JSON.parse(carrinhoSalvo);
        despachar({ tipo: ACOES_CARRINHO.CARREGAR_CARRINHO, payload: carrinhoAnalisado });
      } catch (erro) {
        console.error('Erro ao carregar carrinho do localStorage:', erro);
      }
    }
  }, []);

  /**
   * ============================================
   * Efeito: Salvar Carrinho no localStorage
   ============================================
   * Executado sempre que o estado do carrinho muda
   * Persiste os dados para que não sejam perdidos ao recarregar a página
   */
  useEffect(() => {
    localStorage.setItem('electrostore_carrinho', JSON.stringify(estado.itens));
  }, [estado.itens]);

  /**
   * ============================================
   * Função: Adicionar Item ao Carrinho
   ============================================
   * Adiciona um produto com cor, armazenamento e quantidade específicos
   * Utiliza useCallback para evitar recriação desnecessária da função
   *
   * @param {Object} produto - Dados completos do produto
   * @param {string} cor - Cor selecionada pelo usuário
   * @param {string} armazenamento - Armazenamento selecionado pelo usuário
   * @param {number} quantidade - Quantidade de itens a adicionar
   */
  const adicionarItem = useCallback((produto, cor, armazenamento, quantidade) => {
    despachar({
      tipo: ACOES_CARRINHO.ADICIONAR_ITEM,
      payload: { produto, cor, armazenamento, quantidade }
    });
  }, []);

  /**
   * ============================================
   * Função: Remover Item do Carrinho
   ============================================
   * Remove um item específico baseado em sua identificação única
   *
   * @param {string} id - ID único do produto
   * @param {string} cor - Cor do produto
   * @param {string} armazenamento - Armazenamento do produto
   */
  const removerItem = useCallback((id, cor, armazenamento) => {
    despachar({
      tipo: ACOES_CARRINHO.REMOVER_ITEM,
      payload: { id, cor, armazenamento }
    });
  }, []);

  /**
   * ============================================
   * Função: Atualizar Quantidade de Item
   ============================================
   * Altera a quantidade de um item específico no carrinho
   *
   * @param {string} id - ID único do produto
   * @param {string} cor - Cor do produto
   * @param {string} armazenamento - Armazenamento do produto
   * @param {number} quantidade - Nova quantidade desejada
   */
  const atualizarQuantidade = useCallback((id, cor, armazenamento, quantidade) => {
    despachar({
      tipo: ACOES_CARRINHO.ATUALIZAR_QUANTIDADE,
      payload: { id, cor, armazenamento, quantidade }
    });
  }, []);

  /**
   * ============================================
   * Função: Limpar Carrinho
   ============================================
   * Remove todos os itens do carrinho de uma vez
   */
  const limparCarrinho = useCallback(() => {
    despachar({ tipo: ACOES_CARRINHO.LIMPAR_CARRINHO });
  }, []);

  /**
   * ============================================
   * Hook useMemo: Calcular Total do Carrinho
   ============================================
   * Calcula o valor total da compra somando (preço × quantidade) de cada item
   * Recalcula apenas quando os itens mudam
   */
  const totalCarrinho = useMemo(() => {
    return estado.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  }, [estado.itens]);

  /**
   * ============================================
   * Hook useMemo: Calcular Quantidade Total de Itens
   ============================================
   * Soma a quantidade de todos os itens no carrinho
   * Recalcula apenas quando os itens mudam
   */
  const quantidadeItens = useMemo(() => {
    return estado.itens.reduce((quantidade, item) => quantidade + item.quantidade, 0);
  }, [estado.itens]);

  /**
   * ============================================
   * Objeto de Valor do Contexto
   ============================================
   * Agrupa todos os dados e funções que serão disponibilizados aos componentes filhos
   */
  const valorContexto = {
    itens: estado.itens,
    totalCarrinho,
    quantidadeItens,
    adicionarItem,
    removerItem,
    atualizarQuantidade,
    limparCarrinho
  };

  return (
    <CarrinhoContext.Provider value={valorContexto}>
      {children}
    </CarrinhoContext.Provider>
  );
};

/**
 * ============================================
 * Hook Personalizado: useCarrinho
 * ============================================
 * Hook para acessar as funcionalidades do carrinho em qualquer componente
 * Deve ser usado dentro de um ProvedorCarrinho
 *
 * @throws Error se utilizado fora do ProvedorCarrinho
 * @returns {Object} Objeto contendo estado e funções do carrinho
 *
 * @example
 * const { itens, adicionarItem, removerItem } = useCarrinho();
 */
export const useCarrinho = () => {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) {
    throw new Error('useCarrinho deve ser usado dentro de um ProvedorCarrinho');
  }
  return contexto;
};

// Mantém compatibilidade com código existente que usa useCart
export const useCart = useCarrinho;

// Exportação padrão para compatibilidade
export default CarrinhoContext;
