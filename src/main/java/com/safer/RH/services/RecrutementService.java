package com.safer.RH.services;

import com.safer.RH.models.*;
import com.safer.RH.repositories.PosteRepository;
import com.safer.RH.repositories.RecrutementRepository;
import com.safer.RH.repositories.RecruteurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecrutementService {
    private final RecrutementRepository recrutementRepository;
    private final PosteRepository posteRepository;
    private final RecruteurRepository recruteurRepository;
    private final CandidatureService candidatureService;

    public void addRecrutement(int posteId,int RecruteurId) {
        Poste poste = posteRepository.findById(posteId)
                .orElseThrow();
        Recruteur recruteur = recruteurRepository.findById(RecruteurId)
                .orElseThrow();
        Recrutement recrutement = new Recrutement();
        recrutement.setPoste(poste);
        recrutement.setRecruteur(recruteur);
        recrutement.setEtapeActuelle("Initialisation");
        recrutement.setStatut(StateRecrutement.EN_COURS);
        recrutement.setDateDebut(LocalDate.now());
        recrutementRepository.save(recrutement);
    }

    public void ajouterCandidats(Long recrutementId, List<Candidature> candidats) {
        Recrutement recrutement = recrutementRepository.findById(recrutementId)
                .orElseThrow();
        for (Candidature candidature : candidats) {
             candidature.setRecrutement(recrutement);
             candidatureService.ajouter(candidature);
             recrutement.getCandidats().add(candidature);
        }
        recrutement.setEtapeActuelle("ajout de candidats");
        recrutementRepository.save(recrutement);
    }

    public void Evaluation(Long recrutementId) {
        Recrutement recrutement = recrutementRepository.findById(recrutementId)
                .orElseThrow();
        //evaluer chaque candidats
        recrutement.setEtapeActuelle("Evaluation");
        recrutementRepository.save(recrutement);
    }
}
