'use client';
import { Veiculo } from '@prisma/client';

interface VeiculoCardProps {
  veiculo: Veiculo;
  isSelected: boolean;
  onClick: () => void;
}

export default function VeiculoCard({ veiculo, isSelected, onClick }: VeiculoCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white group ${
        isSelected 
          ? 'border-blue-500 shadow-2xl scale-[1.02]' 
          : 'border-gray-100 hover:border-gray-300 hover:shadow-lg'
      }`}
    >
      <div className="flex justify-between mb-4">
        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest transition-colors ${
          isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
        }`}>
          {veiculo.placa}
        </span>
        <span className="text-xs text-gray-400 font-bold">{veiculo.ano}</span>
      </div>
      
      <h3 className={`text-xl font-bold transition-colors ${
        isSelected ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'
      }`}>
        {veiculo.modelo}
      </h3>
      <p className="text-gray-500 font-medium">{veiculo.marca}</p>
      
      {/* Indicador visual de seleção */}
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-blue-50 flex items-center justify-between text-blue-600">
          <span className="text-[10px] font-bold uppercase tracking-tighter">Editando detalhes</span>
          <span className="text-lg">→</span>
        </div>
      )}
    </div>
  );
}