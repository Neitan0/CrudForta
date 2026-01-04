'use client';
import { useState, useEffect } from "react";
import FormularioManutencao from '../Manutencao/FormularioManutencao';
import ManutencaoCard from '../Manutencao/ManutencaoCard';

export default function VeiculoDetalhes({ veiculo, onClose, onRefresh }: any) {
  const [manutencoes, setManutencoes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddManutencao, setShowAddManutencao] = useState(false);

  const [modelo, setModelo] = useState(veiculo.modelo);
  const [placa, setPlaca] = useState(veiculo.placa);
  const [marca, setMarca] = useState(veiculo.marca);
  const [ano, setAno] = useState(veiculo.ano);

  async function buscarManutencoes() {
    const res = await fetch(`/api/veiculos/${veiculo.id}/manutencoes`);
    const dados = await res.json();
    setManutencoes(dados);
  }

  useEffect(() => {
    buscarManutencoes();
  }, [veiculo.id]);

  async function handleSalvar() {
    await fetch(`/api/veiculos/${veiculo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelo, placa, marca, ano })
    });
    setIsEditing(false);
    onRefresh();
  }

  async function handleExcluirVeiculo() {
    if (confirm("Deseja excluir este veículo e todas as manutenções?")) {
      await fetch(`/api/veiculos/${veiculo.id}`, { method: 'DELETE' });
      onRefresh();
      onClose();
    }
  }

  async function handleExcluirManutencao(id: string) {
    await fetch(`/api/manutencoes/${id}`, { method: 'DELETE' });
    buscarManutencoes();
  }

  async function handleUpdateManutencao(id: string, dados: any) {
    const res = await fetch(`/api/manutencoes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (res.ok) {
      buscarManutencoes();
      onRefresh();
    }
  }

  return (
    <div className="bg-white md:rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden max-w-5xl w-full mx-auto h-full md:h-auto flex flex-col">
      
      {/* HEADER DO VEÍCULO */}
      <div className="bg-[#0F172A] p-6 md:p-10 text-white relative">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center md:items-start w-full">
            <div className="flex-1">
              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Modelo</span>
                    <input className="bg-white/10 border border-white/20 rounded-xl p-3 outline-none focus:border-blue-500 text-base" value={modelo} onChange={e => setModelo(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Placa</span>
                    <input className="bg-white/10 border border-white/20 rounded-xl p-3 outline-none focus:border-blue-500 text-base" value={placa} onChange={e => setPlaca(e.target.value.toUpperCase())} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Marca</span>
                    <input className="bg-white/10 border border-white/20 rounded-xl p-3 outline-none focus:border-blue-500 text-base" value={marca} onChange={e => setMarca(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Ano</span>
                    <input className="bg-white/10 border border-white/20 rounded-xl p-3 outline-none focus:border-blue-500 text-base" value={ano} onChange={e => setAno(e.target.value)} />
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">Painel de Controle</span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight break-words">{modelo}</h2>
                  <div className="flex flex-wrap gap-3 mt-4 items-center">
                    <span className="bg-blue-600 px-4 py-1.5 rounded-xl text-xs font-mono font-bold uppercase">{placa}</span>
                    <p className="text-gray-400 font-medium text-sm md:text-base">{marca} • {ano}</p>
                  </div>
                </>
              )}
            </div>
            
            <button onClick={onClose} className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-2xl">×</button>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            <button
              onClick={() => setShowAddManutencao(true)}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-500 text-white px-4 md:px-6 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95 text-sm"
            >
              + Manutenção
            </button>
            
            {isEditing ? (
              <button onClick={handleSalvar} className="flex-1 sm:flex-none bg-emerald-500 px-6 py-3 rounded-2xl font-bold text-sm">Salvar</button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-bold text-sm transition-all">Editar</button>
            )}
            
            <button onClick={handleExcluirVeiculo} className="flex-1 sm:flex-none bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 md:px-6 py-3 rounded-2xl font-bold transition-all border border-red-500/20 text-sm">Excluir</button>
            
            <button onClick={onClose} className="hidden md:flex w-12 h-12 items-center justify-center rounded-2xl bg-white/5 hover:bg-white/20 text-xl transition-all">×</button>
          </div>
        </div>
      </div>

      {/* HISTÓRICO */}
      <div className="flex-1 p-6 md:p-10 bg-[#F8FAFC] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl md:text-2xl font-black text-gray-900">Histórico</h3>
          <span className="text-xs font-bold text-gray-400 uppercase">{manutencoes.length} registros</span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
          {manutencoes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 italic">Nenhum registro encontrado.</p>
            </div>
          ) : (
            manutencoes.map((m: any) => (
              <ManutencaoCard
                key={m.id}
                manutencao={m}
                onDelete={handleExcluirManutencao}
                onUpdate={handleUpdateManutencao}
              />
            ))
          )}
        </div>
      </div>

      {/* MODAL NOVA MANUTENÇÃO */}
      {showAddManutencao && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddManutencao(false)} />
          <div className="relative bg-white w-full max-w-md rounded-[32px] p-6 md:p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-900">Nova Manutenção</h3>
              <button onClick={() => setShowAddManutencao(false)} className="text-gray-400 text-2xl">×</button>
            </div>
            <FormularioManutencao
              veiculoId={veiculo.id}
              onSuccess={() => {
                setShowAddManutencao(false);
                buscarManutencoes();
                onRefresh();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}