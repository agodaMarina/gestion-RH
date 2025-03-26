package com.safer.RH.faker;

import com.github.javafaker.Faker;
import com.safer.RH.models.*;
import com.safer.RH.repositories.*;
import com.safer.RH.services.PosteService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DataInitializer {

    private final EmployeRepository employeRepository;
    private final PosteRepository posteRepository;
    private final PosteService posteService;
    private final  CspRepository cspRepository;
    private final ContratRepository contratRepository;
    private final DepartRepository departRepository;
    private final SecteurRepository secteurRepository;

 Faker faker=new Faker();

    public void injectFakeSecteur(int number){
        for (int i = 0; i < number; i++) {
            Secteur secteur = new Secteur();
            secteur.setLibelle(faker.company().industry());
            secteurRepository.save(secteur);
        }
        System.out.println(number + " secteurs générés et sauvegardés !");
    }

    public void injectCsp(int number){
        for (int i = 0; i < number; i++) {
            Csp csp = new Csp();
            csp.setLibelle(faker.company().profession());
            cspRepository.save(csp);
        }
        System.out.println(number + " CSP générés et sauvegardés !");
    }

    public void injectFakePoste(int number){
        for (int i = 0; i < number; i++) {
            var secteurs= secteurRepository.findAll();
            Poste poste = new Poste();
            poste.setLibelle(faker.job().position());
            poste.setDescription(faker.lorem().sentence());
            poste.setReference(posteService.generatereference());
            poste.setNiveauDeSalaire(faker.number().numberBetween(1000, 5000));
            poste.setNiveauEtude(faker.options().option("BAC", "BAC+2", "BAC+3", "BAC+5", "BAC+8"));
            poste.setSecteur(secteurs.get(faker.number().numberBetween(0, secteurs.size())));
            posteRepository.save(poste);
        }
        System.out.println(number + " postes générés et sauvegardés !");
    }
    public void injectFakeEmployes(int numberOfEmployes) {
        Random random = new Random();

        // Récupérer la liste des postes et CSPs existants
        List<Poste> postes = posteRepository.findAll();
        List<Csp> csps = cspRepository.findAll();

        for (int i = 0; i < numberOfEmployes; i++) {
            Employe employe = new Employe();

            // Générer des données de base pour l'employé
            employe.setNom(faker.name().lastName());
            employe.setPrenom(faker.name().firstName());
            employe.setTel(faker.phoneNumber().phoneNumber());
            employe.setAdresse(faker.address().cityName());
            employe.setSexe(random.nextBoolean() ? "Masculin" : "Féminin");
            employe.setSituationFamiliale(faker.options().option("Célibataire", "Marié", "Divorcé", "Veuf"));

            // Date de naissance et âge
            LocalDate birthDate = LocalDate.of(
                    faker.number().numberBetween(1960, 2001),
                    faker.number().numberBetween(1, 12),
                    faker.number().numberBetween(1, 28)
            );
            employe.setDateNaissance(birthDate);
            employe.setAge(LocalDate.now().getYear() - birthDate.getYear());

            // Date d'embauche
            LocalDate dateEmbauche = LocalDate.now().minusDays(faker.number().numberBetween(100, 1000));
            employe.setDateEmbauche(dateEmbauche);
            //employe.setAnciennete((int) ChronoUnit.YEARS.between(dateEmbauche, LocalDate.now()));

            // Affecter un poste et un CSP aléatoires
            employe.setPoste(postes.get(random.nextInt(postes.size())));
            employe.setCsp(csps.get(random.nextInt(csps.size())));

            // Créer un contrat
            Contrat contrat = new Contrat();
            String typeContrat = faker.options().option("CDI", "CDD", "STAGE", "INTERIM");
            contrat.setType(typeContrat);
            contrat.setDateDebut(dateEmbauche);

            // Si le contrat est un CDD, définir une date de fin
            if (typeContrat.equals("CDD")) {
                contrat.setDateFin(dateEmbauche.plusMonths(faker.number().numberBetween(6, 24))); // Entre 6 et 24 mois
            } else {
                contrat.setDateFin(null);
            }

            contrat.setEtat(true); // Contrat actif par défaut
            employe.setContrat(contrat);

            // Vérifier si l'employé a 60 ans ou plus pour le marquer comme retraité
            if (employe.getAge() >= 60) {
                Depart depart = new Depart();
                depart.setRaison("RETRAITE");
                depart.setDateDepart(LocalDate.now().minusDays(faker.number().numberBetween(10, 500))); // Date de départ récente
                depart.setEmploye(employe);

                employe.setDepart(depart);
                employe.setDateDepart(depart.getDateDepart());
                employe.setActif(false); // L'employé n'est plus actif
                departRepository.save(depart);
            }

            // Sauvegarder l'employé et son contrat dans la base de données
            employeRepository.save(employe);
            contratRepository.save(contrat);
        }

        System.out.println(numberOfEmployes + " employés générés et sauvegardés !");
    }

}
