package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @PostMapping("/{id}/{nuevoEstado}")
    public String procesarReporte(@PathVariable Long id, @PathVariable String nuevoEstado) {
        // Ejemplo de mensaje: "1:Encontrado"
        String mensaje = id + ":" + nuevoEstado;
        kafkaTemplate.send("reportes-mascotas", mensaje);
        return "Reporte enviado a la cola de procesamiento.";
    }
}
