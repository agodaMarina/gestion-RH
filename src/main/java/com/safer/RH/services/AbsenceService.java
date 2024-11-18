package com.safer.RH.services;

import com.safer.RH.models.Absence;
import com.safer.RH.repositories.AbsenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AbsenceService {
    private final AbsenceRepository absenceRepository;

    public Absence ajouterAbsence(Absence absence) {
        return absenceRepository.save(absence);
    }

    public Absence modifierAbsence(Absence absence) {
        return absenceRepository.save(absence);
    }

    public void supprimerAbsence(int id) {
        absenceRepository.deleteById(id);

    }

    public List<Absence> listerAbsence() {
        return absenceRepository.findAll();
    }
}
