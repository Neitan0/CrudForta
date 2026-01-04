import { NextResponse } from "next/server";
import { ServiceFactory } from "@/lib/factory";

const service = ServiceFactory.getVeiculoService();

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    const veiculo = await service.update(id, body);
    
    return NextResponse.json(veiculo);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar veículo" }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await service.delete(id);
    
    return NextResponse.json({ message: "Veículo excluído com sucesso" });
  } catch {
    return NextResponse.json({ error: "Erro ao excluir" }, { status: 400 });
  }
}