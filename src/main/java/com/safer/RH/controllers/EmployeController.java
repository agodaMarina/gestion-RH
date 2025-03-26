package com.safer.RH.controllers;

import com.safer.RH.Dto.AbsenceDto;
import com.safer.RH.faker.DataInitializer;
import com.safer.RH.faker.EmployeDataInjector;
import com.safer.RH.models.Contrat;
import com.safer.RH.models.Depart;
import com.safer.RH.models.Employe;
import com.safer.RH.models.EmployeDto;
import com.safer.RH.services.ContratService;
import com.safer.RH.services.EmployeService;
import com.safer.RH.services.PosteService;
import com.safer.RH.services.SecteurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/employe")
@RequiredArgsConstructor
public class EmployeController {

    private final EmployeService employeService;
    private final ContratService contratService;
    private final PosteService posteService;
    private final SecteurService secteurService;
    private final DataInitializer employeDataInjector;

    @GetMapping("/inject-fake-data")
    public String injectData() {
        employeDataInjector.injectCsp(10); // Injecter 100 employés fictifs
        return "Données fictives injectées avec succès!";
    }



    @PostMapping("/import")
    public ResponseEntity<String> importEmployees(@RequestParam("file") MultipartFile file) {
        if (!file.getOriginalFilename().endsWith(".xlsx")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Veuillez fournir un fichier Excel au format .xlsx");
        }

        try {
            employeService.importEmployeesFromExcel(file);
            return ResponseEntity.ok("Données importées avec succès.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'importation des données : " + e.getMessage());
        }
    }
    @GetMapping("/lister")
    public ResponseEntity<?> listerEmploye() {
        return ResponseEntity.ok().body(employeService.listeEmploye());
    }

    @GetMapping("/listerActif")
    public ResponseEntity<?> listerEmployeActif() {
        return ResponseEntity.ok().body(employeService.listeDesEmployesActifs());
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getEmployeById(@PathVariable int id) {
        return ResponseEntity.ok().body(employeService.getEmployeById(id));
    }

    @GetMapping("/export")
    public ResponseEntity<?> export() throws IOException {
        return ResponseEntity.ok().body(employeService.exportEmployeToExcel());
    }

    // Endpoint pour récupérer le contrat d'un employé par son ID
    @GetMapping("/{id}/contrat")
    public ResponseEntity<Contrat> getContratByUserId(@PathVariable int id) {
        Contrat contrat = employeService.getContratByUserId(id);
        if (contrat == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(contrat);
    }

    @PutMapping("/RenouvelerContrat")
    public ResponseEntity<?> addContrat(@RequestParam int id, @RequestBody Contrat contrat) {
        employeService.renouvelerContrat(id,contrat);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/updateEmploye",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateEmploye(@RequestPart EmployeDto employeDto,@RequestPart Contrat contrat) {
        employeService.updateEmploye(employeDto,contrat);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "addEmploye",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addEmploye(@RequestPart EmployeDto employeDto, @RequestPart Contrat contrat) {
        employeService.ajouterEmploye(employeDto,contrat);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/rompreContrat/{id}/{raison}")
    public ResponseEntity<?> desactiverEmploye(@PathVariable int id, @PathVariable String raison) {
        employeService.rompreContrat(id,raison);
        return ResponseEntity.ok().build();
    }


    // Endpoint pour récupérer toutes les absences d'un employé par son ID
    @GetMapping("/{id}/absences")
    public ResponseEntity<List<AbsenceDto>> getAllAbsencesByUserId(@PathVariable int id) {
        List<AbsenceDto> absences = employeService.getAllAbsencesByUserId(id);
        return ResponseEntity.ok(absences);
    }

    // Endpoint pour récupérer le départ d'un employé par son ID
    @GetMapping("/{id}/depart")
    public ResponseEntity<Depart> getDepartByUserId(@PathVariable int id) {
        Depart depart = employeService.getDepartByUserId(id);
        return ResponseEntity.ok(depart);
    }



}
