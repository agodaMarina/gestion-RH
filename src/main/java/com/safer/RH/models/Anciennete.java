package com.safer.RH.models;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Anciennete {
    private int annees;
    private int mois;
    private int jours;

    public Anciennete() {
        // Constructeur par défaut nécessaire pour JPA
        this.annees = 0;
        this.mois = 0;
        this.jours = 0;
    }

    public Anciennete(int annees, int mois, int jours) {
        this.annees = annees;
        this.mois = mois;
        this.jours = jours;
    }

    @Override
    public String toString() {
        return annees + " an(s), " + mois + " mois, " + jours + " jour(s)";
    }
}