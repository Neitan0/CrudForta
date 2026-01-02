"use client";

import { useState, useEffect } from "react";
import { Veiculo, Manutencao } from "@prisma/client";
import FormularioManutencao from './FormularioManutencao'; 

interface VeiculoCardProps {
  veiculo: Veiculo;
}

export default function VeiculoCard({ veiculo }: VeiculoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar as manutenções do backend
  async function carregarManutencoes() {
    try {
      setLoading(true);
      // Rota que utiliza o ID do veículo para filtrar
      const res = await fetch(`/api/veiculos/${veiculo.id}/manutencoes`);
      const dados = await res.json();
      setManutencoes(dados);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setLoading(false);
    }
  }

  // Dispara a busca sempre que o usuário expandir o card
  useEffect(() => {
    if (isExpanded) {
      carregarManutencoes();
    }
  }, [isExpanded]);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-fit">
      {/* Cabeçalho do Card */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-gray-900 font-medium">{veiculo.modelo}</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-blue-600 hover:underline font-semibold"
        >
          {isExpanded ? "Fechar" : "Ver Manutenções"}
        </button>
      </div>
      <p className="text-gray-500 text-sm">{veiculo.placa} - {veiculo.marca}</p>

      {/* Conteúdo Expandido */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
          
          <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-wider">
            Registrar Manutenção
          </h4>
          
          {/* Formulário com callback para recarregar a lista após salvar */}
          <FormularioManutencao 
            veiculoId={veiculo.id} 
            onSuccess={carregarManutencoes} 
          />

          <div className="mt-6">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-wider">
              Histórico de Serviços
            </h4>

            {loading ? (
              <p className="text-xs text-gray-400 animate-pulse">Carregando histórico...</p>
            ) : manutencoes.length > 0 ? (
              <div className="space-y-3">
                {manutencoes.map((m) => (
                  <div 
                    key={m.id} 
                    className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        m.tipo.includes("elevado") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                      }`}>
                        {m.tipo}
                      </span>
                      <span className="text-xs font-bold text-gray-700">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(m.valor))}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-800 font-medium">{m.descricao}</p>
                    
                    <span className="text-[10px] text-gray-400">
                      Realizada em: {new Date(m.dataInicial).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <p className="text-xs text-gray-400">Nenhuma manutenção registrada.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}