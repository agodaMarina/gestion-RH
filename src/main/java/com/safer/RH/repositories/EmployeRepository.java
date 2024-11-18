package com.safer.RH.repositories;

import com.safer.RH.models.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeRepository extends JpaRepository<Employe, Integer>{

    @Query("SELECT e.secteur.libelle, COUNT(e) FROM Employe e GROUP BY e.secteur.libelle")
    List<Object[]> countEmployesBySecteur();

    @Query("SELECT e.sexe, COUNT(e) FROM Employe e  GROUP BY e.sexe")
    List<Object[]> countEmployesBySexe();

    @Query("SELECT e.csp, COUNT(e) FROM Employe e  GROUP BY e.csp")
    List<Object[]> countEmployesByCsp();

    @Query("SELECT e.age, e.sexe, COUNT(e) FROM Employe e  GROUP BY e.sexe, e.age")
    List<Object[]> countEmployesByAge();

    @Query("SELECT e.contrat, COUNT(e) FROM Employe e  GROUP BY e.contrat")
    List<Object[]> countEmployesByContrat();

    @Query("SELECT e.depart.raison, COUNT(e) FROM Employe e  GROUP BY e.depart.raison")
    List<Object[]> countEmployesByDepart();

    @Query("SELECT e FROM Employe e ORDER BY e.nom ASC")
    List<Employe> getAll();


    boolean existsByPosteId(int id);
}
