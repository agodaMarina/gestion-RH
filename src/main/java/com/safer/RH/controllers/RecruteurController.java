package com.safer.RH.controllers;

import com.safer.RH.Dto.RecruteurDto;
import com.safer.RH.models.Recruteur;
import com.safer.RH.services.RecruteurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recruteur")
@RequiredArgsConstructor
public class RecruteurController {
    private final RecruteurService recruteurService;

    @GetMapping("/{id}")
    public ResponseEntity<Recruteur> getRecruteurById(@PathVariable int id) {
        Recruteur recruteur = recruteurService.getRecruteur(id);
        return ResponseEntity.ok(recruteur);
    }

    @PostMapping("/add")
    public ResponseEntity<Recruteur> addRecruteur(@RequestBody Recruteur recruteur) {
        Recruteur newRecruteur = recruteurService.addRecruteur(recruteur);
        return ResponseEntity.ok(newRecruteur);
    }

    @PutMapping("/update/}")
    public ResponseEntity<Recruteur> updateRecruteur(@RequestBody Recruteur recruteur) {
        Recruteur updatedRecruteur = recruteurService.updateRecruteur(recruteur);
        return ResponseEntity.ok(updatedRecruteur);
    }

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<Void> deleteRecruteur(@PathVariable Long id) {
//        recruteurService.deleteRecruteur(id);
//        return ResponseEntity.ok().build();
//    }

    @GetMapping("/all")
    public ResponseEntity<List<RecruteurDto>> getAllRecruteurs() {
        List<RecruteurDto> recruteurs = recruteurService.getAllRecruteurs();
        return ResponseEntity.ok(recruteurs);
    }


}
