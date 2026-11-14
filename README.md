# CaminhoSeguro

Front-end da solução **CaminhoSeguro**, desenvolvida para a Global Solution 2026/2 · CitizenTech · FIAP.

## Objetivo

Plataforma colaborativa que reúne relatos dos cidadãos sobre trechos de rua (rampas quebradas, falta de iluminação, alagamentos) para ajudar as pessoas a escolherem caminhos mais seguros e acessíveis. Este front consome a API REST em Java do grupo: lista trechos com nota de acessibilidade, permite cadastrar trechos e relatos, confirmar relatos de outras pessoas e acompanhar o painel de prioridades da prefeitura.

ODS relacionados: **11** (principal), **10** e **13**.

## Links

- **GitHub:** [URL do repositório]
- **Aplicação (Vercel):** [URL da Vercel]
- **API (Render):** https://caminhoseguro-api.onrender.com
- **Vídeo (YouTube):** [URL do vídeo]

> A API roda no plano gratuito do Render e hiberna quando fica parada. A primeira requisição pode levar cerca de 1 minuto.

## Tecnologias

- React, Vite e TypeScript
- Tailwind CSS
- React Router (rotas estáticas e dinâmicas)
- React Hook Form (validação de formulários)
- Fetch API para as requisições HTTP
- oxlint
- Deploy na Vercel

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Home |
| `/sobre`, `/faq`, `/integrantes`, `/contato` | Páginas institucionais |
| `/trechos` | Lista de trechos com nota de acessibilidade e busca |
| `/trechos/:id` | Detalhe do trecho e seus relatos (rota dinâmica) |
| `/trechos/novo` | Cadastro de trecho (POST) |
| `/relatos` | Lista de relatos com filtros e confirmação (POST) |
| `/relatos/novo` | Cadastro de relato (POST) |
| `/painel` | Painel da prefeitura com prioridades |

## Estrutura

```
src/
  components/   componentes reutilizáveis
  pages/        uma pasta por página
  routes/       definição das rotas
  services/     chamadas à API (fetch)
  hooks/        hooks personalizados
  types/        tipos e interfaces TypeScript
  utils/        funções auxiliares
```

## Como executar

Pré-requisitos: Node.js 20 ou superior.

```bash
git clone [URL do repositório]
cd caminhoseguro-front
npm install
cp .env.example .env.local
npm run dev
```

No `.env.local`, defina a URL da API:

```
VITE_API_URL=https://caminhoseguro-api.onrender.com
```

Outros comandos: `npm run build` (build de produção) e `npm run lint` (oxlint).

## Integrantes

| Nome | RM | Turma |
|---|---|---|
| Tailyni Victoria Renovato Satirio | 570517 | [1TDSPJ] |
| Sabrina Fraga Lima | 572548 | [1TDSPJ] |
| Gabriel Tadeu Telles Brando | 571074 | [1TDSPJ] |

## Contato

[e-mail do grupo ou do representante]