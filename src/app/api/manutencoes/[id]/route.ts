import { NextResponse } from "next/server";
import { ServiceFactory } from "@/lib/factory";

const manutencaoService = ServiceFactory.getManutencaoService();

export async function DELETE(req: Request, { params }: any) {
  const { id } = await params;
  
  await manutencaoService.delete(id);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id) return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });

    const manutencaoAtualizada = await manutencaoService.update(id, body);
    
    return NextResponse.json(manutencaoAtualizada);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar manutenção" }, { status: 400 });
  }
}