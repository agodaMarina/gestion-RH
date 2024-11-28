package com.safer.RH.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AbsenceDto {
    private Long id;
    private String type;
    private String motif;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String employe;
}
