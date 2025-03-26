package com.safer.RH.services;

import com.safer.RH.Dto.CandidatureDto;
import com.safer.RH.Dto.RecrutementDto;
import com.safer.RH.models.*;
import com.safer.RH.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecrutementService {
    private final RecrutementRepository recrutementRepository;
    private final PosteRepository posteRepository;
    private final RecruteurRepository recruteurRepository;
    private final CandidatureRepository candidatureRepository;
    private final EvaluationRepository evaluationRepository;
    private final EmployeRepository employeeRepository;
    private final CandidatureService candidatureService;

    public Long addRecrutement(int posteId,int RecruteurId,String contrat,Poste nouveauPoste) {
        Poste poste;
        // Vérifier si le poste existe, sinon créer un nouveau poste
        if (posteId == 0 && nouveauPoste != null) {
            poste = posteRepository.save(nouveauPoste);
        } else {
             poste = posteRepository.findById(posteId)
                    .orElseThrow();
        }
        Recruteur recruteur = recruteurRepository.findById(RecruteurId)
                .orElseThrow();
        Recrutement recrutement = new Recrutement();
        recrutement.setPoste(poste);
        recrutement.setRecruteur(recruteur);
        recrutement.setTypeContrat(contrat);
        recrutement.setEtapeActuelle("Initialisation");
        recrutement.setStatut(StateRecrutement.EN_COURS);
        recrutement.setDateDebut(LocalDate.now());
        return recrutementRepository.save(recrutement).getId();

    }

    @Transactional
    public void ajouterCandidats(Long recrutementId, List<CandidatureDto> candidats) {
        Recrutement recrutement = recrutementRepository.findById(recrutementId)
                .orElseThrow();
        for (CandidatureDto candidature : candidats) {
            Candidature candidature1 = new Candidature();
            candidature1.setNom(candidature.getNom());
            candidature1.setPrenom(candidature.getPrenom());
            candidature1.setAdresse(candidature.getAdresse());
            candidature1.setTelephone(candidature.getTelephone());
            candidature1.setEmail(candidature.getEmail());
            candidature1.setApreciationGlobale(candidature.getApreciationGlobale());
            candidature1.setDateEntretien1(candidature.getDateEntretien1());
            candidature1.setNoteExperience(candidature.getNoteExperience());
            candidature1.setNotePresentation(candidature.getNotePresentation());
            candidature1.setNoteCompetenceEtAtout(candidature.getNoteCompetenceEtAtout());
            candidature1.setNoteSavoirEtre(candidature.getNoteSavoirEtre());
            candidature1.setNoteQualiteEtDefaut(candidature.getNoteQualiteEtDefaut());
            candidature1.setMoyenne((candidature.getNoteExperience() + candidature.getNotePresentation()+candidature.getNoteCompetenceEtAtout()+candidature.getNoteSavoirEtre()+candidature.getNoteQualiteEtDefaut()) / 5);
            candidature1.setEstRetenu(false);
             candidature1.setRecrutement(recrutement);
             candidatureService.ajouter(candidature1);
             recrutement.getCandidats().add(candidature1);
        }
        recrutement.setEtapeActuelle("ajout des candidats");
        recrutementRepository.save(recrutement);
    }

    @Transactional
    public void TerminerRecrutement(Long recrutementId) {
        Recrutement recrutement = recrutementRepository.findById(recrutementId)
                .orElseThrow();
        recrutement.setStatut(StateRecrutement.TERMINE);
        recrutement.setEtapeActuelle("Terminé");
        recrutement.setDateFin(LocalDate.now());
        recrutementRepository.save(recrutement);
    };

    @Transactional
    public List<Employe> selectionnerCandidats(Contrat contrat,Long recrutementId,List<Long>listIdCandidats) {
        var recrutement=recrutementRepository.getById(recrutementId);
        List<Employe> employes=new ArrayList<>();
        for (Long id : listIdCandidats) {
            Candidature candidature = recrutement.getCandidats().stream().filter(candidature1 -> candidature1.getId().equals(id)).findFirst().orElseThrow();
            candidature.setEstRetenu(true);
            var employe=new Employe();
                    employe.setNom(candidature.getNom());
                    employe.setPrenom(candidature.getPrenom());
                    employe.setTel(candidature.getTelephone());
                    employe.setAdresse(candidature.getAdresse());
                    employe.setPoste(candidature.getRecrutement().getPoste());
                    employe.setContrat(contrat);
                    employe.setActif(true);
            employes.add(employeeRepository.save(employe));
        }
        recrutement.setStatut(StateRecrutement.TERMINE);
        recrutement.setEtapeActuelle("Fin du processus de recrutement");
        recrutement.setDateFin(LocalDate.now());
        recrutementRepository.save(recrutement);

        return employes;
    }

    public List<RecrutementDto> getAllRecrutements() {
        List<RecrutementDto> listeDesRecrutems=new ArrayList<>();
        for (Recrutement recrutement : recrutementRepository.findAll()) {
            RecrutementDto recrutementDto=new RecrutementDto();
            recrutementDto.setId(recrutement.getId());
            recrutementDto.setPoste(recrutement.getPoste().getLibelle());
            recrutementDto.setSalaire(recrutement.getPoste().getNiveauDeSalaire());
            recrutementDto.setNiveauEtude(recrutement.getPoste().getNiveauEtude());
            recrutementDto.setRecruteur(recrutement.getRecruteur().getNom());
            recrutementDto.setStatut(recrutement.getStatut().name());
            recrutementDto.setEtapeActuelle(recrutement.getEtapeActuelle());
            recrutementDto.setDateDebut(recrutement.getDateDebut());
            recrutementDto.setDateFin(recrutement.getDateFin());
            listeDesRecrutems.add(recrutementDto);
        }
        return listeDesRecrutems;
    }

    public List<CandidatureDto> getCandidats(Long recrutementId) {
        List<CandidatureDto> candidatureDtos = new ArrayList<>();
        // Récupérer les candidatures associées au recrutement
        List<Candidature> candidatures = recrutementRepository.getCandidaturesById(recrutementId);
        if (candidatures == null || candidatures.isEmpty()) {
            return candidatureDtos; // Retourner une liste vide si aucune candidature
        }

        for (Candidature candidature : candidatures) {
            CandidatureDto candidatureDto = new CandidatureDto();
            candidatureDto.setId(candidature.getId());
            candidatureDto.setNom(candidature.getNom());
            candidatureDto.setPrenom(candidature.getPrenom());
            candidatureDto.setAdresse(candidature.getAdresse());
            candidatureDto.setTelephone(candidature.getTelephone());
            candidatureDto.setEmail(candidature.getEmail());
            candidatureDto.setApreciationGlobale(candidature.getApreciationGlobale());
            candidatureDto.setEstRetenu(candidature.isEstRetenu());
            candidatureDto.setDateEntretien1(candidature.getDateEntretien1());
            candidatureDto.setMoyenne(candidature.getMoyenne());
            candidatureDtos.add(candidatureDto);
        }
        return candidatureDtos;

    }


    public RecrutementDto getRecrutementById(Long recrutementId) {
        Recrutement recrutement = recrutementRepository.findById(recrutementId)
                .orElseThrow();
        RecrutementDto recrutementDto = new RecrutementDto();
        recrutementDto.setId(recrutement.getId());
        recrutementDto.setPoste(recrutement.getPoste().getLibelle());
        recrutementDto.setSalaire(recrutement.getPoste().getNiveauDeSalaire());
        recrutementDto.setNiveauEtude(recrutement.getPoste().getNiveauEtude());
        recrutementDto.setRecruteur(recrutement.getRecruteur().getNom());
        recrutementDto.setStatut(recrutement.getStatut().name());
        recrutementDto.setEtapeActuelle(recrutement.getEtapeActuelle());
        recrutementDto.setDateDebut(recrutement.getDateDebut());
        recrutementDto.setDateFin(recrutement.getDateFin());
        return recrutementDto;
    }
}
