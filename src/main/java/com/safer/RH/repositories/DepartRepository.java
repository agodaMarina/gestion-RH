package com.safer.RH.repositories;

import com.safer.RH.models.Depart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartRepository extends JpaRepository<Depart,Integer> {

    @Query("SELECT d FROM Depart d ORDER BY d.raison ASC")
    public List<Depart> findAllOrderByRaisonAsc();
}
