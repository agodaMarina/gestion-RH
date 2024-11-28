package com.safer.RH.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecrutementDto {
    private Long id;
    private String poste;
    private String recruteur;
    private String statut;
    private String etapeActuelle;
    private String dateDebut;
    private String dateFin;
    private Collection<CandidatureDto> candidats;
}
