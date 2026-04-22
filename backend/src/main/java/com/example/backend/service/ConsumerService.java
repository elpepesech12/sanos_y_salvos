package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.example.backend.repository.MascotaRepository;

@Service
public class ConsumerService {

    @Autowired
    private MascotaRepository mascotaRepository;

    @KafkaListener(topics = "reportes-mascotas", groupId = "mascotas-group")
    public void actualizarEstadoMascota(String mensaje) {
        String[] partes = mensaje.split(":");
        Long id = Long.parseLong(partes[0]);
        String estado = partes[1];

        mascotaRepository.findById(id).ifPresent(mascota -> {
            mascota.setEstado(estado);
            mascotaRepository.save(mascota);
            System.out.println("Kafka actualizó el estado de la mascota ID: " + id);
        });
    }
}