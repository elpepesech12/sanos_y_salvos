package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.example.backend.repository.MascotaRepository;

@Service
public class ServicioKafka {
    @Autowired
    private MascotaRepository repository;

    @KafkaListener(topics = "reportes", groupId = "mascotas-group")
    public void actualizarEstado(String mensaje) {
        // Formato esperado: "id:nuevoEstado" (ej: "1:Encontrado")
        String[] datos = mensaje.split(":");
        Long id = Long.parseLong(datos[0]);
        String nuevoEstado = datos[1];

        repository.findById(id).ifPresent(m -> {
            m.setEstado(nuevoEstado);
            repository.save(m);
            System.out.println("Mascota ID " + id + " actualizada a: " + nuevoEstado);
        });
    }
}