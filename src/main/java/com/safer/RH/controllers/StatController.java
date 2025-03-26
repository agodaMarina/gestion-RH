package com.safer.RH.controllers;

import com.safer.RH.Dto.Retraite;
import com.safer.RH.models.Employe;
import com.safer.RH.services.EmployeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/statistiques")
@RequiredArgsConstructor
public class StatController {

    private final EmployeService employeService;
    @GetMapping("/par-sexe")
    public List<Object[]> getNombrePersonnesParSexe() {
        return employeService.getNombrePersonnesParSexe();
    }

    @GetMapping("/par-age")
    public List<Object[]> getNombrePersonnesParAge() {
        return employeService.getNombrePersonnesParAge();
    }

    @GetMapping("/par-secteur")
    public List<Object[]> getNombrePersonneParSecteur() {
        return employeService.getNombrePersonneParSecteur();
    }

    @GetMapping("/par-contrat")
    public List<Object[]> getNombrePersonnesParContrat() {
        return employeService.getNombrePersonnesParContrat();
    }

    @GetMapping("/par-depart")
    public List<Object[]> getNombrePersonnesParDepart() {
        return employeService.getNombrePersonnesParDepart();
    }

    @GetMapping("/par-csp")
    public List<Object[]> getNombrePersonnesParCsp() {
        return employeService.getNombrePersonnesParCsp();
    }

    @GetMapping("/retraites")
    public ResponseEntity<Map<Integer, List<Retraite>>> prevoirRetraites(
            @RequestParam(defaultValue = "5") int intervalleMax) {
        Map<Integer, List<Retraite>> retraitesParAnnee = employeService.prevoirRetraitesParAnnee(intervalleMax);
        return ResponseEntity.ok(retraitesParAnnee);
    }
}
