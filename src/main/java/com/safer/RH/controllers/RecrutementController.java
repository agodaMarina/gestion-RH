package com.safer.RH.controllers;

import com.safer.RH.Dto.CandidatureDto;
import com.safer.RH.models.*;
import com.safer.RH.services.CandidatureService;
import com.safer.RH.services.RecrutementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recrutement")
public class RecrutementController {

    private final RecrutementService recrutementService;
    private final CandidatureService candidatureService;

    @PostMapping("/add")
    public Long addRecrutement(
            @RequestParam(required = false) Integer posteId,
            @RequestParam Integer recruteurId,
            @RequestParam String contrat,
            @RequestBody(required = false) Poste nouveauPoste) {
        return  recrutementService.addRecrutement(posteId != null ? posteId : 0, recruteurId,contrat,nouveauPoste);

    }

    @PutMapping("/add/candidature")
    public ResponseEntity<?> ajouterCandidats(
            @RequestParam Long recrutementId,
            @RequestBody List<CandidatureDto> candidatsRequest) {
        recrutementService.ajouterCandidats(recrutementId, candidatsRequest);
        return ResponseEntity.ok().build();
    }

//    @PutMapping("/{recrutementId}/evaluations")
//    public ResponseEntity<Void> evaluation(
//            @PathVariable Long recrutementId,
//            @RequestBody List<Evaluation> evaluationsRequest) {
//        recrutementService.Evaluation(recrutementId, evaluationsRequest);
//        return ResponseEntity.ok().build();
//    }

    @PutMapping(value = "/end",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> endRecrutement(@RequestParam Long recrutementId, @RequestPart List<Long>ids, @RequestPart Contrat contrat) {
        recrutementService.selectionnerCandidats(contrat,recrutementId,ids);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{recrutementId}/allCandidates")
    public ResponseEntity<List<CandidatureDto>> getAllCandidates(@PathVariable Long recrutementId) {
        return ResponseEntity.ok(recrutementService.getCandidats(recrutementId));
    }
    @GetMapping("/{recrutementId}")
    public  ResponseEntity<?> getRecrutement(@PathVariable Long recrutementId) {
        return ResponseEntity.ok(recrutementService.getRecrutementById(recrutementId));
    }
    @PutMapping("/{id}/est-retinu")
    public ResponseEntity<?> modifierEstRetenu(
            @PathVariable Long id,
            @RequestParam boolean estRetenu
    ) {
    candidatureService.modifierEstRetenu(id, estRetenu);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRecrutements() {
        return ResponseEntity.ok(recrutementService.getAllRecrutements());
    }
}
