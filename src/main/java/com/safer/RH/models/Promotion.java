package com.safer.RH.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;


public class Promotion {
    private Long id;
    private String AncienPoste;
    private String NouveauPoste;
    private LocalDate datePromotion;
    @ManyToOne
    private Employe employe;
}
