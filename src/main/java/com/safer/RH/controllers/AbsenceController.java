package com.safer.RH.controllers;


import com.safer.RH.models.Absence;
import com.safer.RH.services.AbsenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/absence")
public class AbsenceController {

    private final AbsenceService absenceService;

    @PostMapping("/ajouter")
    public ResponseEntity<?> ajouter(@RequestBody Absence absence) {
        return ResponseEntity.ok().body(absenceService.ajouterAbsence(absence));
    }

    @PutMapping("/modifier")
    public ResponseEntity<?> modifier(@RequestBody Absence absence) {
        absenceService.modifierAbsence(absence);
        return ResponseEntity.ok().body("absence modifié");
    }

    @GetMapping("/lister")
    public ResponseEntity<List<Absence>> lister() {
        return ResponseEntity.ok(absenceService.listerAbsence());
    }

    @DeleteMapping("/supprimer")
    public ResponseEntity<String> supprimer(@RequestParam int id) {
        absenceService.supprimerAbsence(id);
        return ResponseEntity.ok("absence supprimée");
    }

}
