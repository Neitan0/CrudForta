'use client';
import { useDashboard } from '@/hooks/useDashboard';
import VeiculosTab from './Veiculos/VeiculosTab';
import ManutencoesTab from './Manutencao/ManutencaoTab';
import VeiculoDetalhes from './Veiculos/VeiculoDetalhes';
import FormModal from './FormModal';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const vm = useDashboard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      
      {/* BOTÃO MOBILE MENU */}
      <div className="md:hidden bg-[#0F172A] p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-blue-500 font-black text-xl">JB FROTA</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

{/* SIDEBAR */}
<aside className={`
  fixed inset-y-0 left-0 z-40 w-72 bg-[#0F172A] p-8 transform transition-transform duration-300 ease-in-out
  md:translate-x-0 md:static md:inset-0
  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  flex flex-col
`}>
  <div className="h-12 md:hidden"></div>

  <h1 className="text-blue-500 font-black text-2xl mb-10 hidden md:block">
    JB FROTA
  </h1>
  
  <nav className="space-y-4">
    <button
      onClick={() => { vm.setActiveTab('veiculos'); setIsSidebarOpen(false); }}
      className={`w-full p-4 rounded-2xl text-left font-bold transition-all ${
        vm.activeTab === 'veiculos' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-slate-800'
      }`}
    >🚗 Veículos</button>
    
    <button
      onClick={() => { vm.setActiveTab('manutencoes'); setIsSidebarOpen(false); }}
      className={`w-full p-4 rounded-2xl text-left font-bold transition-all ${
        vm.activeTab === 'manutencoes' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-slate-800'
      }`}
    >🛠️ Manutenções</button>
  </nav>
</aside>

      {/* OVERLAY MOBILE */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* CONTEÚDO DINÂMICO */}
      <main className="flex-1 p-4 md:p-12 w-full max-w-full overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-black capitalize text-black">{vm.activeTab}</h2>

          {vm.activeTab === 'veiculos' && (
            <button
              onClick={() => vm.setIsModalOpen(true)}
              className="w-full sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all active:scale-95 text-center"
            >
              + Novo Veículo
            </button>
          )}
        </header>

        <div className="w-full">
          {vm.activeTab === 'veiculos' ? (
            <VeiculosTab
              veiculos={vm.veiculos}
              onSelect={vm.setVeiculoSelecionado}
            />
          ) : (
            <ManutencoesTab
              manutencoes={vm.manutencoes}
              onDelete={vm.DeleteManutencao}
              onUpdate={vm.UpdateManutencao}
            />
          )}
        </div>

        {/* MODAIS */}
        {vm.veiculoSelecionado && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
              onClick={() => vm.setVeiculoSelecionado(null)}
            />
            <div className="relative z-10 w-full max-w-5xl h-[90vh] sm:h-auto overflow-hidden bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl">
              <VeiculoDetalhes
                veiculo={vm.veiculoSelecionado}
                onClose={() => vm.setVeiculoSelecionado(null)}
                onRefresh={vm.carregarDados}
              />
            </div>
          </div>
        )}

        {vm.isModalOpen && (
          <FormModal
            type={vm.activeTab}
            onClose={() => vm.setIsModalOpen(false)}
            onSuccess={() => { vm.carregarDados(); vm.setIsModalOpen(false); }}
          />
        )}
      </main>
    </div>
  );
}