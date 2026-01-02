'use client';
import { useState, useEffect } from "react";
import { Veiculo, Manutencao } from "@prisma/client";
import FormularioManutencao from "./FormularioManutencao";

export default function VeiculoDetalhes({ veiculo, onClose }: { veiculo: Veiculo, onClose: () => void }) {
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [showForm, setShowForm] = useState(false);

  async function carregar() {
    const res = await fetch(`/api/veiculos/${veiculo.id}/manutencoes`);
    const dados = await res.json();
    setManutencoes(dados);
  }

  useEffect(() => { carregar(); }, [veiculo.id]);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden transition-all duration-500">
      {/* Header Minimalista Estilo iOS */}
      <div className="bg-[#0F172A] p-8 text-white relative">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
              Detalhes do Veículo
            </span>
            <h2 className="text-3xl font-black tracking-tight">{veiculo.modelo}</h2>
            <div className="flex gap-3 mt-3 items-center">
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono border border-white/10">
                {veiculo.placa}
              </span>
              <span className="text-gray-400 text-sm">{veiculo.marca} • {veiculo.ano}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all text-xl"
          >
            ×
          </button>
        </div>
      </div>

      <div className="p-8 bg-[#F8FAFC]">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Manutenções</h3>
            <p className="text-sm text-gray-500">Histórico completo de intervenções</p>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center gap-2 ${
              showForm ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }`}
          >
            {showForm ? 'Cancelar' : '+ Nova Manutenção'}
          </button>
        </div>

        {/* Formulário com Animação de Dropdown */}
        {showForm && (
          <div className="mb-10 p-8 bg-white rounded-2xl border-2 border-blue-50 shadow-inner animate-in slide-in-from-top-4 duration-300">
            <FormularioManutencao 
              veiculoId={veiculo.id} 
              onSuccess={() => { carregar(); setShowForm(false); }} 
            />
          </div>
        )}

        {/* Grid de Manutenções mais polido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {manutencoes.length > 0 ? (
            manutencoes.map(m => (
              <div 
                key={m.id} 
                className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group relative overflow-hidden"
              >
                {/* Indicador Lateral de Cor */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  m.tipo.includes('elevado') ? 'bg-red-500' : 'bg-emerald-500'
                }`} />
                
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        m.tipo.includes('elevado') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {m.tipo}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {new Date(m.dataInicial).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                      {m.descricao}
                    </h4>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-base font-black text-gray-900">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(m.valor))}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center">
              <p className="text-gray-400 font-medium">Nenhum registro encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}