package com.safer.RH.controllers;


import com.safer.RH.Dto.SecteurDto;
import com.safer.RH.models.Secteur;
import com.safer.RH.services.SecteurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/secteur")
@RequiredArgsConstructor
public class SecteurController {
    private final SecteurService secteurService;

    @PostMapping("/ajouter")
    public ResponseEntity<?> ajouterSecteur(@RequestBody Secteur secteur) {
        return ResponseEntity.ok().body(secteurService.ajouterSecteur(secteur));
    }

    @PutMapping("/modifier")
    public ResponseEntity<?> modifierSecteur(@RequestBody Secteur secteur) {
       secteurService.modifierSecteur(secteur);
        return ResponseEntity.ok().body("Secteur modifié");
    }

    @GetMapping("/lister")
    public ResponseEntity<List<SecteurDto>> lister() {
        return ResponseEntity.ok(secteurService.listerSecteur());
    }

    @DeleteMapping("/supprimer")
    public ResponseEntity<String> supprimer(@RequestParam int id) {
        secteurService.supprimerSecteur(id);
        return ResponseEntity.ok("Secteur supprimée");
    }
}
