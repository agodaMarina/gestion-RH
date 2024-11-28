package com.safer.RH.controllers;

import com.safer.RH.Dto.PosteDto;
import com.safer.RH.exception.LibelleDejaExistantException;
import com.safer.RH.exception.PosteAssigneException;
import com.safer.RH.models.Candidature;
import com.safer.RH.models.Poste;
import com.safer.RH.services.PosteService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/poste")
@RequiredArgsConstructor
public class PosteController {

    private final PosteService posteService;

    @PostMapping("/ajouter")
    public ResponseEntity<?> ajouterPoste(@RequestBody PosteDto poste) {
        return ResponseEntity.ok().body(posteService.ajouterPoste(poste));
    }
    // Gestionnaire d'exception pour LibelleDejaExistantException
    @ExceptionHandler(LibelleDejaExistantException.class)
    public ResponseEntity<Map<String, String>> handleLibelleDejaExistantException(LibelleDejaExistantException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @PutMapping("/modifier")
    public ResponseEntity<?> modifierPoste(@RequestBody Poste poste) {
        posteService.modifierPoste(poste);
        return ResponseEntity.ok().body("Poste modifié");
    }

    @GetMapping("/lister")
    public ResponseEntity<List<PosteDto>> lister() {
        return ResponseEntity.ok(posteService.listerPoste());
    }


    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> supprimer(@RequestParam int id) {
        try {
            posteService.supprimerPoste(id);
            return ResponseEntity.ok().body("Poste supprimé avec succès.");
        } catch (PosteAssigneException ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
