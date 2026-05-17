package cs.back.gestaoreceitas.controller;

import cs.back.gestaoreceitas.entity.Receitas;
import cs.back.gestaoreceitas.repository.ReceitasRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/receitas")
public class ReceitasController {

    @Autowired
    private ReceitasRepository repository;

    // RF01 — lista todas ordenadas por dataCadastro desc (CA01.2)
    // RF02 — busca por nome em tempo real via query param (CA02.1, CA02.2, CA02.3)
    @GetMapping
    public List<Receitas> listar(@RequestParam(required = false) String nome) {
        List<Receitas> receitas;

        if (nome != null && !nome.isBlank()) {
            receitas = repository.findByNomeContainingIgnoreCase(nome);
        } else {
            receitas = repository.findAll();
        }

        // CA01.2 — mais recentes primeiro
        receitas.sort(Comparator.comparing(Receitas::getDataCadastro).reversed());
        return receitas;
    }

    // RF04 — detalhe completo (CA04.1, CA04.2, CA04.3)
    @GetMapping("/{id}")
    public Receitas buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Receita nao encontrada"));
    }

    // RF03 — cadastrar receita (CA03.1, CA03.2, CA03.3)
    // RN01 — nome unico
    @PostMapping
    public ResponseEntity<Receitas> criar(@Valid @RequestBody Receitas receita) {
        if (repository.existsByNomeIgnoreCase(receita.getNome())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Ja existe uma receita com este nome");
        }
        Receitas salva = repository.save(receita);
        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    // RF05 — excluir (CA05.1 confirmacao no front, CA05.4 remove do banco)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Receita nao encontrada");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}