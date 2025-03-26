package com.safer.RH.services;

import com.safer.RH.Dto.DepartDto;
import com.safer.RH.models.Depart;
import com.safer.RH.repositories.DepartRepository;
import com.safer.RH.repositories.EmployeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartService {

    private final DepartRepository departRepository;
    private final EmployeRepository employeRepository;

    public List<DepartDto> listerDepart() {
        List<DepartDto> liste = new ArrayList<>();
        for (Depart depart : departRepository.findAll()) {
            liste.add(
                    new DepartDto(
                            depart.getId(),
                            depart.getRaison(),
                            depart.getEmploye().getNom() + " " + depart.getEmploye().getPrenom(),
                            depart.getDateDepart()
                    )
            );
        }
        return liste;
    }



    @Transactional
    public void ajouterDepart(DepartDto depart) {
        Depart depart1 = new Depart();
        depart1.setRaison(depart.getRaison());
        depart1.setDateDepart(LocalDate.now());
        depart1.setEmploye(
                employeRepository
                        .getEmployeByNomAndPrenom(
                                depart
                                        .getEmploye()
                                        .split(" ")[0],
                                depart
                                        .getEmploye()
                                        .split(" ")[1]));
        departRepository.save(depart1);
        var employe= depart1.getEmploye();
        employe.setActif(false);
        employe.setDateDepart(depart.getDateDepart());
        employeRepository.save(employe);

    }

    public Depart modifierDepart(Depart depart) {
        return departRepository.save(depart);
    }

    public void supprimerDepart(int id) {
        departRepository.deleteById(id);
    }
}
