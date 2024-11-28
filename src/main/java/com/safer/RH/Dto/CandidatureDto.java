package com.safer.RH.Dto;

import com.safer.RH.models.Recrutement;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
public class CandidatureDto {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String adresse;
    private LocalDate dateEntretien1;
    private String stadeDeRecrutement;
    private double moyenne;
    private String  apreciationGlobale;
    private String poste;
}
