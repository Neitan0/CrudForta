'use client';
import { useState } from 'react';

interface FormManutencaoProps {
  veiculoId: string;
  onSuccess?: () => void;
}

export default function FormularioVeiculo({ veiculoId, onSuccess }: FormManutencaoProps) {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [ano, setAno] = useState('');

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/veiculos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placa, modelo, marca, ano: Number(ano) }),
    });
    setPlaca(''); setModelo(''); setMarca(''); setAno('');
    onSuccess?.();
  }

  const labelStyle = "block text-[11px] font-semibold text-gray-400 uppercase mb-1 ";
  const inputStyle = "text-black w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-blue-500 transition-colors mb-3";

  return (
    <form onSubmit={salvar}>
      <div>
        <label className={labelStyle}>Placa</label>
        <input placeholder="Ex: ABC1D23" value={placa} onChange={e => setPlaca(e.target.value.toUpperCase())} className={inputStyle} required />
      </div>

      <div>
        <label className={labelStyle}>Modelo</label>
        <input placeholder="Ex: Onix" value={modelo} onChange={e => setModelo(e.target.value)} className={inputStyle} required />
      </div>

      <div>
        <label className={labelStyle}>Marca</label>
        <input placeholder="Ex: Chevrolet" value={marca} onChange={e => setMarca(e.target.value)} className={inputStyle} required />
      </div>

      <div>
        <label className={labelStyle}>Ano</label>
        <input type="number" placeholder="2024" value={ano} onChange={e => setAno(e.target.value)} className={inputStyle} required />
      </div>

      <button type="submit" className="w-full bg-gray-800 hover:bg-black text-white text-sm font-medium py-2.5 rounded-md transition-all mt-2 shadow-sm">
        Salvar Veículo
      </button>
    </form>
  );
}