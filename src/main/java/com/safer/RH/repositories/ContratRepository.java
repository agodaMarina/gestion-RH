package com.safer.RH.repositories;

import com.safer.RH.models.Contrat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratRepository extends JpaRepository<Contrat,Integer> {

}
