# 🚚 Gestão de Frota - Desafio Técnico Grupo JB

Sistema Full Stack para gerenciamento de veículos e registros de manutenção

## 🚀 Sobre o Projeto
Esta aplicação foi construída para atender aos requisitos de gestão de frotas, permitindo o controle de veículos e seus históricos de manutenção.

## 🏗️ Diferenciais de Engenharia
Como desenvolvedor vindo do ecossistema **Swift (iOS)**, apliquei padrões de desenvolvimento robustos para garantir a qualidade deste projeto Next.js:

- **Multi-Schema PostgreSQL:** Implementação de namespaces no banco de dados através do Prisma (`@@schema("Frota")`), atendendo rigorosamente à organização de banco solicitada.
- **Service Layer Pattern:** A lógica de negócio (como a regra de custo elevado) foi isolada em uma camada de serviço, garantindo um código limpo e fácil de manter.
- **TypeScript Strict:** Uso integral de interfaces e tipos gerados pelo Prisma.

## 📋 Regras de Negócio Implementadas
- [x] **Regra dos R$ 5.000,00:** O sistema automatiza a identificação de manutenções de alto valor, concatenando `" - custo elevado"` ao campo **Tipo** diretamente no banco de dados.
- [x] **Data Final Opcional:** Flexibilidade para registros de manutenção em aberto ou finalizados.
- [x] **UX Responsiva:** Interface otimizada com limites de altura e scroll customizado para grandes volumes de dados.

## 🛠️ Tecnologias Utilizadas
- **Framework:** Next.js 15 (App Router)
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL (Supabase)
- **Estilização:** Tailwind CSS

## 🔧 Configuração Local

1. **Clone e instale as dependências:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
   npm install
