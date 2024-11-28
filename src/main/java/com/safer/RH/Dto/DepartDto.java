package com.safer.RH.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
public class DepartDto {
    private int id;
    private String raison;
    private String employe;
    private LocalDate dateDepart;
}
