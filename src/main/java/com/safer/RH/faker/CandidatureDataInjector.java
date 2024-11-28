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

    public void injectCandidatureData(int number ){
        for (int i=0; i<number;i++ ){
            Candidature candidature=new Candidature();
            candidature.setNom(faker.name().firstName());
            candidature.setPrenom(faker.name().lastName());
            candidature.setEmail(faker.internet().emailAddress());
            candidature.setTelephone(String.valueOf(faker.phoneNumber()));
            candidature.setAdresse(faker.address().fullAddress());
            candidature.setProchaineAction(faker.lorem().sentence());
            candidature.setDateEntretien1(LocalDate.now().minusDays(faker.number().numberBetween(100, 1000)));
            candidature.setStadeDeRecrutement(faker.options().option("En cours", "recruter", "refuser"));
            candidature.setMoyenne(candidature.getMoyenne());
            candidature.setApreciationGlobale((candidature.getStadeDeRecrutement().equals("recruter"))?"Convoquer pour être embauché": (candidature.getStadeDeRecrutement().equals("refuser")) ? "Convoquer pour un second entretien" : (candidature.getStadeDeRecrutement().equals("En cours")) ? "Convoquer pour une période d'essai" : " ");


            candidatureRepository.save(candidature);
        }
    }
}
