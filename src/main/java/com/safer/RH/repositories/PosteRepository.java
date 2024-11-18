package com.safer.RH.repositories;

import com.safer.RH.models.Poste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PosteRepository extends JpaRepository <Poste,Integer> {

    @Query("SELECT p FROM Poste p ORDER BY p.id DESC")
    List<Poste> getAll();

    boolean existsByLibelle(String libelle);


}
