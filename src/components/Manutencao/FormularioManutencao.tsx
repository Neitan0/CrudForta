'use client';
import { useState } from 'react';

interface FormManutencaoProps {
  veiculoId: string;
  onSuccess?: () => void;
}

export default function FormularioManutencao({ veiculoId, onSuccess }: FormManutencaoProps) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('Preventiva'); 
  const [dataInicial, setDataInicial] = useState('');

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/manutencoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        descricao, 
        valor: Number(valor), 
        tipo, 
        dataInicial, 
        veiculoId 
      }),
    });

    setDescricao(''); setValor(''); setDataInicial('');
    onSuccess?.();
  }

  const inputStyle = "text-black w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-sm mb-3";

  return (
    <form onSubmit={salvar} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <input placeholder="Descrição da manutenção" value={descricao} onChange={e => setDescricao(e.target.value)} className={inputStyle} required />
      
      <div className="flex gap-2">
        <input type="number" placeholder="Valor (R$)" value={valor} onChange={e => setValor(e.target.value)} className={inputStyle} required />
        <select value={tipo} onChange={e => setTipo(e.target.value)} className={inputStyle}>
          <option value="Preventiva">Preventiva</option>
          <option value="Corretiva">Corretiva</option>
        </select>
      </div>

      <input type="date" value={dataInicial} onChange={e => setDataInicial(e.target.value)} className={inputStyle} required />

      <button type="submit" className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-md hover:bg-blue-700 transition-colors">
        Salvar Manutenção
      </button>
    </form>
  );
}