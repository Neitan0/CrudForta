import { NextResponse } from "next/server";
import { ServiceFactory } from "@/lib/factory";

const service = ServiceFactory.getManutencaoService();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const resultado = await service.registrar(body);
    return NextResponse.json(resultado, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const dados = await service.findMany();
    return NextResponse.json(dados);
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}