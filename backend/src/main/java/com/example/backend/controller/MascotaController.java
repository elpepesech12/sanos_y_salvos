package com.example.backend.controller;

import com.example.backend.model.Mascota;
import com.example.backend.repository.MascotaRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(origins = "*")
public class MascotaController {
    
    @Autowired
    private MascotaRepository mascotaRepository;
    
    @Autowired
    private KafkaTemplate<String, Mascota> kafkaTemplate;

    @GetMapping
    @CircuitBreaker(name = "dbMascotas", fallbackMethod = "fallbackListar")
    @Retry(name = "dbMascotas")
    public List<Mascota> listar() {
        return mascotaRepository.findAll();
    }

    @PostMapping
    @CircuitBreaker(name = "dbMascotas", fallbackMethod = "fallbackGrabar")
    public Mascota grabar(@RequestBody Mascota mascota) {
        return mascotaRepository.save(mascota);
    }

    // --- FALLBACKS ---
    public List<Mascota> fallbackListar(Throwable e) {
        System.err.println("DB Caída. Modo Resiliencia activo: " + e.getMessage());
        return Collections.emptyList(); 
    }

    public Mascota fallbackGrabar(Mascota mascota, Throwable e) {
        System.err.println("Error al grabar, enviando a cola de pendientes...");
        kafkaTemplate.send("reportes-pendientes", mascota); // Se guarda en Kafka para después 
        Mascota errorMsg = new Mascota();
        errorMsg.setNombre("Sistema en mantenimiento. Su reporte se procesará pronto.");
        return errorMsg;
    }
}
