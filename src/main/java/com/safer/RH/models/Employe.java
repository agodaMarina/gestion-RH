package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.Period;
import java.util.Collection;

@Entity
@Data
public class Employe {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
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
    @Embedded
    private Anciennete anciennete;
    private LocalDate dateDepart;
    @ManyToOne
    private Csp csp;
    @ManyToOne
    private Poste poste;
    @OneToMany(mappedBy = "employe",cascade = CascadeType.ALL)
    private Collection<Absence> absences;
    @OneToOne(orphanRemoval = true)
    private Depart depart;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Contrat contrat;
    @OneToMany(fetch = FetchType.LAZY)
    private Collection<Evenement> evenements;
        private boolean isActif=true;

    public int calculateAge() {
        if (this.dateNaissance != null) {
            LocalDate birthDate = this.dateNaissance;
            return Period.between(birthDate, LocalDate.now()).getYears();
        }
        return 0; // Si la date de naissance est null ou mal formatée
    }


    public Anciennete calculateAnciennete() {
        if (this.dateEmbauche != null) {
            LocalDate hireDate = this.dateEmbauche;
            Period period = Period.between(hireDate, LocalDate.now());
            return new Anciennete(period.getYears(), period.getMonths(), period.getDays());
        }
        return new Anciennete(0, 0, 0); // Si la date d'embauche est null ou mal formatée
    }

    // Ajoutez une méthode pour mettre à jour l'ancienneté
    public void updateAnciennete() {
        this.anciennete = calculateAnciennete();
    }
}

