package com.safer.RH.Dto;

import com.safer.RH.models.Candidature;
import jakarta.persistence.OneToOne;

import java.time.LocalDate;

public class EvalationDto {
    private Long id;
    private double notePresentation;
    private double noteExperience;
    private double noteCompetenceEtAtout;
    private double noteSavoirEtre;
    private double noteQualiteEtDefaut;
    private double Moyenne;
    private LocalDate dateEvaluation;
    private Long candidatId;
}
