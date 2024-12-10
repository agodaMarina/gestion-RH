package com.safer.RH.services;

import com.safer.RH.Dto.AbsenceDto;
import com.safer.RH.models.Absence;
import com.safer.RH.models.Employe;
import com.safer.RH.repositories.AbsenceRepository;
import com.safer.RH.repositories.EmployeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AbsenceService {
    private final AbsenceRepository absenceRepository;
    private final EmployeRepository employeRepository;

    public void ajouterAbsence(AbsenceDto absence) {
        Absence absence1 = new Absence();
        var employe=employeRepository.findById(absence.getIdEmploye()).get();
        employe.setActif(false);
        absence1.setType(absence.getType());
        absence1.setMotif(absence.getMotif());
        absence1.setDateDebut(absence.getDateDebut());
        absence1.setDateFin(absence.getDateFin());
        absence1.setEmploye(employe);
        employeRepository.save(employe);
        absenceRepository.save(absence1);

    }

    public Absence modifierAbsence(Absence absence) {
        return absenceRepository.save(absence);
    }

    public void supprimerAbsence(int id) {
        absenceRepository.deleteById(id);

    }

//    public List<AbsenceDto> listerAbsence() {
//       List<AbsenceDto> liste=new ArrayList<>();
//       for (Absence absence:absenceRepository.findAll()){
//           String employe=absence.getEmploye().getNom()+" "+absence.getEmploye().getPrenom();
//           liste.add(new AbsenceDto(absence.getId(),absence.getType(),absence.getMotif(),
//                   absence.getDateDebut(),absence.getDateFin(),absence.getEmploye().getId(),employe,));
//       }
//        return liste;
//    }

    public List<AbsenceDto> AllAbsences() {
        List<AbsenceDto> toutesLesAabsences = new ArrayList<>();
        for (Absence absence : absenceRepository.findAll()) {
            LocalDate dateFin = absence.getDateFin();
            LocalDate today = LocalDate.now();

            // Calculer le nombre de jours restants
            long joursRestants = ChronoUnit.DAYS.between(today, dateFin);
            System.out.println("nombre de jours restants = "+joursRestants);
            String employeNomPrenom = absence.getEmploye().getNom() + " " + absence.getEmploye().getPrenom();
            toutesLesAabsences.add(new AbsenceDto(
                    absence.getId(),
                    absence.getType(),
                    absence.getMotif(),
                    absence.getDateDebut(),
                    absence.getDateFin(),
                    absence.getEmploye().getId(),
                    employeNomPrenom,
                    joursRestants // Ajouter les jours restants au DTO
            ));
        }
        return toutesLesAabsences;
    }

    public List<AbsenceDto>AbsencesActives(){
        var liste=AllAbsences();
        var listeActive=new ArrayList<AbsenceDto>();
        for (AbsenceDto absence:liste){
            if (absence.getJoursRestants()>0){
                listeActive.add(absence);
            }
        }
        return listeActive;
    }
    @Scheduled(cron = "0 0 0 * * *") // Tous les jours à minuit
    public void verifierAbsencesAutomatiquement() {
        List<AbsenceDto> absences = AllAbsences();
        for (AbsenceDto absence : absences) {
            if (absence.getJoursRestants() <= 0) {
                Employe employe = employeRepository.findById(absence.getIdEmploye()).get();
                employe.setActif(true);
                employeRepository.save(employe);
            }
        }

    }

    public List<AbsenceDto> listerAbsenceParEmployeId(int employeId) {
        List<AbsenceDto> liste = new ArrayList<>();
        for (Absence absence : absenceRepository.findByEmployeId(employeId)) {
            String employe = absence.getEmploye().getNom() + " " + absence.getEmploye().getPrenom();
            liste.add(new AbsenceDto(absence.getId(), absence.getType(), absence.getMotif(), absence.getDateDebut(), absence.getDateFin(),absence.getEmploye().getId(), employe,0L));
        }
        return liste;
    }


}
