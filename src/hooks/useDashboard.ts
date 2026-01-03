'use client';
import { useState, useEffect } from 'react';
import { Veiculo, Manutencao } from '@prisma/client';

export function useDashboard() {
  const [activeTab, setActiveTab] = useState<'veiculos' | 'manutencoes'>('veiculos');
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<Veiculo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- FETCH ---
  const carregarDados = async () => {
    setLoading(true);
    try {
      const [resV, resM] = await Promise.all([
        fetch('/api/veiculos'),
        fetch('/api/manutencoes')
      ]);
      setVeiculos(await resV.json());
      setManutencoes(await resM.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarDados(); }, []);

  const EditVeiculo = async (id: string, dados: any) => {
    const res = await fetch(`/api/veiculos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dados)
    });
    if (res.ok) carregarDados();
  };

  const DeleteVeiculo = async (id: string) => {
    if (!confirm("Excluir veículo?")) return;
    const res = await fetch(`/api/veiculos/${id}`, { method: 'DELETE' });
    if (res.ok) {
      carregarDados();
      setVeiculoSelecionado(null);
    }
  };

  const DeleteManutencao = async (id: string) => {
    await fetch(`/api/manutencoes/${id}`, { method: 'DELETE' });
    carregarDados();
  };

 const UpdateManutencao = async (id: string, dados: any) => {
  const res = await fetch(`/api/manutencoes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify(dados)
  });
  if (res.ok) carregarDados();
};

  return {
    // State
    activeTab, setActiveTab,
    veiculos, manutencoes,
    veiculoSelecionado, setVeiculoSelecionado,
    isModalOpen, setIsModalOpen,
    loading,
    // Actions
    carregarDados,
    EditVeiculo,
    DeleteVeiculo,
    DeleteManutencao,
    UpdateManutencao
  };
}