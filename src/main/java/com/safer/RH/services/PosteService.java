package com.safer.RH.services;

import com.safer.RH.Dto.PosteDto;
import com.safer.RH.exception.LibelleDejaExistantException;
import com.safer.RH.exception.PosteAssigneException;
import com.safer.RH.models.Poste;
import com.safer.RH.repositories.EmployeRepository;
import com.safer.RH.repositories.PosteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PosteService {

    private final PosteRepository posteRepository;
    private final EmployeRepository employeRepository;
    private final SecteurService secteurService;

    public Poste ajouterPoste(PosteDto posteDto) {
        var poste=new Poste();
        if (posteRepository.existsByLibelle(posteDto.getLibelle())) {
            throw new LibelleDejaExistantException("Un poste avec le libellé '" + posteDto.getLibelle() + "' existe déjà.");
        }else {
            poste.setId(posteDto.getId());
            poste.setLibelle(posteDto.getLibelle());
            poste.setNiveauEtude(posteDto.getNiveauEtude());
            poste.setDescription(posteDto.getDescription());
            poste.setNiveauDeSalaire(posteDto.getNiveauDeSalaire());
            poste.setRemarque(posteDto.getRemarque());
            poste.setSecteur(secteurService.getSecteurByLibelle(posteDto.getSecteur()));
            poste.setReference(generatereference());
        }

        return posteRepository.save(poste);
    }

    public void modifierPoste(Poste poste) {
        posteRepository.save(poste);
    }

    public void supprimerPoste(int id) {
        // Vérifier si des employés sont associés à ce poste
        if (employeRepository.existsByPosteId(id)) {
            throw new PosteAssigneException("Impossible de supprimer le poste car il est assigné à un employé.");
        }

        posteRepository.deleteById(id);
    }

    public List<PosteDto> listerPoste() {
        List<PosteDto> liste = new ArrayList<>();
        for (Poste poste : posteRepository.getAll()) {
            liste.add(new PosteDto(poste.getId(), poste.getReference(),poste.getLibelle(),poste.getNiveauEtude(),poste.getDescription(),poste.getNiveauDeSalaire(),poste.getRemarque(),poste.getSecteur().getLibelle()));
        }
        return liste;
    }

    public Poste getPosteById(int id) {
        return posteRepository.findById(id).orElse(null);
    }

    public String generatereference(){
        return "REF"+(int)(Math.random()*1000);
    }
}
