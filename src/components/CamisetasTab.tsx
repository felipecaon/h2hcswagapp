import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TamanhoCamiseta, Camiseta } from '../types';
import { Plus, Minus, Save, Download, Building2 } from 'lucide-react';

export function CamisetasTab() {
  const { state, dispatch } = useApp();
  
  // Estados para quantidades e distribuições
  const [quantidades, setQuantidades] = useState<{ [key: string]: number }>({});
  const [quantidadesDistribuidas, setQuantidadesDistribuidas] = useState<{ [key: string]: number }>({});
  
  // Estados para adicionar quantidade a combinações existentes
  const [sponsorAdicionar, setSponsorAdicionar] = useState('Bugcrowd');
  const [tamanhoAdicionar, setTamanhoAdicionar] = useState<TamanhoCamiseta>('M');
  const [sexoAdicionar, setSexoAdicionar] = useState<'homem' | 'mulher'>('homem');
  const [quantidadeAdicionar, setQuantidadeAdicionar] = useState('');
  
  // Estados para registrar distribuição
  const [sponsorDistribuir, setSponsorDistribuir] = useState('Bugcrowd');
  const [tamanhoDistribuir, setTamanhoDistribuir] = useState<TamanhoCamiseta>('M');
  const [sexoDistribuir, setSexoDistribuir] = useState<'homem' | 'mulher'>('homem');
  const [quantidadeDistribuir, setQuantidadeDistribuir] = useState('');
  
  // Lista de sponsors disponíveis
  const sponsorsDisponiveis = ['Bugcrowd', 'Intigriti', 'HackerOne', 'BugHunt', 'PortSwigger'];

  useEffect(() => {
    // Carregar quantidades atuais
    const quantidadesAtuais: { [key: string]: number } = {};
    
    state.camisetas.forEach(camiseta => {
      quantidadesAtuais[camiseta.id] = camiseta.quantidadeAtual;
    });
    
    setQuantidades(quantidadesAtuais);
  }, [state.camisetas]);

  const handleQuantidadeChange = (camisetaId: string, valor: number) => {
    setQuantidades(prev => ({
      ...prev,
      [camisetaId]: Math.max(0, valor)
    }));
  };

  const handleDistribuicaoChange = (camisetaId: string, valor: number) => {
    setQuantidadesDistribuidas(prev => ({
      ...prev,
      [camisetaId]: Math.max(0, Math.min(valor, quantidades[camisetaId] || 0))
    }));
  };

  const salvarQuantidades = () => {
    // Atualizar cada camiseta com a nova quantidade
    Object.entries(quantidades).forEach(([camisetaId, quantidade]) => {
      const camiseta = state.camisetas.find(c => c.id === camisetaId);
      if (camiseta) {
        dispatch({
          type: 'UPDATE_CAMISETA',
          payload: { id: camisetaId, quantidade }
        });
      }
    });

    // Salvar no localStorage
    const camisetasAtualizadas = state.camisetas.map(camiseta => ({
      ...camiseta,
      quantidadeInicial: quantidades[camiseta.id] || camiseta.quantidadeInicial,
      quantidadeAtual: quantidades[camiseta.id] || camiseta.quantidadeAtual
    }));
    
    localStorage.setItem('camisetas', JSON.stringify(camisetasAtualizadas));
    alert('Quantidades salvas com sucesso!');
  };

  const registrarDistribuicao = () => {
    // Encontrar a camiseta específica
    const camiseta = state.camisetas.find(
      c => c.tamanho === tamanhoDistribuir && c.sponsor === sponsorDistribuir && c.sexo === sexoDistribuir
    );
    
    if (!camiseta) {
      alert('Essa combinação de tamanho, sponsor e sexo não existe! Crie primeiro uma combinação.');
      return;
    }
    
    const quantidade = parseInt(quantidadeDistribuir);
    if (isNaN(quantidade) || quantidade <= 0) {
      alert('A quantidade deve ser um número maior que 0');
      return;
    }
    
    if (quantidade > camiseta.quantidadeAtual) {
      alert(`Quantidade insuficiente! Disponível: ${camiseta.quantidadeAtual}`);
      return;
    }
    
    // Atualizar a camiseta
    const novaQuantidadeAtual = Math.max(0, camiseta.quantidadeAtual - quantidade);
    
    // Atualizar no estado global
    const camisetasAtualizadas = state.camisetas.map(c => 
      c.id === camiseta.id 
        ? { ...c, quantidadeAtual: novaQuantidadeAtual, quantidadeDistribuida: c.quantidadeDistribuida + quantidade }
        : c
    );
    
    dispatch({ type: 'SET_CAMISETAS', payload: camisetasAtualizadas });
    
    // Salvar no localStorage
    localStorage.setItem('camisetas', JSON.stringify(camisetasAtualizadas));
    
    // Limpar formulário
    setQuantidadeDistribuir('');
    
    alert('Distribuição registrada com sucesso!');
  };

  const totalDistribuido = Object.values(quantidadesDistribuidas).reduce((sum, qty) => sum + qty, 0);

  // Função para adicionar quantidade a combinação existente ou criar nova
  const adicionarQuantidade = () => {
    if (!sponsorAdicionar.trim()) {
      alert('Por favor, selecione um sponsor');
      return;
    }
    
    const quantidade = parseInt(quantidadeAdicionar);
    if (isNaN(quantidade) || quantidade <= 0) {
      alert('A quantidade deve ser um número maior que 0');
      return;
    }
    
    // Verificar se existe essa combinação
    const camisetaExistente = state.camisetas.find(
      c => c.tamanho === tamanhoAdicionar && c.sponsor === sponsorAdicionar && c.sexo === sexoAdicionar
    );
    
    let camisetasAtualizadas: Camiseta[];
    
    if (camisetaExistente) {
      // Atualizar a camiseta existente
      const camisetaAtualizada: Camiseta = {
        ...camisetaExistente,
        quantidadeInicial: camisetaExistente.quantidadeInicial + quantidade,
        quantidadeAtual: camisetaExistente.quantidadeAtual + quantidade
      };
      
      camisetasAtualizadas = state.camisetas.map(c => 
        c.id === camisetaExistente.id ? camisetaAtualizada : c
      );
      
      alert(`Quantidade adicionada com sucesso! ${quantidade} camisetas ${tamanhoAdicionar} da ${sponsorAdicionar} para ${sexoAdicionar}`);
    } else {
      // Criar uma nova combinação
      const novaCamiseta: Camiseta = {
        id: `${tamanhoAdicionar}-${sponsorAdicionar.toLowerCase()}-${sexoAdicionar}`,
        tamanho: tamanhoAdicionar,
        sponsor: sponsorAdicionar,
        sexo: sexoAdicionar,
        quantidadeInicial: quantidade,
        quantidadeAtual: quantidade,
        quantidadeDistribuida: 0
      };
      
      camisetasAtualizadas = [...state.camisetas, novaCamiseta];
      
      alert(`Nova combinação criada com sucesso! ${quantidade} camisetas ${tamanhoAdicionar} da ${sponsorAdicionar} para ${sexoAdicionar}`);
    }
    
    // Atualizar no estado
    dispatch({ type: 'SET_CAMISETAS', payload: camisetasAtualizadas });
    
    // Salvar no localStorage
    localStorage.setItem('camisetas', JSON.stringify(camisetasAtualizadas));
    
    // Limpar formulário
    setQuantidadeAdicionar('');
  };

  // Agrupar camisetas por sponsor para exibição
  const camisetasPorSponsor = state.camisetas.reduce((acc, camiseta) => {
    if (!acc[camiseta.sponsor]) {
      acc[camiseta.sponsor] = [];
    }
    acc[camiseta.sponsor].push(camiseta);
    return acc;
  }, {} as { [key: string]: Camiseta[] });

  const tamanhos = ['PP', 'P', 'M', 'L', 'XL', 'XXL'] as TamanhoCamiseta[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">👕 Gestão de Camisetas</h3>
          <p className="card-description">Configure quantidades e registre distribuições por tamanho, sponsor e sexo</p>
        </div>

        {/* Formulários de Gestão */}
        <div className="space-y-6 sm:space-y-8">
          {/* Adicionar Quantidade a Combinação Existente */}
          <div className="card">
            <div className="card-header">
              <h4 className="card-title text-lg sm:text-xl">➕ Adicionar Quantidade</h4>
              <p className="card-description text-sm sm:text-base">Adicione mais camisetas a uma combinação existente de tamanho, sponsor e sexo</p>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sponsor
                  </label>
                  <select
                    className="form-select w-full"
                    value={sponsorAdicionar}
                    onChange={(e) => setSponsorAdicionar(e.target.value)}
                  >
                    {sponsorsDisponiveis.map(sponsor => (
                      <option key={sponsor} value={sponsor}>{sponsor}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tamanho
                  </label>
                  <select
                    className="form-select w-full"
                    value={tamanhoAdicionar}
                    onChange={(e) => setTamanhoAdicionar(e.target.value as TamanhoCamiseta)}
                  >
                    {tamanhos.map(tamanho => (
                      <option key={tamanho} value={tamanho}>{tamanho}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sexo
                  </label>
                  <select
                    className="form-select w-full"
                    value={sexoAdicionar}
                    onChange={(e) => setSexoAdicionar(e.target.value as 'homem' | 'mulher')}
                  >
                    <option value="homem">Homem</option>
                    <option value="mulher">Mulher</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade a Adicionar
                  </label>
                  <input
                    type="text"
                    className="form-input w-full"
                    placeholder="Digite a quantidade"
                    value={quantidadeAdicionar}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Aceitar apenas números
                      if (value === '' || /^\d+$/.test(value)) {
                        setQuantidadeAdicionar(value);
                      }
                    }}
                    onKeyPress={(e) => {
                      // Permitir apenas números e teclas de controle
                      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  className="btn btn-primary w-full"
                  onClick={adicionarQuantidade}
                  disabled={!sponsorAdicionar.trim() || quantidadeAdicionar === '' || parseInt(quantidadeAdicionar) <= 0}
                >
                  ➕ Adicionar Quantidade
                </button>
              </div>
            </div>
          </div>



          {/* Registro de Distribuição */}
          <div className="card">
            <div className="card-header">
              <h4 className="card-title text-lg sm:text-xl">📤 Registrar Distribuição para Evento</h4>
              <p className="card-description text-sm sm:text-base">Selecione o sponsor, tamanho, sexo e quantidade para distribuir</p>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sponsor
                  </label>
                  <select
                    className="form-select w-full"
                    value={sponsorDistribuir}
                    onChange={(e) => setSponsorDistribuir(e.target.value)}
                  >
                    {sponsorsDisponiveis.map(sponsor => (
                      <option key={sponsor} value={sponsor}>{sponsor}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tamanho
                  </label>
                  <select
                    className="form-select w-full"
                    value={tamanhoDistribuir}
                    onChange={(e) => setTamanhoDistribuir(e.target.value as TamanhoCamiseta)}
                  >
                    {tamanhos.map(tamanho => (
                      <option key={tamanho} value={tamanho}>{tamanho}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sexo
                  </label>
                  <select
                    className="form-select w-full"
                    value={sexoDistribuir}
                    onChange={(e) => setSexoDistribuir(e.target.value as 'homem' | 'mulher')}
                  >
                    <option value="homem">Homem</option>
                    <option value="mulher">Mulher</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade a Distribuir
                  </label>
                  <input
                    type="text"
                    className="form-input w-full"
                    placeholder="Digite a quantidade"
                    value={quantidadeDistribuir}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Aceitar apenas números
                      if (value === '' || /^\d+$/.test(value)) {
                        setQuantidadeDistribuir(value);
                      }
                    }}
                    onKeyPress={(e) => {
                      // Permitir apenas números e teclas de controle
                      if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  className="btn btn-success w-full"
                  onClick={registrarDistribuicao}
                  disabled={quantidadeDistribuir === '' || parseInt(quantidadeDistribuir) <= 0}
                >
                  📤 Registrar Distribuição
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estoque Atual */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📦 Estoque Atual por Tamanho, Sponsor e Sexo</h3>
          <p className="card-description">Visualização rápida de todas as quantidades disponíveis</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 justify-items-center">
          {state.camisetas.map(camiseta => (
            <div 
              key={camiseta.id} 
              className={`stat-card border-2 w-full max-w-[140px] ${
                camiseta.sexo === 'homem' 
                  ? 'border-blue-200 bg-blue-50' 
                  : 'border-pink-200 bg-pink-50'
              } ${
                camiseta.quantidadeAtual === 0 
                  ? 'border-red-300 bg-red-100' 
                  : camiseta.quantidadeAtual < 10 
                  ? 'border-red-200 bg-red-50' 
                  : ''
              }`}
            >
                             {/* Header: SPONSOR */}
               <div style={{ 
                 fontSize: '0.75rem',
                 fontWeight: '700',
                 marginBottom: '0.5rem',
                 textAlign: 'center',
                 color: 'var(--text-primary)',
                 lineHeight: '1.2',
                 width: '100%'
               }}>
                 {camiseta.sponsor}
               </div>
               
               {/* Badge: SEXO - TAMANHO */}
               <div style={{ 
                 display: 'flex', 
                 justifyContent: 'center', 
                 marginBottom: '0.5rem',
                 width: '100%'
               }}>
                 <div className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs font-medium" style={{
                   backgroundColor: camiseta.sexo === 'homem' ? 'var(--primary-color)' : '#ec4899',
                   color: 'white',
                   border: `1px solid ${camiseta.sexo === 'homem' ? 'var(--primary-dark)' : '#be185d'}`,
                   borderRadius: '10px',
                   padding: '0.25rem 0.5rem',
                   width: 'fit-content',
                   minWidth: 'fit-content'
                 }}>
                   {camiseta.sexo === 'homem' ? '👨 Homem' : '👩 Mulher'} - {camiseta.tamanho}
                 </div>
               </div>
              
              {/* Quantidade */}
              <div className="stat-value" style={{
                color: camiseta.quantidadeAtual === 0 
                  ? 'var(--danger-color)' 
                  : camiseta.quantidadeAtual < 10 
                  ? '#dc2626' 
                  : camiseta.sexo === 'homem' ? 'var(--primary-color)' : '#be185d'
              }}>
                {camiseta.quantidadeAtual}
              </div>
              
              {/* Distribuído */}
              <div className="text-xs" style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Distribuído: {camiseta.quantidadeDistribuida}
              </div>
              
              {/* Alertas de estoque */}
              {camiseta.quantidadeAtual === 0 ? (
                <div className="text-xs font-bold mt-1" style={{ color: 'var(--danger-color)' }}>🚫 Estoque acabou!</div>
              ) : camiseta.quantidadeAtual < 10 ? (
                <div className="text-xs font-medium mt-1" style={{ color: 'var(--warning-color)' }}>⚠️ Estoque baixo!</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
