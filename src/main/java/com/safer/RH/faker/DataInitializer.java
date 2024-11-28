package com.safer.RH.faker;

import com.github.javafaker.Faker;
import com.safer.RH.models.*;
import com.safer.RH.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

//@Configuration
public class DataInitializer {
//    @Bean
    public CommandLineRunner initData(
            SecteurRepository secteurRepository,
            PosteRepository posteRepository,
            CspRepository cspRepository,
            EmployeRepository employeRepository,
            ContratRepository contratRepository,
            AbsenceRepository absenceRepository,
            DepartRepository departRepository) {

        return args -> {
            Faker faker = new Faker();
            Random random = new Random();

            // 1. Créer des Secteurs
            //List<Secteur> secteurs=new ArrayList<>();
            var secteurs=secteurRepository.findAll();
//            for (int i = 1; i <= 10; i++) {
//                Secteur secteur = new Secteur();
//                secteur.setLibelle(faker.company().industry());
//                secteurs.add(secteurRepository.save(secteur));
//            }

            // 2. Créer des Postes
            Set<String> libellesUtilises = new HashSet<>();

            List<Poste> postes = posteRepository.findAll();
//            for (int i = 1; i <= 50; i++) {
//                String libelle;
//                do {
//                    libelle = faker.job().position();
//                } while (libellesUtilises.contains(libelle)); // Vérifie l'unicité
//
//                libellesUtilises.add(libelle); // Marque le libellé comme utilisé
//
//                Poste poste = new Poste();
//                poste.setReference("P-" + i);
//                poste.setLibelle(libelle);
//                poste.setNiveauEtude(faker.educator().course());
//                poste.setDescription(faker.lorem().sentence());
//                poste.setNiveauDeSalaire(faker.number().numberBetween(100000, 700001)); // Entre 2000 et 5000
//                poste.setRemarque(faker.lorem().sentence());
//                poste.setSecteur(secteurs.get(random.nextInt(secteurs.size()))); // Associer un secteur aléatoire
//                postes.add(posteRepository.save(poste));
//            }

            // 3. Créer des CSPs
            List<Csp> csps = cspRepository.findAll();
//            for (int i = 11; i <= 20; i++) {
//                Csp csp = new Csp();
//                csp.setLibelle("CSP-" + i);
//                csps.add(cspRepository.save(csp));
//            }

            // 4. Créer des Employés avec Contrats, Départs et Absences
            List<Employe> employes = new ArrayList<>();
            List<Depart> departs = new ArrayList<>();
            List<Absence> absences = new ArrayList<>();

            for (int i = 1; i <= 100; i++) {
                // Employé
                Employe employe = new Employe();
                employe.setNom(faker.name().lastName());
                employe.setPrenom(faker.name().firstName());
                employe.setTel(faker.phoneNumber().phoneNumber());
                employe.setAdresse(faker.address().fullAddress());
                employe.setSexe(random.nextBoolean() ? "M" : "F");
                employe.setSituationFamiliale(random.nextBoolean() ? "Marié" : "Célibataire");
                employe.setDateNaissance(LocalDate.now().minus(20 + random.nextInt(40), ChronoUnit.YEARS)); // Âge entre 20 et 50 ans
                employe.setPoste(postes.get(random.nextInt(postes.size()))); // Associer un poste
                employe.setCsp(csps.get(random.nextInt(csps.size()))); // Associer un CSP
                employe.setDateEmbauche(LocalDate.now().minus(random.nextInt(10 * 365), ChronoUnit.DAYS)); // Embauche dans les 10 dernières années
                employe.setAnciennete((int) ChronoUnit.YEARS.between(employe.getDateEmbauche(), LocalDate.now()));
                employe.setActif(true);
                employeRepository.save(employe);
                // Contrat
//                Contrat contrat = new Contrat();
//                String typeContrat = switch (random.nextInt(4)) {
//                    case 0 -> "CDI";
//                    case 1 -> "CDD";
//                    case 2 -> "STAGE";
//                    default -> "INTERIM";
//                };
//                contrat.setType(typeContrat);
//                contrat.setDateDebut(employe.getDateEmbauche());
//
//                // Gestion de la date de fin en fonction du type de contrat
//                if (typeContrat.equals("CDD") || typeContrat.equals("STAGE") || typeContrat.equals("INTERIM")) {
//                    contrat.setDateFin(contrat.getDateDebut().plus(1 + random.nextInt(2), ChronoUnit.YEARS)); // 1 à 2 ans
//                } else {
//                    contrat.setDateFin(null); // Pas de date de fin pour un CDI
//                }
//                contrat.setEtat(contrat.getDateFin() == null || contrat.getDateFin().isAfter(LocalDate.now()));
//
//                contratRepository.save(contrat);
//
//                employe.setContrat(contrat);

                // Départ
//                if (ChronoUnit.YEARS.between(employe.getDateNaissance(), LocalDate.now()) >= 60) {
//                    Depart depart = new Depart();
//                    depart.setRaison("Retraité");
//                    depart.setDateDepart(LocalDate.now().minus(random.nextInt(365), ChronoUnit.DAYS)); // Date de départ récente
//                    depart.setEmploye(employe);
//                    departRepository.save(depart);
//
//                    employe.setDateDepart(depart.getDateDepart());
//                    employe.setActif(false);
//                } else if (i <= 5) { // Autres départs pour les 5 premiers
//                    Depart depart = new Depart();
//                    depart.setRaison("Démission");
//                    depart.setDateDepart(LocalDate.now().minus(random.nextInt(365), ChronoUnit.DAYS));
//                    depart.setEmploye(employe);
//                    departRepository.save(depart);
//
//                    employe.setDateDepart(depart.getDateDepart());
//                    employe.setActif(false);
//                }

                // Absence
//                if (i > 10 && i <= 15) { // Ajouter des absences pour 5 employés
//                    Absence absence = new Absence();
//                    absence.setType(random.nextBoolean() ? "Maladie" : "Congé");
//                    absence.setMotif(faker.lorem().sentence());
//                    absence.setDateDebut(LocalDate.now().minus(random.nextInt(10), ChronoUnit.DAYS)); // Absence récente
//                    absence.setDateFin(absence.getDateDebut().plus(random.nextInt(5), ChronoUnit.DAYS)); // Durée de 1 à 5 jours
//                    absence.setEmploye(employe);
//                    absenceRepository.save(absence);
//
//                    absences.add(absence);
//                }

//                employes.add(employeRepository.save(employe));
            }

            // Log des données générées
            System.out.println("Secteurs générés : " + secteurs.size());
            System.out.println("Postes générés : " + postes.size());
            System.out.println("CSPs générés : " + csps.size());
            System.out.println("Employés générés : " + employes.size());
            System.out.println("Départs générés : " + departs.size());
            System.out.println("Absences générées : " + absences.size());
        };
    }

}
