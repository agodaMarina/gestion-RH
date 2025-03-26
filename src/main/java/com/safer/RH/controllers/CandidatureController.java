package com.safer.RH.controllers;

import com.safer.RH.Dto.CandidatureDto;
import com.safer.RH.auth.AuthenticationService;
import com.safer.RH.models.Candidature;
import com.safer.RH.services.CandidatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/candidature")
@RequiredArgsConstructor
public class CandidatureController {
    private final CandidatureService candidatureService;
    private final AuthenticationService service;

    @PostMapping("/ajouter")
    public ResponseEntity<Candidature> ajouter(@RequestBody Candidature candidature) {
       return ResponseEntity.status(201).body(candidatureService.ajouter(candidature));
    }

    @GetMapping("/lister")
    public ResponseEntity<List<CandidatureDto>> lister() {
        return ResponseEntity.ok(candidatureService.getListCandidature());
    }
//
//    @GetMapping("/listerParRecrutement")
//    public ResponseEntity<List<CandidatureDto>> listerParRecrutement(@RequestParam Long id) {
//        return ResponseEntity.ok(candidatureService.getListCandidatureByRecrutementId(id));
//    }

    @PutMapping("/modifier")
    public ResponseEntity<Candidature> modifier(@RequestBody Candidature candidature) {
        return ResponseEntity.ok(candidatureService.modifier(candidature));
    }

    @DeleteMapping("/supprimer")
    public ResponseEntity<String> supprimer(@RequestParam Long id) {
        candidatureService.deleteCandidature(id);
        return ResponseEntity.ok("Candidature supprimée");
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> export() throws IOException {
        ByteArrayInputStream excelStream = candidatureService.exportCandidatToExcel();
        // Convertir en byte[] pour la réponse
        byte[] excelBytes = excelStream.readAllBytes();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Liste_des_candidatures.xlsx");
        headers.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        return ResponseEntity.ok().headers(headers).body(excelBytes);
    }
}
