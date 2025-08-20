import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Swag, Distribuicao } from '../types';
import { Plus, Gift, Download } from 'lucide-react';

export function SwagsTab() {
  const { state, dispatch } = useApp();
  const [showAddSwag, setShowAddSwag] = useState(false);
  const [showDistribuicao, setShowDistribuicao] = useState(false);
  const [showEditDistribuicao, setShowEditDistribuicao] = useState(false);
  const [selectedSwag, setSelectedSwag] = useState<Swag | null>(null);
  const [selectedDistribuicao, setSelectedDistribuicao] = useState<Distribuicao | null>(null);
  
  // Formulário de novo swag
  const [novoSwag, setNovoSwag] = useState({
    nome: '',
    tipo: 'OUTRO' as const,
    quantidadeInicial: 0
  });

  // Formulário de distribuição
  const [distribuicao, setDistribuicao] = useState({
    quantidade: 1,
    nomeGanhador: '',
    emailGanhador: ''
  });

  // Formulário de edição de distribuição
  const [editDistribuicao, setEditDistribuicao] = useState({
    nomeGanhador: '',
    emailGanhador: ''
  });

  const handleAddSwag = () => {
    if (!novoSwag.nome || novoSwag.quantidadeInicial <= 0) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const swag: Swag = {
      id: Date.now().toString(),
      nome: novoSwag.nome,
      tipo: novoSwag.tipo,
      quantidadeInicial: novoSwag.quantidadeInicial,
      quantidadeAtual: novoSwag.quantidadeInicial,
      quantidadeDistribuida: 0
    };

    dispatch({ type: 'ADD_SWAG', payload: swag });
    
    // Salvar no localStorage
    const swagsAtualizados = [...state.swags, swag];
    localStorage.setItem('swags', JSON.stringify(swagsAtualizados));
    
    // Limpar formulário
    setNovoSwag({ nome: '', tipo: 'OUTRO', quantidadeInicial: 0 });
    setShowAddSwag(false);
    
    alert('Swag adicionado com sucesso!');
  };

  const handleDistribuicao = () => {
    if (!selectedSwag) return;
    
    if (distribuicao.quantidade <= 0 || distribuicao.quantidade > selectedSwag.quantidadeAtual) {
      alert('Quantidade inválida para distribuição.');
      return;
    }

    if (selectedSwag.tipo === 'LICENCA' && (!distribuicao.nomeGanhador || !distribuicao.emailGanhador)) {
      alert('Para licenças, é obrigatório informar nome e email do ganhador.');
      return;
    }

    // Criar distribuição
    const novaDistribuicao: Distribuicao = {
      id: Date.now().toString(),
      swagId: selectedSwag.id,
      swagNome: selectedSwag.nome,
      swagTipo: selectedSwag.tipo,
      quantidade: distribuicao.quantidade,
      nomeGanhador: distribuicao.nomeGanhador || undefined,
      emailGanhador: distribuicao.emailGanhador || undefined,
      data: new Date()
    };

    dispatch({ type: 'ADD_DISTRIBUICAO', payload: novaDistribuicao });

    // Atualizar estoque do swag
    const swagAtualizado: Swag = {
      ...selectedSwag,
      quantidadeAtual: selectedSwag.quantidadeAtual - distribuicao.quantidade,
      quantidadeDistribuida: selectedSwag.quantidadeDistribuida + distribuicao.quantidade
    };

    const swagsAtualizados = state.swags.map(s => 
      s.id === selectedSwag.id ? swagAtualizado : s
    );
    
    dispatch({ type: 'SET_SWAGS', payload: swagsAtualizados });
    
    // Salvar no localStorage
    localStorage.setItem('swags', JSON.stringify(swagsAtualizados));
    localStorage.setItem('distribuicoes', JSON.stringify([...state.distribuicoes, novaDistribuicao]));
    
    // Limpar formulário
    setDistribuicao({ quantidade: 1, nomeGanhador: '', emailGanhador: '' });
    setSelectedSwag(null);
    setShowDistribuicao(false);
    
    alert('Distribuição registrada com sucesso!');
  };

  const openDistribuicao = (swag: Swag) => {
    setSelectedSwag(swag);
    setDistribuicao({ quantidade: 1, nomeGanhador: '', emailGanhador: '' });
    setShowDistribuicao(true);
  };

  const openEditDistribuicao = (distribuicao: Distribuicao) => {
    setSelectedDistribuicao(distribuicao);
    setEditDistribuicao({
      nomeGanhador: distribuicao.nomeGanhador || '',
      emailGanhador: distribuicao.emailGanhador || ''
    });
    setShowEditDistribuicao(true);
  };

  const handleEditDistribuicao = () => {
    if (!selectedDistribuicao) return;

    // Atualizar a distribuição
    const distribuicaoAtualizada: Distribuicao = {
      ...selectedDistribuicao,
      nomeGanhador: editDistribuicao.nomeGanhador || undefined,
      emailGanhador: editDistribuicao.emailGanhador || undefined
    };

    // Atualizar no estado global
    const distribuicoesAtualizadas = state.distribuicoes.map(d => 
      d.id === selectedDistribuicao.id ? distribuicaoAtualizada : d
    );

    dispatch({ type: 'SET_DISTRIBUICOES', payload: distribuicoesAtualizadas });

    // Salvar no localStorage
    localStorage.setItem('distribuicoes', JSON.stringify(distribuicoesAtualizadas));

    // Limpar e fechar
    setEditDistribuicao({ nomeGanhador: '', emailGanhador: '' });
    setSelectedDistribuicao(null);
    setShowEditDistribuicao(false);

    alert('Distribuição editada com sucesso!');
  };

  const handleDeleteDistribuicao = (distribuicao: Distribuicao) => {
    if (!window.confirm(`Tem certeza que deseja deletar a distribuição de "${distribuicao.swagNome}"?`)) {
      return;
    }

    // Encontrar o swag correspondente
    const swag = state.swags.find(s => s.id === distribuicao.swagId);
    if (!swag) return;

    // Devolver quantidade ao estoque
    const swagAtualizado: Swag = {
      ...swag,
      quantidadeAtual: swag.quantidadeAtual + distribuicao.quantidade,
      quantidadeDistribuida: swag.quantidadeDistribuida - distribuicao.quantidade
    };

    // Atualizar swags
    const swagsAtualizados = state.swags.map(s => 
      s.id === swag.id ? swagAtualizado : s
    );

    // Remover distribuição
    const distribuicoesAtualizadas = state.distribuicoes.filter(d => 
      d.id !== distribuicao.id
    );

    // Atualizar estado global
    dispatch({ type: 'SET_SWAGS', payload: swagsAtualizados });
    dispatch({ type: 'SET_DISTRIBUICOES', payload: distribuicoesAtualizadas });

    // Salvar no localStorage
    localStorage.setItem('swags', JSON.stringify(swagsAtualizados));
    localStorage.setItem('distribuicoes', JSON.stringify(distribuicoesAtualizadas));

    alert(`Distribuição deletada! ${distribuicao.quantidade} unidade(s) devolvida(s) ao estoque.`);
  };

  const getTipoLabel = (tipo: string) => {
    const labels = {
      LICENCA: 'Licença',
      OUTRO: 'Outro'
    };
    return labels[tipo as keyof typeof labels] || tipo;
  };

  const getTipoColor = (tipo: string) => {
    const colors = {
      LICENCA: 'badge-success',
      OUTRO: 'badge-secondary'
    };
    return colors[tipo as keyof typeof colors] || 'badge-secondary';
  };

  return (
    <div>
      {/* Adicionar Novo Swag */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🎁 Controle de Swags</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddSwag(true)}
          >
            <Plus size={16} />
            Novo Swag
          </button>
        </div>

        {/* Lista de Swags */}
        <div className="grid grid-2 gap-4">
          {state.swags.map(swag => (
            <div key={swag.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{swag.nome}</h3>
                  <span className={`badge ${getTipoColor(swag.tipo)}`}>
                    {getTipoLabel(swag.tipo)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {swag.quantidadeAtual}
                  </div>
                  <div className="text-sm text-gray-500">em estoque</div>
                </div>
              </div>
              
              <div className="grid grid-2 gap-2 mb-3 text-sm">
                <div>
                  <span className="text-gray-600">Inicial:</span>
                  <span className="font-medium ml-1">{swag.quantidadeInicial}</span>
                </div>
                <div>
                  <span className="text-gray-600">Distribuído:</span>
                  <span className="font-medium ml-1">{swag.quantidadeDistribuida}</span>
                </div>
              </div>
              
              <button
                className="btn btn-success w-full"
                onClick={() => openDistribuicao(swag)}
                disabled={swag.quantidadeAtual === 0}
              >
                <Download size={16} />
                Distribuir
              </button>
            </div>
          ))}
        </div>

        {state.swags.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Gift size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhum swag cadastrado ainda.</p>
            <p>Clique em "Novo Swag" para começar!</p>
          </div>
        )}
      </div>

      {/* Histórico de Distribuições de Swags */}
      {state.distribuicoes.length > 0 && (
        <div className="card mt-6">
          <div className="card-header">
            <h3 className="card-title">📋 Histórico de Distribuições de Swags</h3>
            <p className="card-description">Registro de todas as distribuições realizadas</p>
          </div>
          
                                <div className="overflow-x-auto">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Data</th>
                              <th>Swag</th>
                              <th>Tipo</th>
                              <th>Quantidade</th>
                              <th>Ganhador</th>
                              <th>Email</th>
                              <th>Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {state.distribuicoes
                              .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                              .map(distribuicao => (
                                <tr key={distribuicao.id}>
                                  <td className="font-medium" data-label="Data">
                                    {new Date(distribuicao.data).toLocaleDateString('pt-BR')}
                                  </td>
                                  <td className="font-medium" data-label="Swag">
                                    {distribuicao.swagNome}
                                  </td>
                                  <td data-label="Tipo">
                                    <span className={`badge ${getTipoColor(distribuicao.swagTipo)}`}>
                                      {getTipoLabel(distribuicao.swagTipo)}
                                    </span>
                                  </td>
                                  <td className="font-medium" data-label="Quantidade">
                                    {distribuicao.quantidade}
                                  </td>
                                  <td data-label="Ganhador">
                                    {distribuicao.nomeGanhador ? (
                                      <span className="font-medium text-green-600">{distribuicao.nomeGanhador}</span>
                                    ) : (
                                      <span className="text-gray-400">-</span>
                                    )}
                                  </td>
                                  <td data-label="Email">
                                    {distribuicao.emailGanhador ? (
                                      <span className="font-medium text-blue-600">{distribuicao.emailGanhador}</span>
                                    ) : (
                                      <span className="text-gray-400">-</span>
                                    )}
                                  </td>
                                  <td data-label="Ações">
                                    {distribuicao.swagTipo === 'LICENCA' && (
                                      <div className="flex items-center justify-center gap-3 py-1">
                                        <button
                                          type="button"
                                          style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '7px 7px',
                                            borderRadius: '6px',
                                            backgroundColor: '#3b82f6',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                            minWidth: '40px',
                                            marginRight: '5px',
                                            transition: 'all 0.2s'
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#2563eb';
                                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#3b82f6';
                                            e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                                          }}
                                          onClick={() => openEditDistribuicao(distribuicao)}
                                          title="Editar distribuição"
                                        >
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                          </svg>
                                        </button>
                                        <button
                                          type="button"
                                          style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '7px 7px',
                                            borderRadius: '6px',
                                            backgroundColor: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                            minWidth: '40px',
                                            transition: 'all 0.2s'
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#dc2626';
                                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#ef4444';
                                            e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                                          }}
                                          onClick={() => handleDeleteDistribuicao(distribuicao)}
                                          title="Deletar distribuição"
                                        >
                                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
          
          <div className="card-footer">
            <button
              className="btn btn-outline"
              onClick={() => {
                // Exportar para CSV
                const csvContent = [
                  ['Data', 'Swag', 'Tipo', 'Quantidade', 'Ganhador', 'Email'],
                  ...state.distribuicoes.map(d => [
                    new Date(d.data).toLocaleDateString('pt-BR'),
                    d.swagNome,
                    getTipoLabel(d.swagTipo),
                    d.quantidade.toString(),
                    d.nomeGanhador || '-',
                    d.emailGanhador || '-'
                  ])
                ].map(row => row.join(',')).join('\n');
                
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `historico-swags-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                window.URL.revokeObjectURL(url);
              }}
            >
              <Download size={16} />
              Exportar CSV
            </button>
          </div>
        </div>
      )}

      {/* Modal Adicionar Swag */}
      {showAddSwag && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="text-lg font-bold">Adicionar Novo Swag</h3>
              <button
                className="modal-close"
                onClick={() => setShowAddSwag(false)}
              >
                ×
              </button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Nome do Swag</label>
              <input
                type="text"
                className="form-input"
                value={novoSwag.nome}
                onChange={(e) => setNovoSwag(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Ex: Licença Caido, Caneca BBV..."
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Tipo</label>
              <select
                className="form-input"
                value={novoSwag.tipo}
                onChange={(e) => setNovoSwag(prev => ({ ...prev, tipo: e.target.value as any }))}
              >
                <option value="LICENCA">Licença</option>
                <option value="OUTRO">Outro</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Quantidade Inicial</label>
              <input
                type="number"
                className="form-input"
                value={novoSwag.quantidadeInicial}
                onChange={(e) => setNovoSwag(prev => ({ ...prev, quantidadeInicial: parseInt(e.target.value) || 0 }))}
                min="1"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                className="btn btn-secondary flex-1"
                onClick={() => setShowAddSwag(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary flex-1"
                onClick={handleAddSwag}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Distribuição */}
      {showDistribuicao && selectedSwag && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="text-lg font-bold">Distribuir {selectedSwag.nome}</h3>
              <button
                className="modal-close"
                onClick={() => setShowDistribuicao(false)}
              >
                ×
              </button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Quantidade</label>
              <input
                type="number"
                className="form-input"
                value={distribuicao.quantidade}
                onChange={(e) => setDistribuicao(prev => ({ ...prev, quantidade: parseInt(e.target.value) || 0 }))}
                min="1"
                max={selectedSwag.quantidadeAtual}
              />
              <small className="text-gray-500">
                Disponível: {selectedSwag.quantidadeAtual}
              </small>
            </div>
            
            {selectedSwag.tipo === 'LICENCA' && (
              <>
                <div className="form-group">
                  <label className="form-label">Nome do Ganhador</label>
                  <input
                    type="text"
                    className="form-input"
                    value={distribuicao.nomeGanhador}
                    onChange={(e) => setDistribuicao(prev => ({ ...prev, nomeGanhador: e.target.value }))}
                    placeholder="Nome completo"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email do Ganhador</label>
                  <input
                    type="email"
                    className="form-input"
                    value={distribuicao.emailGanhador}
                    onChange={(e) => setDistribuicao(prev => ({ ...prev, emailGanhador: e.target.value }))}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </>
            )}
            
            <div className="flex gap-3">
              <button
                className="btn btn-secondary flex-1"
                onClick={() => setShowDistribuicao(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-success flex-1"
                onClick={handleDistribuicao}
              >
                Confirmar Distribuição
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição de Distribuição */}
      {showEditDistribuicao && selectedDistribuicao && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="text-lg font-bold">✏️ Editar Distribuição - {selectedDistribuicao.swagNome}</h3>
              <button
                className="modal-close"
                onClick={() => {
                  setShowEditDistribuicao(false);
                  setSelectedDistribuicao(null);
                  setEditDistribuicao({ nomeGanhador: '', emailGanhador: '' });
                }}
              >
                ×
              </button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Nome do Ganhador</label>
              <input
                type="text"
                className="form-input"
                value={editDistribuicao.nomeGanhador}
                onChange={(e) => setEditDistribuicao(prev => ({ ...prev, nomeGanhador: e.target.value }))}
                placeholder="Nome completo"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email do Ganhador</label>
              <input
                type="email"
                className="form-input"
                value={editDistribuicao.emailGanhador}
                onChange={(e) => setEditDistribuicao(prev => ({ ...prev, emailGanhador: e.target.value }))}
                placeholder="email@exemplo.com"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                className="btn btn-secondary flex-1"
                onClick={() => {
                  setShowEditDistribuicao(false);
                  setSelectedDistribuicao(null);
                  setEditDistribuicao({ nomeGanhador: '', emailGanhador: '' });
                }}
              >
                Cancelar
              </button>
              <button
                className="btn btn-success flex-1"
                onClick={handleEditDistribuicao}
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
