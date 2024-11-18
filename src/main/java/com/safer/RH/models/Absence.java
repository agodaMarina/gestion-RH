package com.safer.RH.models;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Absence {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String motif;
    private LocalDate dateDebut;
    private LocalDate dateFin;

    @ManyToOne
    private Employe employe;
}
