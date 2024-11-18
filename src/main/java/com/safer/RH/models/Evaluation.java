package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.Data;

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
    @OneToOne
    private Candidature candidat;
}
