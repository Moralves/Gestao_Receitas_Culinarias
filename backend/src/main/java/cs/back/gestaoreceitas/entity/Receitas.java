package cs.back.gestaoreceitas.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "nome"))
public class Receitas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @NotBlank(message = "Nome e obrigatorio")
    @Size(min = 3, message = "Nome deve ter no minimo 3 caracteres")
    @Column(unique = true, nullable = false)
    private String nome;

    @NotNull(message = "Categoria e obrigatoria")
    @Enumerated(EnumType.STRING)
    private EnumCategoria categoria;

    @NotNull(message = "Tempo de preparo e obrigatorio")
    @Min(value = 1, message = "Tempo de preparo minimo e 1 minuto")
    private Integer tempoPreparo;

    @NotNull(message = "Porcoes e obrigatorio")
    @Min(value = 1, message = "Porcoes minimo e 1")
    private Integer porcoes;

    @NotNull(message = "Ingredientes sao obrigatorios")
    @Size(min = 1, message = "Informe pelo menos 1 ingrediente")
    @ElementCollection
    @CollectionTable(
            name = "receita_ingredientes",
            joinColumns = @JoinColumn(name = "receita_id")
    )
    @Column(name = "ingrediente")
    private List<String> ingredientes;

    @NotBlank(message = "Modo de preparo e obrigatorio")
    @Size(min = 10, message = "Modo de preparo deve ter no minimo 10 caracteres")
    @Column(columnDefinition = "TEXT")
    private String modoPreparo;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @PrePersist
    protected void onCreate() {
        this.dataCadastro = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public EnumCategoria getCategoria() { return categoria; }
    public void setCategoria(EnumCategoria categoria) { this.categoria = categoria; }

    public Integer getTempoPreparo() { return tempoPreparo; }
    public void setTempoPreparo(Integer tempoPreparo) { this.tempoPreparo = tempoPreparo; }

    public Integer getPorcoes() { return porcoes; }
    public void setPorcoes(Integer porcoes) { this.porcoes = porcoes; }

    public List<String> getIngredientes() { return ingredientes; }
    public void setIngredientes(List<String> ingredientes) { this.ingredientes = ingredientes; }

    public String getModoPreparo() { return modoPreparo; }
    public void setModoPreparo(String modoPreparo) { this.modoPreparo = modoPreparo; }

    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
}