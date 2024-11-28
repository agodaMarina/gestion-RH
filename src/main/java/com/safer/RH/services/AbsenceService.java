package com.safer.RH.services;

import com.safer.RH.Dto.AbsenceDto;
import com.safer.RH.models.Absence;
import com.safer.RH.repositories.AbsenceRepository;
import com.safer.RH.repositories.EmployeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AbsenceService {
    private final AbsenceRepository absenceRepository;
    private final EmployeRepository employeRepository;

    public Absence ajouterAbsence(AbsenceDto absence) {
        Absence absence1 = new Absence();
        absence1.setType(absence.getType());
        absence1.setMotif(absence.getMotif());
        absence1.setDateDebut(absence.getDateDebut());
        absence1.setDateFin(absence.getDateFin());
        absence1.setEmploye(employeRepository.getEmployeByNomAndPrenom(absence.getEmploye().split(" ")[0], absence.getEmploye().split(" ")[1]));
        return absenceRepository.save(absence1);
    }

    public Absence modifierAbsence(Absence absence) {
        return absenceRepository.save(absence);
    }

    public void supprimerAbsence(int id) {
        absenceRepository.deleteById(id);

    }

    public List<AbsenceDto> listerAbsence() {
       List<AbsenceDto> liste=new ArrayList<>();
       for (Absence absence:absenceRepository.findAll()){
           String employe=absence.getEmploye().getNom()+absence.getEmploye().getPrenom();
           liste.add(new AbsenceDto(absence.getId(),absence.getType(),absence.getMotif(),absence.getDateDebut(),absence.getDateFin(),employe));
       }
        return liste;
    }
}
