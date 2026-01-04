'use client';
import { useState } from 'react';
import { Manutencao, Veiculo } from "@prisma/client";

interface Props {
  manutencao: Manutencao & { veiculo?: Veiculo };
  onDelete: (id: string) => void;
  onUpdate: (id: string, dados: Partial<Manutencao>) => void;
}

export default function ManutencaoCard({ manutencao, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
 

  // Estados para TODOS os campos
  const [descricao, setDescricao] = useState(manutencao.descricao);
  const [valor, setValor] = useState(Number(manutencao.valor));
  const [tipo, setTipo] = useState(manutencao.tipo);
  const [dataInicial, setDataInicial] = useState(new Date(manutencao.dataInicial).toISOString().split('T')[0]);

  const handleSalvar = async () => {
    await onUpdate(manutencao.id, { 
      descricao, 
      valor: Number(valor), 
      tipo, 
      dataInicial: new Date(dataInicial) 
    });
    setIsEditing(false);
  };

  const inputClass = "bg-blue-50 border-b-2 border-blue-500 outline-none font-bold text-gray-700 px-1";

  return (
    <div className={`bg-white p-6 rounded-4xl border transition-all group ${isEditing ? 'border-blue-500 ring-4 ring-blue-50' : 'border-gray-100 shadow-sm'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <span className="text-[9px] uppercase font-bold text-blue-500">Descrição</span>
              <input 
                className={`${inputClass} text-lg w-full`}
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
              />
            </div>
          ) : (
            <>
              <h4 className="font-black text-gray-900 leading-tight">{manutencao.descricao}</h4>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                {manutencao.veiculo?.modelo} • {manutencao.veiculo?.placa}
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col items-end">
          {isEditing ? (
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase font-bold text-blue-500">Valor (R$)</span>
              <input 
                type="number"
                className={`${inputClass} text-lg text-right w-24`}
                value={valor}
                onChange={e => setValor(Number(e.target.value))}
              />
            </div>
          ) : (
            <span className="text-emerald-600 font-black text-lg">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(manutencao.valor))}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-50">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <p className="text-[9px] uppercase font-bold text-gray-400">Data</p>
            {isEditing ? (
              <input 
                type="date" 
                className={inputClass} 
                value={dataInicial} 
                onChange={e => setDataInicial(e.target.value)} 
              />
            ) : (
              <p className="text-xs font-bold text-gray-700">{new Date(manutencao.dataInicial).toLocaleDateString()}</p>
            )}
          </div>
          
          <div className="flex flex-col">
            <p className="text-[9px] uppercase font-bold text-gray-400">Tipo</p>
            {isEditing ? (
              <select className={inputClass} value={tipo} onChange={e => setTipo(e.target.value)}>
                <option value="Preventiva">Preventiva</option>
                <option value="Corretiva">Corretiva</option>
              </select>
            ) : (
              <p className="text-xs font-bold text-gray-700">{manutencao.tipo}</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 text-xs font-bold hover:text-gray-600">Cancelar</button>
              <button onClick={handleSalvar} className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-all">Salvar</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 font-bold text-xs transition-all">Editar</button>
              <button onClick={() => onDelete(manutencao.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 font-bold text-xs transition-all">Excluir</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}