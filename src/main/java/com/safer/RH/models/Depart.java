package com.safer.RH.models;

import jakarta.persistence.*;

import lombok.Data;

import java.time.LocalDate;


@Entity
@Data
public class Depart {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String raison;

    @OneToOne(cascade = CascadeType.ALL)
    private Employe employe;

    @Column(nullable = false)
    private LocalDate dateDepart;


}
