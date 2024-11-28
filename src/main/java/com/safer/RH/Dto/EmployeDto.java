package com.safer.RH.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
public class EmployeDto {
    private int id;
    private String nom;
    private String prenom;
    private String tel;
    private String adresse;
    private String sexe;
    private String situationFamiliale;
    private LocalDate dateNaissance;
    private int age;
    private LocalDate dateEmbauche;
    private int anciennete;
    private LocalDate dateDepart;
    private String csp;
    private String poste;
    private String depart;
    private String contrat;
    private LocalDate datedebutContrat;
    private LocalDate dateFinContrat;
    private boolean isActif;

}
