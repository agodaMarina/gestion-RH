package com.safer.RH.services;

import com.safer.RH.exception.LibelleDejaExistantException;
import com.safer.RH.exception.PosteAssigneException;
import com.safer.RH.models.Poste;
import com.safer.RH.repositories.EmployeRepository;
import com.safer.RH.repositories.PosteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PosteService {

    private final PosteRepository posteRepository;
    private final EmployeRepository employeRepository;

    public Poste ajouterPoste(Poste poste) {
        // Vérification de l'unicité du libellé
        if (posteRepository.existsByLibelle(poste.getLibelle())) {
            throw new LibelleDejaExistantException("Un poste avec le libellé '" + poste.getLibelle() + "' existe déjà.");
        }
        poste.setReference(generatereference());
        return posteRepository.save(poste);
    }

    public void modifierPoste(Poste poste) {
        posteRepository.save(poste);
    }

    public void supprimerPoste(int id) {
        // Vérifier si des employés sont associés à ce poste
        if (employeRepository.existsByPosteId(id)) {
            throw new PosteAssigneException("Impossible de supprimer le poste car il est assigné à au moins un employé.");
        }

        posteRepository.deleteById(id);
    }

    public List<Poste> listerPoste() {
        return posteRepository.getAll();
    }

    public Poste getPosteById(int id) {
        return posteRepository.findById(id).orElse(null);
    }

    public String generatereference(){
        return "REF"+(int)(Math.random()*1000);
    }
}
