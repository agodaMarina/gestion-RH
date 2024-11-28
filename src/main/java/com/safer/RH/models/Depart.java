package com.safer.RH.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;


@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
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
