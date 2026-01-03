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

  // Salvar Edição
  async function handleSalvar() {
    await fetch(`/api/veiculos/${veiculo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ modelo, placa, marca, ano })
    });
    setIsEditing(false);
    onRefresh();
  }

  // Excluir Veículo
  async function handleExcluirVeiculo() {
    if (confirm("Deseja excluir este veículo e todas as manutenções?")) {
      await fetch(`/api/veiculos/${veiculo.id}`, { method: 'DELETE' });
      onRefresh();
      onClose();
    }
  }

  // Excluir Manutenção
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
    buscarManutencoes(); // Recarrega a lista local do veículo
    onRefresh();        // Recarrega os dados do Dashboard (contadores, etc)
  }
}

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden max-w-5xl w-full mx-auto">
      <div className="bg-[#0F172A] p-10 text-white relative">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Campos de edicao */}
            {isEditing ? (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-w-md">
                {/* Campo Modelo */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-gray-400 w-16">Modelo:</span>
                  <input
                    className="bg-white/10 border border-white/20 rounded-xl p-2 outline-none w-40 focus:border-blue-500"
                    value={modelo}
                    onChange={e => setModelo(e.target.value)}
                  />
                </div>

                {/* Campo Placa */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-gray-400 w-16">Placa:</span>
                  <input
                    className="bg-white/10 border border-white/20 rounded-xl p-2 outline-none w-40 focus:border-blue-500"
                    value={placa}
                    onChange={e => setPlaca(e.target.value.toUpperCase())}
                  />
                </div>

                {/* Campo Marca */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-gray-400 w-16">Marca:</span>
                  <input
                    className="bg-white/10 border border-white/20 rounded-xl p-2 outline-none w-40 focus:border-blue-500"
                    value={marca}
                    onChange={e => setMarca(e.target.value)}
                  />
                </div>

                {/* Campo Ano */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-gray-400 w-16">Ano:</span>
                  <input
                    className="bg-white/10 border border-white/20 rounded-xl p-2 outline-none w-40 focus:border-blue-500"
                    value={ano}
                    onChange={e => setAno(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <>
                {/* Sobre o veiculo */}
                <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">Painel de Controle</span>
                <h2 className="text-4xl font-black tracking-tight">{modelo}</h2>
                <div className="flex gap-4 mt-4 items-center">
                  <span className="bg-blue-600 px-4 py-1.5 rounded-xl text-xs font-mono font-bold">{placa}</span>
                  <p className="text-gray-400 font-medium">{marca} • {ano}</p>
                </div>
              </>
            )}
          </div>
          {/* Botoes de acao */}
          <div className="flex gap-3">
            {/* Botão de Ação */}
            <button
              onClick={() => setShowAddManutencao(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95"
            >
              + Manutenção
            </button>
            {isEditing ? (
              <button onClick={handleSalvar} className="bg-emerald-500 px-6 py-3 rounded-2xl font-bold">Salvar</button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-bold transition-all">Editar</button>
            )}
            <button onClick={handleExcluirVeiculo} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-6 py-3 rounded-2xl font-bold transition-all border border-red-500/20">Excluir</button>
            <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/20 text-xl ml-2 transition-all">×</button>
          </div>
        </div>
      </div>

{/* HISTÓRICO DE MANUTENÇÕES REUTILIZANDO O COMPONENTE */}
<div className="p-10 bg-[#F8FAFC]">
  <h3 className="text-2xl font-black text-gray-900 mb-8">Histórico</h3>
  <div className="space-y-4">
    {manutencoes.length === 0 ? (
      <p className="text-gray-400">Nenhum registro encontrado.</p>
    ) : (
      manutencoes.map((m: any) => (
        <ManutencaoCard 
          key={m.id} 
          manutencao={m} 
          onDelete={handleExcluirManutencao} 
          onUpdate={handleUpdateManutencao} // 👈 Adicione essa função no Detalhes
        />
      ))
    )}
  </div>
</div>
      {/* modal */}
      {showAddManutencao && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowAddManutencao(false)}
          />

          {/* Nova manutencao */}
          <div className="relative bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-900">Nova Manutenção</h3>
              <button onClick={() => setShowAddManutencao(false)} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>

            {/* Formulario manutencao */}
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