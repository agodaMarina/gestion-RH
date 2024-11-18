package com.safer.RH.repositories;

import com.safer.RH.models.Absence;
import com.safer.RH.models.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface AbsenceRepository extends JpaRepository<Absence,Integer> {
    boolean existsByEmployeAndDateDebutBeforeAndDateFinAfter(Employe employe, LocalDate dateDebut, LocalDate dateFin);
}
