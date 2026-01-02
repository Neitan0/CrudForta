'use client';
import { useEffect, useState } from 'react';
import { Veiculo } from '@prisma/client';
import VeiculoDetalhes from '@/components/VeiculoDetalhes';
import FormularioVeiculo from '@/components/FormularioVeiculo';

export default function Page() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<Veiculo | null>(null);

  async function carregarVeiculos() {
    const res = await fetch('/api/veiculos');
    const dados = await res.json();
    setVeiculos(dados);
  }

  useEffect(() => { carregarVeiculos(); }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      <aside className="w-full md:w-80 bg-white border-r border-gray-200 p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-8">Frota</h1>
        <FormularioVeiculo onSuccess={carregarVeiculos} veiculoId={''} />
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* SEÇÃO DE DETALHES (Aparece no topo se houver seleção) */}
        {veiculoSelecionado && (
          <section className="mb-10 animate-in slide-in-from-top duration-500">
            <VeiculoDetalhes 
              veiculo={veiculoSelecionado} 
              onClose={() => setVeiculoSelecionado(null)} 
            />
          </section>
        )}

        <header className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Veículos</h2>
          <p className="text-2xl font-semibold text-gray-800">{veiculos.length} Unidades</p>
        </header>

        {/* GRID DE CARDS MINIMALISTAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {veiculos.map((v) => (
            <div 
              key={v.id} 
              onClick={() => setVeiculoSelecionado(v)}
              className={`p-4 rounded-xl border cursor-pointer transition-all hover:border-blue-400 bg-white ${
                veiculoSelecionado?.id === v.id ? 'ring-2 ring-blue-500 border-transparent' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                  {v.placa}
                </span>
                <span className="text-[10px] text-gray-400">{v.ano}</span>
              </div>
              <h3 className="text-gray-900 font-medium">{v.modelo}</h3>
              <p className="text-gray-500 text-xs">{v.marca}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}