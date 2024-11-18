package com.safer.RH.models;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.Period;

@RequiredArgsConstructor
@Data
public class EmployeDto {
    private int id;
    private String nom;
    private String prenom;
    private String tel;
    private String adresse;
    private String sexe;
    private String situationFamiliale;
    private String dateNaissance;
    private int age;
    private LocalDate dateEmbauche;
    private LocalDate dateDepart;
    private String csp;

    private int secteurId;  // ID du Secteur
    private int posteId;    // ID du Poste
    private int departId;   // ID du Depart
    private String contrat;

    public int getAge() {
        if (this.dateNaissance != null) {
            LocalDate birthDate = LocalDate.parse(this.dateNaissance);
            return Period.between(birthDate, LocalDate.now()).getYears();
        }
        return 0; // Si la date de naissance est null ou mal formatée
    }
}
