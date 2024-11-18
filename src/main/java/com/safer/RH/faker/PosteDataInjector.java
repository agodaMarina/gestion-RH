package com.safer.RH.faker;

import com.github.javafaker.Faker;
import com.safer.RH.models.Poste;
import com.safer.RH.models.Secteur;
import com.safer.RH.repositories.PosteRepository;
import com.safer.RH.repositories.SecteurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PosteDataInjector {
    private final SecteurRepository secteurRepository;
    private final PosteRepository posteRepository;
    private final Faker faker = new Faker();

    public void injectFakeSecteurs(int numberOfSecteurs) {
        for (int i = 0; i < numberOfSecteurs; i++) {
            Secteur secteur = new Secteur();
            secteur.setLibelle(faker.company().industry());
            secteurRepository.save(secteur);
        }
    }



}
