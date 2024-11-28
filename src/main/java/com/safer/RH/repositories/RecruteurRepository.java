package com.safer.RH.repositories;

import com.safer.RH.models.Recruteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecruteurRepository extends JpaRepository<Recruteur,Integer> {
    @Query("SELECT r FROM Recruteur r ORDER BY r.id ASC")
    List<Recruteur> getAll();
}
