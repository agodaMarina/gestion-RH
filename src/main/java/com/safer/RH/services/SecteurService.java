package com.safer.RH.services;

import com.safer.RH.Dto.SecteurDto;
import com.safer.RH.models.Secteur;
import com.safer.RH.repositories.SecteurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SecteurService {

    private final SecteurRepository secteurRepository;

    public Secteur ajouterSecteur(Secteur secteur) {
        return secteurRepository.save(secteur);
    }

    public void modifierSecteur(Secteur secteur) {
        secteurRepository.save(secteur);
    }

    public void supprimerSecteur(int id ) {
        secteurRepository.deleteById(id);
    }

    public Secteur getSecteurById(int id) {
        return secteurRepository.findById(id).orElse(null);
    }

    public Secteur getSecteurByLibelle(String libelle) {
        return secteurRepository.findByLibelle(libelle);
    }

    public List<SecteurDto> listerSecteur() {
        List<SecteurDto> liste = new ArrayList<>();
        for (Secteur secteur : secteurRepository.findAllOrderByLibelleAsc()) {
            liste.add(new SecteurDto(secteur.getId(), secteur.getLibelle()));
        }
        return liste;
    }
}
