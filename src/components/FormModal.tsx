'use client';
import FormularioVeiculo from './Veiculos/FormularioVeiculo';
import FormularioManutencao from './Manutencao/FormularioManutencao';

interface FormModalProps {
  type: 'veiculos' | 'manutencoes';
  onClose: () => void;
  onSuccess: () => void;
}

export default function FormModal({ type, onClose, onSuccess }: FormModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay  */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Container do Modal */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900">
            Criar {type === 'veiculos' ? 'Veículo' : 'Manutenção'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
            ×
          </button>
        </div>
        
        <div className="p-8">
          {type === 'veiculos' ? (
            <FormularioVeiculo onSuccess={onSuccess} veiculoId={''} />
          ) : (
            <FormularioManutencao 
              veiculoId="" 
              onSuccess={onSuccess} 
            />
          )}
        </div>
      </div>
    </div>
  );
}