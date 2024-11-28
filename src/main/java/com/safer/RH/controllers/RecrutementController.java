package com.safer.RH.controllers;

import com.safer.RH.models.Candidature;
import com.safer.RH.models.Evaluation;
import com.safer.RH.models.Poste;
import com.safer.RH.services.RecrutementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recrutement")
public class RecrutementController {

    private final RecrutementService recrutementService;

    @PostMapping("/add")
    public ResponseEntity<Void> addRecrutement(
            @RequestParam(required = false) Integer posteId,
            @RequestParam Integer recruteurId,
            @RequestBody(required = false) Poste nouveauPoste) {
        recrutementService.addRecrutement(posteId != null ? posteId : 0, recruteurId, nouveauPoste);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/add/candidature")
    public ResponseEntity<?> ajouterCandidats(
            @RequestParam Long recrutementId,
            @RequestBody List<Candidature> candidatsRequest) {
        recrutementService.ajouterCandidats(recrutementId, candidatsRequest);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{recrutementId}/evaluations")
    public ResponseEntity<Void> evaluation(
            @PathVariable Long recrutementId,
            @RequestBody List<Evaluation> evaluationsRequest) {
        recrutementService.Evaluation(recrutementId, evaluationsRequest);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/end")
    public ResponseEntity<?> endRecrutement(@RequestParam Long recrutementId,List<Long> ids) {
        recrutementService.selectionnerCandidats(recrutementId, ids);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRecrutements() {
        return ResponseEntity.ok(recrutementService.getAllRecrutements());
    }
}
