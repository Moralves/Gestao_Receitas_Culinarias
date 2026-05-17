# Frontend - Gestao de Receitas Culinarias

Frontend desenvolvido para a disciplina com foco em clareza, organizacao e evolucao incremental. O projeto consome uma API REST em **Java + Spring Boot** rodando na porta 8080.

## Stack e tecnologias

| Camada | Tecnologia | Observacao |
| --- | --- | --- |
| Framework | Angular 17 (Standalone) | Componentes independentes e roteamento moderno |
| Linguagem | TypeScript 5.4 | Tipagem forte e manutenibilidade |
| UI | HTML + CSS | Estilos globais com design tokens |
| Reatividade | RxJS 7.8 | Integracao com streams e HTTP |
| Build | Angular CLI | Scripts padronizados de build e serve |

## Funcionalidades

| Funcionalidade | Descricao |
| --- | --- |
| Cadastro de receitas | Criar receitas com validacoes obrigatorias |
| Listagem de receitas | Visao em cards com busca por nome |
| Detalhe da receita | Ingredientes, modo de preparo e categoria |
| Exclusao de receitas | Remocao com confirmacao |

## Scripts uteis

| Comando | Descricao |
| --- | --- |
| `npm start` | Sobe o servidor de desenvolvimento |
| `npm run build` | Gera build de producao |
| `npm run watch` | Build continuo em modo dev |

## Padrao de comentarios
O codigo mantem um padrao profissional de comentarios para servir como base de estudo. Arquivos tem cabecalho JSDoc e blocos/decisoes relevantes sao documentados com objetividade.
