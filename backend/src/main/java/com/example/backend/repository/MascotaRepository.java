package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Mascota;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> { }
