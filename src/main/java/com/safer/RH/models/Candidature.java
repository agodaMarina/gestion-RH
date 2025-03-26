package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Entity
public class Candidature {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String adresse;
    private String prochaineAction;
    private LocalDate dateEntretien1;
    private double notePresentation;
    private double noteExperience;
    private double noteCompetenceEtAtout;
    private double noteSavoirEtre;
    private double noteQualiteEtDefaut;
    private double moyenne;
    private String  apreciationGlobale;
    @ManyToOne
    private Recrutement recrutement;
    @OneToOne
    private Evaluation evaluation;
    private boolean estRetenu = false;

}

