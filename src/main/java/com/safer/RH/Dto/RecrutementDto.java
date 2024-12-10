package com.safer.RH.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecrutementDto {
    private Long id;
    private String poste;
    private double salaire;
    private String niveauEtude;
    private String recruteur;
    private String statut;
    private String etapeActuelle;
    private LocalDate dateDebut;
    private LocalDate dateFin;
}
