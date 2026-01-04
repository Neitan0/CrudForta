'use client';
import { useMemo } from 'react';
import ManutencaoCard from './ManutencaoCard';

interface ManutencoesTabProps {
  manutencoes: any[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: any) => void;
}

export default function ManutencoesTab({ manutencoes, onDelete, onUpdate }: ManutencoesTabProps) {
  
  const ordenadas = useMemo(() => {
    return [...manutencoes].sort((a, b) => 
      new Date(b.dataInicial).getTime() - new Date(a.dataInicial).getTime()
    );
  }, [manutencoes]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Cabeçalho */}
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-bold text-gray-900">Registros de Manutenção</h3>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black">
          {ordenadas.length} {ordenadas.length === 1 ? 'item' : 'itens'}
        </span>
      </div>

      {/* Grid de Manutenções */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ordenadas.length > 0 ? (
          ordenadas.map((m: any) => (
            <ManutencaoCard key={m.id} manutencao={m} onDelete={onDelete} onUpdate={onUpdate} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium italic">Nenhum histórico disponível.</p>
          </div>
        )}
      </div>
    </div>
  );
}