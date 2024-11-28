package com.safer.RH.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PosteDto {
    private int id;
    private String reference;
    private String libelle;
    private String niveauEtude;
    private String description;
    private double niveauDeSalaire;
    private String remarque;
    private String secteur;

}