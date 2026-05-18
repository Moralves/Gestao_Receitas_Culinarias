# ATIVIDADE INTEGRADA

# GCS Aplicada ao Projeto RecipeBook

---

# 1. Contexto e Objetivo

Em Construção de Software você está desenvolvendo o **RecipeBook** — sistema fullstack de cadastro de receitas culinárias com Spring Boot (backend) e Angular (frontend).

Em Gerência de Configuração de Software você aprendeu os 4 pilares da GCS e como eles se integram durante todo o ciclo de vida do software.

Esta atividade une as duas disciplinas: você vai aplicar GCS profissional diretamente no código que está desenvolvendo, exatamente como acontece em times reais de desenvolvimento.

---

## PILAR GCS

Aplicar os 4 pilares da GCS de forma integrada:

- Identificação
- Controle de Mudanças
- Registro de Status
- Auditoria

Usando:

- GitHub Issues → Change Requests formais
- GitHub Actions → Pipeline de auditoria automatizada

---

## POR QUE FAZEMOS ISSO?

Sem GCS:

> "Abri o editor e codei"

Com GCS:

> Cada mudança é rastreável — você sabe O QUE mudou, POR QUÊ, QUEM aprovou, QUANDO foi para produção e se o CI PASSOU antes do merge.

Esta atividade simula exatamente este fluxo profissional.

---

# 2. Visão Geral das 6 Fases

| Fase | O que você vai fazer | Ferramenta GitHub | Pilar GCS | Tempo |
|---|---|---|---|---|
| 1 | Configurar repositório, criar branches e baseline inicial | Git + Branch Protection | Identificação | 20 min |
| 2 | RF01 Listar Receitas via Issue + branch + PR | Issues + Feature Branch | Controle de Mudanças | 45 min |
| 3 | RF03 Cadastrar Receita via Issue + branch + PR | Issues + Feature Branch | Controle de Mudanças | 45 min |
| 4 | Pipeline CI validando PRs automaticamente | GitHub Actions | Auditoria | 30 min |
| 5 | Release v1.0.0 com tag e CHANGELOG | Git Tag + GitHub Release | Registro de Status | 25 min |
| 6 | Simular bug e aplicar hotfix controlado | Hotfix Branch + Tag | Todos os 4 | 20 min |

---

# FASE 1

# Configuração Inicial do Repositório

> Pilar GCS: Identificação  
> Tempo estimado: 20 min

Antes de qualquer linha de código, a GCS exige que você configure a infraestrutura de controle.

---

## NO RECIPEBOOK

Você vai criar o repositório que hospedará:

- Backend Spring Boot
- Frontend Angular

Estrutura em monorepo:

```text
/backend
/frontend
```

---

# 1.1 Criar o Repositório no GitHub

## 1. Criar repositório público

Acesse:

- GitHub
- "+"
- New repository

### Configurações

| Campo | Valor |
|---|---|
| Repository name | recipebook-gcs |
| Description | Sistema RecipeBook com GCS aplicada — SENAI |
| Visibility | Public |
| Add a README file | ✅ |
| Add .gitignore | Java |
| License | None |

---

## 2. Clonar repositório

```bash
git clone https://github.com/SEU_USUARIO/recipebook-gcs.git
cd recipebook-gcs
```

---

# 1.2 Estruturar o Repositório

## 3. Criar pastas e arquivos base

```bash
mkdir backend
mkdir frontend
touch CHANGELOG.md
```

---

## README.md

```md
# RecipeBook

Sistema de gestão de receitas culinárias — Projeto SENAI

## Tecnologias

- Backend: Spring Boot 3.x + Java 17 + H2
- Frontend: Angular 17+ Standalone Components

## Como executar

### Backend

```bash
cd backend && mvn spring-boot:run
```

Acesse:
http://localhost:8080

### Frontend

```bash
cd frontend && npm install && ng serve
```

Acesse:
http://localhost:4200
```

---

## CHANGELOG.md

```md
# Changelog

Todas as mudanças notáveis neste projeto serão documentadas aqui.

Formato:
https://keepachangelog.com

## [Unreleased]
```

---

## 4. Atualizar .gitignore

Adicionar ao final:

```gitignore
# === ANGULAR / NODE ===

node_modules/
dist/
.angular/
*.env
.DS_Store
```

---

# 1.3 Criar Branch develop

## 5. Criar develop

```bash
git checkout main
git checkout -b develop
git push origin develop
```

---

## POR QUE FAZEMOS ISSO?

- `main` → produção
- `develop` → integração
- `feature/*` → desenvolvimento isolado

Nenhuma feature vai direto para `main`.

---

# 1.4 Configurar Branch Protection

Configurações:

| Opção | Valor |
|---|---|
| Branch name pattern | main |
| Require PR before merging | ✅ |
| Require approvals | ✅ |
| Require status checks | ✅ |
| Require branches up to date | ✅ |
| Do not allow bypass | ✅ |

---

# 1.5 Criar Baseline Inicial

## 7. Commit inicial

```bash
git add .

git commit -m "chore: configuracao inicial do projeto recipebook"

git push origin main
git push origin develop

git tag -a v0.1.0 -m "Baseline inicial - estrutura do projeto configurada"

git push origin v0.1.0
```

---

# PILAR GCS

## Identificação

A tag `v0.1.0` representa uma baseline imutável.

Qualquer pessoa pode executar:

```bash
git checkout v0.1.0
```

E reproduzir exatamente aquele momento do projeto.

