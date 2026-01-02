import { NextResponse } from "next/server";
import { ManutencaoRepositoryPrisma } from "@/repositories/ManutencaoRepository";
import { ManutencaoService } from "@/services/ManutencaoService";

const repo = new ManutencaoRepositoryPrisma();
const service = new ManutencaoService(repo);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const resultado = await service.registrar(body);
    return NextResponse.json(resultado, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}