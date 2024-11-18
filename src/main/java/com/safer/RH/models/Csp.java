package com.safer.RH.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Entity
@Data
public class Csp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String libelle;
    @OneToMany(mappedBy = "csp",fetch = FetchType.LAZY)
    private Collection<Employe> employes;
}
