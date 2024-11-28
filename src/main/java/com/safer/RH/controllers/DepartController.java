package com.safer.RH.controllers;

import com.safer.RH.Dto.DepartDto;
import com.safer.RH.models.Depart;
import com.safer.RH.services.DepartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/depart")
@RequiredArgsConstructor
public class DepartController {

    private final DepartService departService;

    @PostMapping("/ajouter")
    public ResponseEntity<?> ajouter(@RequestBody DepartDto depart) {
        return ResponseEntity.ok().body(departService.ajouterDepart(depart));
    }

    @PutMapping("/modifier")
    public ResponseEntity<?> modifier(@RequestBody Depart depart) {
        departService.modifierDepart(depart);
        return ResponseEntity.ok().body("depart modifié");
    }

    @GetMapping("/lister")
    public ResponseEntity<List<Depart>> lister() {
        return ResponseEntity.ok(departService.listerDepart());
    }

    @DeleteMapping("/supprimer")
    public ResponseEntity<String> supprimer(@RequestParam int id) {
        departService.supprimerDepart(id);
        return ResponseEntity.ok("absence supprimée");
    }
}
