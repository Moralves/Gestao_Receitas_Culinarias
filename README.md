# Gestao_Receitas_Culinarias

Projeto academico fullstack para gestao de receitas culinarias. O frontend em Angular consome uma API REST em Spring Boot.

## Estrutura do repositorio

| Pasta | Conteudo |
| --- | --- |
| `frontend/` | Aplicacao Angular (SPA) |
| `backend/` | API REST com Spring Boot + H2 (persistente em arquivo) |

## Stack e tecnologias

| Camada | Tecnologia |
| --- | --- |
| Frontend | Angular 17 (Standalone), TypeScript 5.4, RxJS 7.8 |
| Backend | Java 17, Spring Boot 3.5, Spring Data JPA, H2 (arquivo local) |
| Documentacao API | springdoc-openapi (Swagger UI) |

## Funcionalidades

| Funcionalidade | Descricao |
| --- | --- |
| Cadastro de receitas | Criar receitas com validacoes obrigatorias |
| Listagem de receitas | Visao em cards com busca por nome |
| Detalhe da receita | Ingredientes, modo de preparo e categoria |
| Exclusao de receitas | Remocao com confirmacao |

## Como rodar do inicio

1. Instale o **Node.js LTS** e o **npm**.
2. Instale o **Java 17**.
3. (Opcional) Instale o **Maven 3.9+** se quiser rodar sem o wrapper (ex.: `sudo apt install maven`, `brew install maven`, `choco install maven`).
4. No terminal, entre na pasta do backend:

Com Maven Wrapper (recomendado, baixa o Maven automaticamente):

```
cd backend
./mvnw spring-boot:run
```

Se estiver no Windows, use:

```
.\mvnw.cmd spring-boot:run
```

Se o Linux recusar permissao, execute antes:

```
chmod +x mvnw
```

Com Maven instalado no sistema (Linux/Windows/macOS):

```
mvn spring-boot:run
```

5. Em outro terminal, entre na pasta do frontend:

```
cd frontend
npm install
```

6. Inicie o servidor de desenvolvimento:

```
npm start
```

7. Acesse `http://localhost:4200` no navegador.
8. A API estara disponivel em `http://localhost:8080/api/receitas`.
9. A documentação da API estara disponivel em `http://localhost:8080/swagger-ui/index.html`.
10. As receitas ficam persistidas em `backend/data/recipebook.*` e permanecem entre reinicios.

## Scripts uteis (frontend)

| Comando | Descricao |
| --- | --- |
| `npm start` | Sobe o servidor de desenvolvimento |
| `npm run build` | Gera build de producao |
| `npm run watch` | Build continuo em modo dev |

## Padrao de comentarios
O codigo mantem um padrao profissional de comentarios para servir como base de estudo. Arquivos tem cabecalho JSDoc e blocos/decisoes relevantes sao documentados com objetividade.
