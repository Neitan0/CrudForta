'use client';
import { useDashboard } from '@/hooks/useDashboard';
import VeiculosTab from './Veiculos/VeiculosTab';
import ManutencoesTab from './Manutencao/ManutencaoTab';
import VeiculoDetalhes from './Veiculos/VeiculoDetalhes';
import FormModal from './FormModal';

export default function Dashboard() {
  const vm = useDashboard(); 

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0F172A] p-8 fixed h-full">
        <h1 className="text-blue-500 font-black text-2xl mb-10">JB FROTA</h1>
        <nav className="space-y-4">
          <button
            onClick={() => vm.setActiveTab('veiculos')}
            className={`w-full p-4 rounded-2xl text-left font-bold ${vm.activeTab === 'veiculos' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
          >🚗 Veículos</button>
          <button
            onClick={() => vm.setActiveTab('manutencoes')}
            className={` w-full p-4 rounded-2xl text-left font-bold ${vm.activeTab === 'manutencoes' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
          >🛠️ Manutenções</button>
        </nav>
      </aside>

      {/* CONTEÚDO DINÂMICO */}
      <main className="ml-72 flex-1 p-12">
        <header className="flex justify-between mb-10">
          <h2 className="text-4xl font-black capitalize text-black">{vm.activeTab}</h2>

          {vm.activeTab === 'veiculos' && (
            <button
              onClick={() => vm.setIsModalOpen(true)}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all active:scale-95"
            >
              + Novo Veículo
            </button>
          )}
        </header>

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

        {/* MODAIS (Overlays) */}
        {vm.veiculoSelecionado && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
              onClick={() => vm.setVeiculoSelecionado(null)}
            />
            <div className="relative z-10 w-full max-w-5xl shadow-2xl animate-in zoom-in-95 duration-300">
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