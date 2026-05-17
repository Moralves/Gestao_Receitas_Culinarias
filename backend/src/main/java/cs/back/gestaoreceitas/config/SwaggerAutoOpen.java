package cs.back.gestaoreceitas.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import java.awt.Desktop;
import java.net.URI;

@Component
public class SwaggerAutoOpen {

    @EventListener(ApplicationReadyEvent.class)
    public void abrirSwagger() {
        try {
            Desktop.getDesktop().browse(new URI("http://localhost:8080/swagger-ui/index.html"));
        } catch (Exception e) {
            System.out.println("Swagger disponível em: http://localhost:8080/swagger-ui/index.html");
        }
    }
}