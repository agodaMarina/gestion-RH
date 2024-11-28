package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.Builder;
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
    @ManyToOne
    @JoinColumn(name = "csp_id")
    private Csp csp;
    @ManyToOne
    private Poste poste;
    @OneToMany(mappedBy = "employe",cascade = CascadeType.ALL)
    private Collection<Absence> absences;
    @OneToOne(cascade = CascadeType.ALL)
    private Depart depart;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Contrat contrat;
    @OneToMany(fetch = FetchType.LAZY)
    private Collection<Evenement> evenements;
    private boolean isActif=true;


}
