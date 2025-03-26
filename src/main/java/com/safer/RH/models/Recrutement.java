package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Data
public class Recrutement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Poste poste;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Candidature> candidats;
    @ManyToOne
    @JoinColumn(name = "recruteur_id", nullable = false)
    private Recruteur recruteur;
    private String typeContrat;
    @Enumerated(EnumType.STRING)
    private StateRecrutement statut;//(EN_COURS, TERMINE)
    private String etapeActuelle;
    private LocalDate dateDebut;
    private LocalDate dateFin;
}
