package com.safer.RH.services;

import com.safer.RH.models.Contrat;
import com.safer.RH.repositories.ContratRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContratService {

    private final ContratRepository contratRepository;

    public Contrat addContrat(Contrat contrat){
        return contratRepository.save(contrat);
    }

    public Contrat updateContrat(Contrat contrat){
        return contratRepository.save(contrat);
    }
}
