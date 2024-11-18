package com.safer.RH.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;


@Entity
@Data
@RequiredArgsConstructor
public class Depart {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String raison;


    @Column(nullable = false)
    private LocalDate dateDepart;

    public Depart(String raison, LocalDate dateDepart) {
        this.raison = raison;
        this.dateDepart = dateDepart;
    }

}
