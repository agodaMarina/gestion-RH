package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Collection;

@Entity
@Data
public class Recrutement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Poste poste;
    @OneToMany(mappedBy = "recrutement",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Collection<Candidature> candidats;
    @OneToOne
    private Recruteur recruteur;

    @Enumerated(EnumType.STRING)
    private StateRecrutement statut;//(EN_COURS, TERMINE)
    private String etapeActuelle;
    private LocalDate dateDebut;
    private LocalDate dateFin;
}
