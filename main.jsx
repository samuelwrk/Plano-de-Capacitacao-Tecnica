// --- DESESTRUTURAÇÃO DE GLOBAIS (CDN) ---
const { useState, useEffect } = React;

/**
 * COMPONENTE: TarefaItem
 * Responsabilidade: Renderizar uma única linha da lista (Jogo).
 * Práticas: Componente burro (stateless), recebe ações via props.
 */
const TarefaItem = ({
    tarefa,
    isEditando,
    textoEdicao,
    onToggle,
    onDelete,
    onEdit,
    onTextoEdicaoChange,
    onSalvarEdicao,
    onCancelarEdicao
}) => {
    
    // Renderização no modo de EDIÇÃO
    if (isEditando) {
        return (
            <li className="backlog-item editando">
                <div className="backlog-edit-input">
                    <input
                        type="text"
                        value={textoEdicao}
                        onChange={onTextoEdicaoChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onSalvarEdicao();
                            if (e.key === 'Escape') onCancelarEdicao();
                        }}
                        autoFocus
                        className="edit-input"
                    />
                </div>
                <div className="backlog-actions">
                    <button onClick={onSalvarEdicao} className="btn-salvar" title="Salvar">✓</button>
                    <button onClick={onCancelarEdicao} className="btn-cancelar" title="Cancelar">✕</button>
                </div>
            </li>
        );
    }

    // Renderização no modo de VISUALIZAÇÃO
    return (
        <li className={`backlog-item ${tarefa.completa ? 'completa' : ''}`}>
            <div className="backlog-checkbox">
                <input
                    type="checkbox"
                    checked={tarefa.completa}
                    onChange={onToggle}
                    id={`backlog-${tarefa.id}`}
                />
                <label htmlFor={`backlog-${tarefa.id}`} className="checkbox-custom"></label>
            </div>

            <div className="backlog-texto" onClick={onToggle}>
                <span className="texto-tarefa">{tarefa.texto}</span>
                <span className="data-tarefa">Adicionado em: {tarefa.dataCriacao}</span>
            </div>

            <div className="backlog-actions">
                <button onClick={onEdit} className="btn-editar" title="Editar">✎</button>
                <button onClick={onDelete} className="btn-excluir" title="Excluir">🗑</button>
            </div>
        </li>
    );
};

/**
 * COMPONENTE PRINCIPAL: BacklogApp
 * Responsabilidade: Gerenciar o estado global da lista, persistência e lógica de negócio.
 */
