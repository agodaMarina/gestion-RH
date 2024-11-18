package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
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
    private int anciennete;
    private LocalDate dateDepart;
    @OneToOne
    private Csp csp;
    @ManyToOne
    private Poste poste;
    @OneToMany(mappedBy = "employe",fetch = FetchType.LAZY)
    private Collection<Absence> absences;
    @OneToOne
    private Depart depart;
    @OneToMany(mappedBy = "employe",fetch = FetchType.LAZY)
    private Collection<Contrat> contrats;
    @OneToMany(mappedBy = "employe",fetch = FetchType.LAZY)
    private Collection<Evenement> evenements;
    private boolean isActif=true;


}
