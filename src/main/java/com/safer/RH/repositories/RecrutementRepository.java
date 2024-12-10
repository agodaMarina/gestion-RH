package com.safer.RH.repositories;

import com.safer.RH.models.Candidature;
import com.safer.RH.models.Recrutement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecrutementRepository extends JpaRepository<Recrutement,Long> {

    public List<Candidature>getCandidaturesById(Long recrutementId);
}
