package com.safer.RH.services;

import com.safer.RH.repositories.EvenementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EvenementService {
    private final EvenementRepository evenementRepository;


}