function BacklogApp() {
    // --- 1. ESTADOS ---
    
    // Inicialização "lazy" para evitar leitura desnecessária do localStorage em cada re-render
    const [tarefas, setTarefas] = useState(() => {
        const salvo = localStorage.getItem('backlog-jogos-react');
        return salvo ? JSON.parse(salvo) : [];
    });

    const [textoInput, setTextoInput] = useState("");
    const [filtro, setFiltro] = useState('todas');
    const [tarefaEditando, setTarefaEditando] = useState(null);
    const [textoEditando, setTextoEditando] = useState("");

    // --- 2. EFEITOS (SIDE EFFECTS) ---

    // Persistência: Atualiza o localStorage sempre que o array de tarefas mudar
    useEffect(() => {
        localStorage.setItem('backlog-jogos-react', JSON.stringify(tarefas));
    }, [tarefas]);

    // --- 3. LÓGICA DE MANIPULAÇÃO (HANDLERS) ---

    const adicionarTarefa = (e) => {
        e.preventDefault();
        if (!textoInput.trim()) return;

        const novaTarefa = {
            id: Date.now(),
            texto: textoInput.trim(),
            completa: false,
            dataCriacao: new Date().toLocaleDateString('pt-BR'),
        };

        // Prática: Uso de callback funcional para garantir estado atualizado
        setTarefas(prev => [...prev, novaTarefa]);
        setTextoInput("");
    };

    const alternarStatusTarefa = (id) => {
        setTarefas(prev => prev.map(t => 
            t.id === id ? { ...t, completa: !t.completa } : t
        ));
    };

    const excluirTarefa = (id) => {
        if (window.confirm("Deseja remover este jogo do backlog?")) {
            setTarefas(prev => prev.filter(t => t.id !== id));
        }
    };

    const salvarEdicao = () => {
        if (!textoEditando.trim()) return;
        setTarefas(prev => prev.map(t => 
            t.id === tarefaEditando ? { ...t, texto: textoEditando.trim() } : t
        ));
        setTarefaEditando(null);
    };

    // --- 4. ESTADOS DERIVADOS (COMPUTED VALUES) ---
    
    const tarefasFiltradas = tarefas.filter(t => {
        if (filtro === 'ativas') return !t.completa;
        if (filtro === 'completas') return t.completa;
        return true;
    });

    const stats = {
        total: tarefas.length,
        completas: tarefas.filter(t => t.completa).length,
        ativas: tarefas.length - tarefas.filter(t => t.completa).length
    };

    // --- 5. RENDERIZAÇÃO ---

    return (
        <div className="backlog-app">
            {/* Cabeçalho e Estatísticas */}
            <header className="backlog-header">
                <div className="backlog-stats">
                    <span className="stat-item"><strong>{stats.total}</strong> Total</span>
                    <span className="stat-item stat-ativas"><strong>{stats.ativas}</strong> Para Jogar</span>
                    <span className="stat-item stat-completas"><strong>{stats.completas}</strong> Jogados</span>
                </div>
            </header>

            {/* Formulário de Adição */}
            <form onSubmit={adicionarTarefa} className="backlog-form">
                <input
                    type="text"
                    value={textoInput}
                    onChange={(e) => setTextoInput(e.target.value)}
                    placeholder="Nome do jogo..."
                    className="backlog-input"
                />
                <button type="submit" className="backlog-btn-add">Adicionar</button>
            </form>

            {/* Filtros */}
            <nav className="backlog-filtros">
                {['todas', 'ativas', 'completas'].map(f => (
                    <button
                        key={f}
                        className={`btn-filtro ${filtro === f ? 'ativo' : ''}`}
                        onClick={() => setFiltro(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </nav>

            {/* Lista de Jogos */}
            <ul className="backlog-list">
                {tarefasFiltradas.length > 0 ? (
                    tarefasFiltradas.map(tarefa => (
                        <TarefaItem
                            key={tarefa.id}
                            tarefa={tarefa}
                            isEditando={tarefaEditando === tarefa.id}
                            textoEdicao={textoEditando}
                            onToggle={() => alternarStatusTarefa(tarefa.id)}
                            onDelete={() => excluirTarefa(tarefa.id)}
                            onEdit={() => {
                                setTarefaEditando(tarefa.id);
                                setTextoEditando(tarefa.texto);
                            }}
                            onTextoEdicaoChange={(e) => setTextoEditando(e.target.value)}
                            onSalvarEdicao={salvarEdicao}
                            onCancelarEdicao={() => setTarefaEditando(null)}
                        />
                    ))
                ) : (
                    <div className="backlog-vazio">
                        <p>Nenhum jogo encontrado nesta categoria.</p>
                    </div>
                )}
            </ul>

            {/* Botão de Limpeza Condicional */}
            {stats.completas > 0 && (
                <div className="backlog-acoes">
                    <button 
                        onClick={() => setTarefas(prev => prev.filter(t => !t.completa))} 
                        className="btn-limpar"
                    >
                        Limpar Jogados ({stats.completas})
                    </button>
                </div>
            )}
        </div>
    );
}

/**
 * COMPONENTE DE CLASSE (Legado/Referência)
 * Mantido para fins didáticos de comparação entre Classes e Hooks.
 */
class ExemploContador extends React.Component {
    constructor(props) {
        super(props);
        this.state = { contagem: 0 };
    }

    incrementar = () => {
        this.setState(prevState => ({ contagem: prevState.contagem + 1 }));
    };

    render() {
        return (
            <div className="exemplo-contador-classe">
                <h4>{this.props.titulo}</h4>
                <p>Cliques: {this.state.contagem}</p>
                <button onClick={this.incrementar}>+1</button>
            </div>
        );
    }
}

// --- INICIALIZAÇÃO DA APLICAÇÃO ---
const root = ReactDOM.createRoot(document.getElementById('root-backlog'));
root.render(<BacklogApp />);