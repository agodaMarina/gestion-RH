package com.safer.RH.services;

import com.safer.RH.Dto.RecruteurDto;
import com.safer.RH.models.Recruteur;
import com.safer.RH.repositories.RecruteurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecruteurService {
    private final RecruteurRepository recruteurRepository;

    public Recruteur addRecruteur (Recruteur recruteur) {
        return recruteurRepository.save(recruteur);
    }

    public Recruteur getRecruteur (int id) {
        return recruteurRepository.findById(id).orElse(null);
    }

    public List<RecruteurDto> getAllRecruteurs () {
       var recruteurs=new ArrayList<RecruteurDto>();
       for (Recruteur recruteur:recruteurRepository.getAll()) {
           recruteurs.add(new RecruteurDto(recruteur.getId(),recruteur.getNom()));
        }
       return recruteurs;
    }

    public Recruteur updateRecruteur (Recruteur recruteur) {
        return recruteurRepository.save(recruteur);
    }
}
