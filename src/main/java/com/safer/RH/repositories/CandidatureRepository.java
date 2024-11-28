package com.safer.RH.repositories;

import com.safer.RH.models.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature,Long> {

    @Query("SELECT c FROM Candidature c ORDER BY c.nom  ASC")
    public List<Candidature>getListeAsc();

    public Candidature findByNom(String nom);

    public List<Candidature> findByRecrutementId(Long id);

}
