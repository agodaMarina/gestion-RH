package com.safer.RH.faker;

import com.github.javafaker.Faker;
import com.safer.RH.models.Candidature;
import com.safer.RH.repositories.CandidatureRepository;
import com.safer.RH.repositories.PosteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class CandidatureDataInjector {
    private final CandidatureRepository candidatureRepository;
    private final PosteRepository posteRepository;

    Faker faker= new Faker();
    Random random = new Random();

}
