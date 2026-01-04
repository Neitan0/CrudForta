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
  const [dataFinal, setDataFinal] = useState('');

  async function salvar(e: React.FormEvent) {
    e.preventDefault();

    if (dataFinal && new Date(dataFinal) < new Date(dataInicial)) {
      alert("A data final não pode ser anterior à data inicial.");
      return;
    }

    await fetch('/api/manutencoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descricao,
        valor: Number(valor),
        tipo,
        dataInicial,
        dataFinal: dataFinal || null,
        veiculoId
      }),
    });

    setDescricao(''); setValor(''); setDataInicial(''); setDataFinal('');
    onSuccess?.();
  }

  // Estilos reutilizáveis para manter o código limpo (DRY)
  const labelStyle = "text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1.5 block";
  const inputStyle = "w-full p-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-300 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all shadow-sm";

  return (
    <form onSubmit={salvar} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-blue-900/5 max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Campo de Descrição */}
        <div>
          <label className={labelStyle}>Descrição do Serviço</label>
          <input
            placeholder="Ex: Troca de pastilhas de freio"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            className={inputStyle}
            required
          />
        </div>

        {/* Linha: Valor e Tipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelStyle}>Valor Estimado (R$)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">R$</span>
              <input
                type="number"
                placeholder="0,00"
                value={valor}
                onChange={e => setValor(e.target.value)}
                className={`${inputStyle} pl-10`}
                required
              />
            </div>
          </div>
          <div>
            {/* <label className={labelStyle}>Tipo de Intervenção</label> */}
            {/* Substitua o campo de Tipo por este bloco no FormularioManutencao.tsx */}
            <div>
              <label className={labelStyle}>Tipo de Intervenção</label>
              <div className="flex p-1 bg-gray-100 rounded-2xl gap-1">
                <button
                  type="button"
                  onClick={() => setTipo('Preventiva')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${tipo === 'Preventiva'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  Preventiva
                </button>
                <button
                  type="button"
                  onClick={() => setTipo('Corretiva')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${tipo === 'Corretiva'
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  Corretiva
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Datas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-gray-50 rounded-3xl border border-gray-100">
          <div>
            <label className={labelStyle}>Início do Serviço</label>
            <input
              type="date"
              value={dataInicial}
              onChange={e => setDataInicial(e.target.value)}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Término</label>
            <input
              type="date"
              value={dataFinal}
              onChange={e => setDataFinal(e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Botão de Ação */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
        >
          SALVAR REGISTRO
        </button>
      </div>
    </form>
  );
}