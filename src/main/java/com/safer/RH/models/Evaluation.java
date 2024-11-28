package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double notePresentation;
    private double noteExperience;
    private double noteCompetenceEtAtout;
    private double noteSavoirEtre;
    private double noteQualiteEtDefaut;
    private double Moyenne;
    private LocalDate dateEvaluation;
    @OneToOne
    private Candidature candidat;
}
