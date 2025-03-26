package com.safer.RH.repositories;

import com.safer.RH.models.Candidature;
import com.safer.RH.models.Recrutement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecrutementRepository extends JpaRepository<Recrutement,Long> {

    @Query("SELECT c FROM Candidature c WHERE c.recrutement.id = :recrutementId")
    List<Candidature> getCandidaturesById(Long recrutementId);
}
