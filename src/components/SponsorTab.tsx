import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { firestoreService, Sponsor } from '../services/firestore';

export function SponsorTab() {
  const { state } = useApp();
  const [showAddSponsor, setShowAddSponsor] = useState(false);
  const [showEditSponsor, setShowEditSponsor] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  
  // Formulário de novo sponsor
  const [novoSponsor, setNovoSponsor] = useState({
    name: '',
    logo: ''
  });

  // Formulário de edição
  const [editSponsor, setEditSponsor] = useState({
    name: '',
    logo: ''
  });

  const handleAddSponsor = async () => {
    if (!novoSponsor.name.trim() || !novoSponsor.logo.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Validar se é uma URL válida
    try {
      new URL(novoSponsor.logo);
    } catch {
      alert('Por favor, insira uma URL válida para o logo.');
      return;
    }

    try {
      const sponsor = {
        name: novoSponsor.name.trim(),
        logo: novoSponsor.logo.trim(),
        active: true
      };

      await firestoreService.addSponsor(sponsor);
      
      // Limpar formulário
      setNovoSponsor({ name: '', logo: '' });
      setShowAddSponsor(false);
      
      alert('Sponsor adicionado com sucesso!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding sponsor:', error);
      alert('Erro ao adicionar sponsor. Tente novamente.');
    }
  };

  const handleEditSponsor = async () => {
    if (!selectedSponsor) return;
    
    if (!editSponsor.name.trim() || !editSponsor.logo.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Validar se é uma URL válida
    try {
      new URL(editSponsor.logo);
    } catch {
      alert('Por favor, insira uma URL válida para o logo.');
      return;
    }

    try {
      await firestoreService.updateSponsor(selectedSponsor.id, {
        name: editSponsor.name.trim(),
        logo: editSponsor.logo.trim(),
        active: true
      });

      // Limpar e fechar
      setEditSponsor({ name: '', logo: '' });
      setSelectedSponsor(null);
      setShowEditSponsor(false);

      alert('Sponsor editado com sucesso!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error editing sponsor:', error);
      alert('Erro ao editar sponsor. Tente novamente.');
    }
  };

  const handleDeleteSponsor = async (sponsor: Sponsor) => {
    if (!window.confirm(`Tem certeza que deseja deletar o sponsor "${sponsor.name}"?`)) {
      return;
    }

    try {
      await firestoreService.deleteSponsor(sponsor.id);
      alert(`Sponsor "${sponsor.name}" deletado com sucesso!`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error deleting sponsor:', error);
      alert('Erro ao deletar sponsor. Tente novamente.');
    }
  };

  const openEditSponsor = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setEditSponsor({
      name: sponsor.name,
      logo: sponsor.logo
    });
    setShowEditSponsor(true);
  };

  return (
    <div>
      {/* Gerenciar Sponsors */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🏢 Gerenciar Sponsors</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddSponsor(true)}
          >
            <Plus size={16} />
            Novo Sponsor
          </button>
        </div>

        {/* Lista de Sponsors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.sponsors?.map(sponsor => (
            <div key={sponsor.id} className="border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{sponsor.name}</h3>
                  <div className="flex items-center gap-2">
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #e5e7eb'
                    }}>
                      <img 
                        src={sponsor.logo} 
                        alt={`Logo ${sponsor.name}`}
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <a 
                      href={sponsor.logo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      Ver logo
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => openEditSponsor(sponsor)}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteSponsor(sponsor)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!state.sponsors || state.sponsors.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">🏢</div>
            <p>Nenhum sponsor cadastrado ainda.</p>
            <p>Clique em "Novo Sponsor" para começar!</p>
          </div>
        )}
      </div>

      {/* Modal Adicionar Sponsor */}
      {showAddSponsor && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="text-lg font-bold">Adicionar Novo Sponsor</h3>
              <button
                className="modal-close"
                onClick={() => setShowAddSponsor(false)}
              >
                ×
              </button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Nome do Sponsor</label>
              <input
                type="text"
                className="form-input"
                value={novoSponsor.name}
                onChange={(e) => setNovoSponsor(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Bugcrowd, HackerOne, Intigriti..."
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">URL do Logo</label>
              <input
                type="url"
                className="form-input"
                value={novoSponsor.logo}
                onChange={(e) => setNovoSponsor(prev => ({ ...prev, logo: e.target.value }))}
                placeholder="https://exemplo.com/logo.png"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                className="btn btn-secondary flex-1"
                onClick={() => setShowAddSponsor(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary flex-1"
                onClick={handleAddSponsor}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Sponsor */}
      {showEditSponsor && selectedSponsor && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="text-lg font-bold">Editar Sponsor</h3>
              <button
                className="modal-close"
                onClick={() => setShowEditSponsor(false)}
              >
                ×
              </button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Nome do Sponsor</label>
              <input
                type="text"
                className="form-input"
                value={editSponsor.name}
                onChange={(e) => setEditSponsor(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Bugcrowd, HackerOne, Intigriti..."
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">URL do Logo</label>
              <input
                type="url"
                className="form-input"
                value={editSponsor.logo}
                onChange={(e) => setEditSponsor(prev => ({ ...prev, logo: e.target.value }))}
                placeholder="https://exemplo.com/logo.png"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                className="btn btn-secondary flex-1"
                onClick={() => setShowEditSponsor(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary flex-1"
                onClick={handleEditSponsor}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