---

# FASE 2

# Feature RF01 — Listar Receitas

> Pilar GCS: Controle de Mudanças

---

# 2.1 Criar Issue #1

## Título

```text
[FEATURE] RF01 - Listar Receitas
```

---

## Descrição

```md
## Descrição

Implementar a listagem de receitas culinárias.

## Relacionado à Especificação

Requisito Funcional: RF01 - Listar Receitas

## Critérios de Aceite

- CA01.1: Exibir nome, categoria e tempo de preparo
- CA01.2: Ordenar por data
- CA01.3: Mensagem lista vazia
- CA01.4: Link para detalhes

## Impacto Técnico

- Backend: RecipeController.java
- Frontend: recipe-list/

## Estimativa

Backend: 1h
Frontend: 2h
Testes: 30min
```

---

## Labels

- enhancement
- approved

---

# 2.2 Feature Branch

```bash
git checkout develop
git pull origin develop

git checkout -b feature/listar-receitas
```

---

# Commits Profissionais

```bash
git commit -m "feat(backend): adicionar entidade Recipe e enum Categoria (#1)"

git commit -m "feat(backend): implementar GET /api/receitas ordenado por data (#1)"

git commit -m "feat(frontend): criar RecipeService com metodo listar (#1)"

git commit -m "feat(frontend): implementar componente recipe-list com cards (#1)"
```

---

# Abrir Pull Request

| Campo | Valor |
|---|---|
| Base | develop |
| Compare | feature/listar-receitas |
| Title | feat: implementar RF01 - Listagem de Receitas |

---

## IMPORTANTÍSSIMO

Adicionar:

```text
Closes #1
```

---

# FASE 3

# Feature RF03 — Cadastrar Receita

---

## Criar Issue

Título:

```text
[FEATURE] RF03 - Cadastrar Receita
```

---

## Feature Branch

```bash
git checkout develop
git pull origin develop

git checkout -b feature/cadastrar-receita
```

---

## Commits

```bash
git commit -m "feat(backend): endpoint POST /api/receitas com @Valid (#2)"

git commit -m "feat(frontend): criar recipe-form com reactive forms (#2)"

git commit -m "feat(frontend): exibir mensagens de erro por campo (#2)"
```

---

# FASE 4

# Pipeline CI com GitHub Actions

> Pilar GCS: Auditoria

---

# Criar workflow

```bash
mkdir -p .github/workflows
```

---

# ci.yml

```yaml
name: CI - RecipeBook

on:
  push:
    branches:
      - develop
      - 'feature/**'
      - 'hotfix/**'

  pull_request:
    branches:
      - main
      - develop

jobs:

  build-backend:
    name: Build Backend
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: maven

      - run: cd backend && mvn verify --no-transfer-progress

  build-frontend:
    name: Build Frontend
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - run: cd frontend && npm ci

      - run: cd frontend && npm run build
```

---

# Commit do CI

```bash
git add .github/workflows/ci.yml

git commit -m "ci: adicionar pipeline de build backend e frontend"

git push origin develop
```

---

# FASE 5

# Release v1.0.0

> Registro de Status + Identificação

---

# Criar Release Branch

```bash
git checkout develop
git pull origin develop

git checkout -b release/v1.0.0
```

---

# Merge e Tag

```bash
git checkout main

git merge release/v1.0.0 --no-ff -m "chore: merge release/v1.0.0 into main"

git tag -a v1.0.0 -m "Release 1.0.0"

git push origin main
git push origin v1.0.0
```

---

# Propagar para develop

```bash
git checkout develop

git merge release/v1.0.0 --no-ff

git push origin develop
```

---

# FASE 6

# Hotfix v1.0.1

> Todos os 4 pilares

---

# Issue de Bug

Título:

```text
[BUG] Formulário aceita porcoes = 0
```

---

# Hotfix Branch

```bash
git checkout main
git pull origin main

git checkout -b hotfix/validacao-porcoes
```

---

# Commit

```bash
git commit -m "fix(frontend): corrigir validacao de porcoes minimo 1 (#3)"
```

---

# Merge + Tag

```bash
git checkout main

git merge hotfix/validacao-porcoes --no-ff

git tag -a v1.0.1 -m "Hotfix 1.0.1"

git push origin main
git push origin v1.0.1
```

---

# Propagar para develop

```bash
git checkout develop

git merge hotfix/validacao-porcoes --no-ff

git push origin develop
```

---

# Rastreabilidade Final

| Pergunta | Onde encontrar |
|---|---|
| O que está em produção? | Tags |
| O que mudou na v1.0.0? | CHANGELOG |
| Qual Issue originou RF01? | Issue #1 |
| O CI passou? | Actions |
| Quais commits implementaram RF03? | Issue #2 |
| Como era o projeto antes? | git checkout v0.1.0 |

---

# Entregáveis

| Item | Obrigatório |
|---|---|
| Repositório público | ✅ |
| Branches main/develop | ✅ |
| Branch protection | ✅ |
| Issues #1, #2 e #3 | ✅ |
| Pull Requests | ✅ |
| GitHub Actions | ✅ |
| Tags v0.1.0 / v1.0.0 / v1.0.1 | ✅ |
| CHANGELOG preenchido | ✅ |
| GitHub Release | ✅ |
| README.md | ✅ |

---

# Professor

**Prof. Esp. Jonatas Edward Dias de Oliveira**  
Faculdade SENAI — Gerência de Configuração de Software