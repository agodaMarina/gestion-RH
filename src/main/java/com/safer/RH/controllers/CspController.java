package com.safer.RH.controllers;

import com.safer.RH.Dto.CspDto;
import com.safer.RH.models.Csp;
import com.safer.RH.models.Secteur;
import com.safer.RH.services.CspService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/csp")
@RequiredArgsConstructor
public class CspController{
    private final CspService cspService;

    @PostMapping("/ajouter")
    public ResponseEntity<?> ajouterSecteur(@RequestBody Csp csp) {
        return ResponseEntity.ok().body(cspService.addCsp(csp));
    }

    @PutMapping("/modifier")
    public ResponseEntity<?> modifierSecteur(@RequestBody Csp csp) {
        cspService.updateCsp(csp);
        return ResponseEntity.ok().body("Csp modifié");
    }

    @GetMapping("/lister")
    public ResponseEntity<List<CspDto>> lister() {
        return ResponseEntity.ok(cspService.getAllCsps());
    }

//    @DeleteMapping("/supprimer")
//    public ResponseEntity<String> supprimer(@RequestParam int id) {
//        cspService.(id);
//        return ResponseEntity.ok("Candidature supprimée");
//    }
}
