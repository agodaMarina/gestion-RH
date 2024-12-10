package com.safer.RH.controllers;


import com.safer.RH.Dto.AbsenceDto;
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
    public ResponseEntity<?> ajouter(@RequestBody AbsenceDto absence) {
        absenceService.ajouterAbsence(absence);
        return ResponseEntity.ok().body("absence ajouté");
    }

    @PutMapping("/modifier")
    public ResponseEntity<?> modifier(@RequestBody Absence absence) {
        absenceService.modifierAbsence(absence);
        return ResponseEntity.ok().body("absence modifié");
    }

    @GetMapping("/lister")
    public ResponseEntity<List<AbsenceDto>> lister() {
        return ResponseEntity.ok(absenceService.AllAbsences());
    }
    @GetMapping("/listeActives")
    public ResponseEntity<List<AbsenceDto>> listeDesAbsencesActives() {
        return ResponseEntity.ok(absenceService.AbsencesActives());
    }

    @DeleteMapping("/supprimer")
    public ResponseEntity<String> supprimer(@RequestParam int id) {
        absenceService.supprimerAbsence(id);
        return ResponseEntity.ok("absence supprimée");
    }

}
