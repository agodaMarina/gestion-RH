package com.safer.RH.repositories;

import com.safer.RH.models.Secteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecteurRepository extends JpaRepository<Secteur,Integer> {

    @Query("SELECT s FROM Secteur s ORDER BY s.libelle ASC")
    public List<Secteur> findAllOrderByLibelleAsc();

    public Secteur findByLibelle(String libelle);

}
