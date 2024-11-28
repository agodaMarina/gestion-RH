package com.safer.RH.faker;

import com.github.javafaker.Faker;
import com.safer.RH.models.Contrat;
import com.safer.RH.models.Depart;
import com.safer.RH.models.Employe;
import com.safer.RH.repositories.DepartRepository;
import com.safer.RH.repositories.EmployeRepository;
import com.safer.RH.repositories.PosteRepository;
import com.safer.RH.repositories.SecteurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmployeDataInjector {


    private final EmployeRepository employeRepository;


    private final  SecteurRepository secteurRepository;

    private final PosteRepository posteRepository;

    private final DepartRepository departRepository;

    private Faker faker = new Faker();
    private Random random = new Random();

//    public void injectFakeEmployes(int numberOfEmployes) {
//        int departCount = 0; // Compteur pour limiter le nombre de départs à 30
//
//        for (int i = 0; i < numberOfEmployes; i++) {
//            Employe employe = new Employe();
//
//            // Générer des données de base pour l'employé
//            employe.setNom(faker.name().lastName());
//            employe.setPrenom(faker.name().firstName());
//            employe.setTel(faker.phoneNumber().phoneNumber());
//            employe.setAdresse(faker.address().fullAddress());
//            employe.setSexe(random.nextBoolean() ? "Masculin" : "Féminin");
//            employe.setSituationFamiliale(faker.options().option("Célibataire", "Marié", "Divorcé", "Veuf"));
//
//            // Date de naissance et âge
//            LocalDate birthDate = LocalDate.of(
//                    faker.number().numberBetween(1960, 2001),
//                    faker.number().numberBetween(1, 12),
//                    faker.number().numberBetween(1, 28)
//            );
//            employe.setDateNaissance(birthDate);
//            employe.setAge(LocalDate.now().getYear() - birthDate.getYear());
//
//            // Date d'embauche
//            employe.setDateEmbauche(LocalDate.now().minusDays(faker.number().numberBetween(100, 1000)));
//            //employe.setCsp(faker.options().option("Technicien", "Manager", "Cadre Supérieur", "Ouvrier"));
//
//            // Assigner un secteur et un poste existants
//            //.setSecteur(secteurRepository.findById(faker.number().numberBetween(1, 10)).orElse(null));
//            employe.setPoste(posteRepository.findById(faker.number().numberBetween(1, 20)).orElse(null));
//
//            // Ajouter un départ seulement pour 30 employés
//            if (departCount < 30 && random.nextBoolean()) {
//                LocalDate dateDepart = LocalDate.now().minusDays(faker.number().numberBetween(10, 500));
//                String raison = faker.options().option("licenciement", "fin de contrat", "décès", "retraite", "démission");
//                Depart depart = new Depart(raison, dateDepart);
//
//                departRepository.save(depart);
//
//                employe.setDepart(depart);
//                employe.setDateDepart(dateDepart);
//                departCount++;
//            }
//
//            // Choisir un type de contrat
//            //employe.setContrat(Contrat.values()[random.nextInt(Contrat.values().length)]);
//
//            // Sauvegarder l'employé dans la base
//            employeRepository.save(employe);
//        }
//    }
}