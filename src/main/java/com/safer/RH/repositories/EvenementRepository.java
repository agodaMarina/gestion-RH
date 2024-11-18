package com.safer.RH.repositories;

import com.safer.RH.models.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvenementRepository extends JpaRepository<Evenement,Integer> {
}
