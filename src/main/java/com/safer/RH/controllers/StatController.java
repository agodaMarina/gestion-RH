package com.safer.RH.controllers;

import com.safer.RH.services.EmployeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
