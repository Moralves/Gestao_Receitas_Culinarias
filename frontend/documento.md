# Guia de fases - Frontend (Gestao de Receitas Culinarias)

## Visao geral
Este guia organiza a evolucao do frontend em fases objetivas para facilitar commits profissionais e revisao incremental. O backend sera desenvolvido em **Java + Spring Boot** (somente referencia), portanto o frontend sera preparado para consumir APIs REST, sem implementar backend neste repositorio.

## Padrao de commits recomendado (Conventional Commits)
Use mensagens curtas e consistentes para manter o historico claro.

Exemplos:
- `feat(ui): criar shell e navegacao base`
- `docs(frontend): documentar stack e funcionalidades`
- `refactor(ui): padronizar componentes de layout`
- `chore(tooling): ajustar scripts de build`

## Padrao de comentarios (base de estudo)
O codigo deve seguir um padrao uniforme de comentarios:
1. **Cabecalho do arquivo (JSDoc)**: descreve o proposito e o contexto.
2. **Componentes/servicos**: comentario JSDoc acima da classe.
3. **Blocos nao obvios**: comentarios curtos explicando decisoes.
4. **HTML**: comentarios de secao (`<!-- -->`).
5. **CSS**: comentarios de secao (`/* */`).

## Fases de implementacao

### Fase 1 - Fundacao e identidade (inicio imediato)
Objetivo: criar base visual e estrutural.
- Layout principal (header, navegacao, conteudo, rodape)
- Rotas iniciais e paginas de entrada
- Design tokens e estilos globais
- README do frontend

Commits sugeridos:
- `docs(frontend): criar README com stack e funcionalidades`
- `feat(ui): criar shell, navegacao e paginas iniciais`
- `style(ui): definir tokens e estilos globais`

### Fase 2 - Modelagem e integracao preparada
Objetivo: preparar modelos e camada de dados.
- Interfaces de dominio (Receita, Categoria, Ingrediente)
- Servicos com contratos de API (HTTP)
- Dados mockados para simular backend

Commits sugeridos:
- `feat(data): adicionar modelos de dominio`
- `feat(data): criar servicos e mocks`

### Fase 3 - CRUD de receitas
Objetivo: fluxo principal do sistema.
- Listagem com cards
- Detalhe da receita
- Cadastro e edicao com formulario e validacoes
- Exclusao com confirmacao

Commits sugeridos:
- `feat(recipes): listar receitas`
- `feat(recipes): criar detalhe de receita`
- `feat(recipes): adicionar formulario de receita`

### Fase 4 - Organizacao e descoberta
Objetivo: melhorar navegacao do conteudo.
- Categorias e filtros
- Busca por nome/ingredientes
- Ordenacao

Commits sugeridos:
- `feat(search): adicionar filtros e busca`

### Fase 5 - Qualidade de UX
Objetivo: polimento profissional.
- Estados vazios e de erro
- Acessibilidade basica (foco, contraste, labels)
- Responsividade refinada

Commits sugeridos:
- `feat(ux): adicionar estados vazios e erros`
- `feat(a11y): ajustes de acessibilidade`

### Fase 6 - Hardening e entrega
Objetivo: fechar com qualidade.
- Revisao de performance
- Revisao visual e documentacao final
- Checklist de release

Commits sugeridos:
- `chore(release): revisar documentacao e preparacao final`
