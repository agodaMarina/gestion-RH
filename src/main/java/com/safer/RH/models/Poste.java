package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@RequiredArgsConstructor
public class Poste {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int id;

    private String reference;
    @Column(nullable = false, unique = true)
    private String libelle;
    private String niveauEtude;
    private String description;
    private double niveauDeSalaire;
    private String remarque;
    @ManyToOne()
    private Secteur secteur;



}
