package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Entity
@Data
public class Recruteur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;

    @Column(nullable = false)
    private String nom;

    @OneToMany(mappedBy = "recruteur", fetch = FetchType.LAZY)
    private Collection<Poste>postes;
}
