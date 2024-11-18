package com.safer.RH.services;

import com.safer.RH.models.Depart;
import com.safer.RH.repositories.DepartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartService {

    private final DepartRepository departRepository;

    public List<Depart> listerDepart() {
        return departRepository.findAll();
    }

    public Depart ajouterDepart(Depart depart) {
        return departRepository.save(depart);
    }

    public Depart modifierDepart(Depart depart) {
        return departRepository.save(depart);
    }

    public void supprimerDepart(int id) {
        departRepository.deleteById(id);
    }
}
