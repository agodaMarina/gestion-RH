package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;
import java.util.List;

@Data
@Entity
public class Secteur {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String libelle;

    @OneToMany(mappedBy = "secteur",fetch = FetchType.EAGER)
    private Collection<Poste> postes;
}
