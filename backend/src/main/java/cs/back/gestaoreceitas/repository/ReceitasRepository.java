package cs.back.gestaoreceitas.repository;

import cs.back.gestaoreceitas.entity.Receitas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReceitasRepository extends JpaRepository<Receitas, Long> {

    List<Receitas> findByNomeContainingIgnoreCase(String nome);
    boolean existsByNomeIgnoreCase(String nome);
}