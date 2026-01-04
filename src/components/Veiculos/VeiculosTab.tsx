'use client';
import VeiculoCard from './VeiculoCard';
import { Veiculo } from "@prisma/client";
interface Props {
  veiculos: Veiculo[];
  onSelect: (veiculo: Veiculo) => void;
}

export default function VeiculosTab({ veiculos, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {veiculos.map((v) => (
        <VeiculoCard
              key={v.id}
              veiculo={v}
              onClick={() => onSelect(v)} isSelected={false}        />
      ))}
      
      {veiculos.length === 0 && (
        <div className="col-span-full py-20 text-center bg-white rounded-[40px] border-4 border-dashed border-gray-50">
          <p className="text-gray-400 font-medium">Nenhum veículo cadastrado.</p>
        </div>
      )}
    </div>
  );
}