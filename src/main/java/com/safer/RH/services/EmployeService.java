package com.safer.RH.services;

import com.safer.RH.Dto.AbsenceDto;
import com.safer.RH.Dto.DepartDto;
import com.safer.RH.Dto.Retraite;
import com.safer.RH.models.*;
import com.safer.RH.repositories.*;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.sql.exec.ExecutionException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class EmployeService {
    private static final Logger logger = LoggerFactory.getLogger(EmployeService.class);

    private final EmployeRepository employeRepository;
    private final AbsenceRepository absenceRepository;
    private final DepartRepository departRepository;
    private final CspRepository cspRepository;
    private final AbsenceService absencesService;
    private final ContratRepository contratRepository;
    private final PosteRepository posteRepository;
    private final NotificationService notificationService;
    private final DepartService departService;

    public List<Object[]> getNombrePersonnesParSexe() {
        return employeRepository.countEmployesBySexe();
    }

    public List<Object[]> getNombrePersonnesParAge() {
        return employeRepository.countEmployesByAge();
    }

    public List<Object[]> getNombrePersonneParSecteur() {
        return employeRepository.countEmployesBySecteur();
    }

    public List<Object[]> getNombrePersonnesParContrat() {
        return employeRepository.countEmployesByContrat();
    }

    public List<Object[]> getNombrePersonnesParDepart() {
        return employeRepository.countEmployesByDepart();
    }

    public List<Object[]> getNombrePersonnesParCsp() {
        return employeRepository.countEmployesByCsp();
    }

    public List<com.safer.RH.Dto.EmployeDto> listeEmploye() throws NullPointerException {
        List<com.safer.RH.Dto.EmployeDto> employeDtos = new ArrayList<>();
        for (Employe employe : employeRepository.findAll()) {

            employeDtos.add(new com.safer.RH.Dto.EmployeDto(
                    employe.getId(),
                    employe.getNom(),
                    employe.getPrenom(),
                    employe.getTel(),
                    employe.getAdresse(),
                    employe.getSexe(),
                    employe.getSituationFamiliale(),
                    employe.getDateNaissance(),
                    employe.getAge(),
                    employe.getDateEmbauche(),
                    employe.calculateAnciennete(),
                    employe.getDateDepart() != null ? employe.getDateDepart() : null,
                    employe.getCsp() != null ? employe.getCsp().getLibelle() : null,
                    employe.getPoste().getLibelle(),
                    employe.getDepart()!= null ? employe.getDepart().getRaison() : null,
                    employe.getContrat() != null ? employe.getContrat().getType() : null,
                    employe.getContrat() != null ? employe.getContrat().getDateDebut() : null,
                    employe.getContrat() != null ? employe.getContrat().getDateFin() : null,
                    employe.isActif()));
        }

        return employeDtos;
    }

    public List<com.safer.RH.Dto.EmployeDto> listeDesEmployesActifs() {
        List<com.safer.RH.Dto.EmployeDto> employeDtos = new ArrayList<>();
        for (Employe employe : employeRepository.getEmployeByIsActif(true)) {
            employeDtos.add(new com.safer.RH.Dto.EmployeDto(employe.getId(), employe.getNom(),
                    employe.getPrenom(), employe.getTel(), employe.getAdresse(), employe.getSexe(),
                    employe.getSituationFamiliale(), employe.getDateNaissance(), employe.calculateAge(),
                    employe.getDateEmbauche(), employe.calculateAnciennete(),
                    employe.getDateDepart(), employe.getCsp() != null ?
                    employe.getCsp().getLibelle() : null, employe.getPoste().getLibelle(),
                    employe.getDepart() != null ? employe.getDepart().getRaison() : null,
                    employe.getContrat() != null ? employe.getContrat().getType() : null,
                    employe.getContrat() != null ? employe.getContrat().getDateDebut() : null,
                    employe.getContrat() != null ? employe.getContrat().getDateFin() : null,
                    employe.isActif()));
        }
        return employeDtos;
    }

    @Transactional
    public void updateEmploye(EmployeDto employeDto, Contrat contrat) {
        Employe employe = employeRepository.findById(employeDto.getId()).orElse(null);
        var contrat1 = contratRepository.findById(contrat.getId()).orElse(null);
        contrat1.setDateDebut(contrat.getDateDebut());
        contrat1.setDateFin(contrat.getDateFin());
        employe.setNom(employeDto.getNom());
        employe.setPrenom(employeDto.getPrenom());
        employe.setTel(employeDto.getTel());
        employe.setAdresse(employeDto.getAdresse());
        employe.setSexe(employeDto.getSexe());
        employe.setSituationFamiliale(employeDto.getSituationFamiliale());
        employe.setDateNaissance(employeDto.getDateNaissance());
        employe.setDateDepart(employeDto.getDateDepart());
        employe.setCsp(cspRepository.findByLibelle(employeDto.getCsp()));
        employe.setContrat(contrat1);
        employeRepository.save(employe);
    }

    @Transactional
    public void renouvelerContrat(int id, Contrat contrat) {
        Employe employe = employeRepository.findById(id).orElseThrow(() -> new ExecutionException("Employé non trouvé avec l'id: " + id));
        Contrat ancienContrat = employe.getContrat();
        if (contrat.getDateDebut() == null || (contrat.getDateFin() != null && contrat.getDateFin().isBefore(contrat.getDateDebut()))) {
            throw new IllegalArgumentException("Dates de contrat invalides");
        }
        String message = String.format("Renouvellement de contrat: l'ancien contrat était de type %s, " + "avait commencé le %s et devait se terminer le %s", ancienContrat.getType(), ancienContrat.getDateDebut(), ancienContrat.getDateFin());
        enregistrerEvenement(employe, "Renouvellement de contrat", message);
        employe.setContrat(contrat);
        employe.setActif(true);
        employeRepository.save(employe);
        notificationService.envoyerNotification(message, "info");
    }

    @Transactional
    public DepartDto rompreContrat(int id, String raison) {
        Employe employe = employeRepository.findById(id).orElseThrow(() -> new ExecutionException("Employé non trouvé avec l'id: " + id));
        LocalDate dateDepart = LocalDate.now();
        employe.setDateDepart(dateDepart);
        employe.getContrat().setEtat(false);
        employe.setActif(false);
        var depart = new DepartDto();
        depart.setRaison(raison);
        depart.setDateDepart(dateDepart);
        depart.setEmploye(employe.getNom()+employe.getPrenom());
        departService.ajouterDepart(depart);
        employeRepository.save(employe);
        return new DepartDto(employe.getId(), raison, employe.getNom() + employe.getPrenom(), dateDepart);
    }

    public Contrat getContratByUserId(int id) {
        return employeRepository.findById(id).get().getContrat();
    }

    public List<AbsenceDto> getAllAbsencesByUserId(int id) {
        return absencesService.listerAbsenceParEmployeId(id);
    }

    public Depart getDepartByUserId(int id) {
        return employeRepository.findById(id).get().getDepart();
    }

    public Employe ajouterEmploye(EmployeDto employedto, Contrat contrat) {
        contrat.setEtat(true);
        var employe = new Employe();
        employe.setNom(employedto.getNom());
        employe.setPrenom(employedto.getPrenom());
        employe.setTel(employedto.getTel());
        employe.setAdresse(employedto.getAdresse());
        employe.setSexe(employedto.getSexe());
        employe.setSituationFamiliale(employedto.getSituationFamiliale());
        employe.setDateNaissance(employedto.getDateNaissance());
        employe.setDateEmbauche(employedto.getDateEmbauche());
        employe.setCsp(cspRepository.findByLibelle(employedto.getCsp()));
        employe.setPoste(posteRepository.findByLibelle(employedto.getPoste()));
        employe.setActif(true);
        employe.setContrat(contrat);
        return employeRepository.save(employe);
    }

    //récupérer un employe grâce à son id
    @Transactional
    public EmployeDto getEmployeById(int id) {
        Employe employe = employeRepository.findById(id).orElseThrow();
        assert employe.getContrat() != null;
        return new EmployeDto(employe.getId(),
                employe.getNom(),
                employe.getPrenom(),
                employe.getTel(),
                employe.getAdresse(),
                employe.getSexe(),
                employe.getSituationFamiliale(),
                employe.getDateNaissance(),
                employe.calculateAge(),
                employe.getDateEmbauche(),
                employe.calculateAnciennete(),
                employe.getDateDepart(),
                employe.getCsp() != null ? employe.getCsp().getLibelle() : null,
                employe.getPoste().getLibelle(),
                employe.getDepart() != null ? employe.getDepart().getRaison() : null,
                employe.getContrat() != null ? employe.getContrat().getType() : null,
                employe.getContrat() != null ? employe.getContrat().getId() : null,
                employe.getContrat() != null ? employe.getContrat().getDateDebut() : null,
                employe.getContrat() != null ? employe.getContrat().getDateFin() : null,
                employe.isActif());
    }

    //mofier un poste
    public Employe modifierPoste(Poste poste, int id) {
        Employe employe = employeRepository.getById(id);
        enregistrerEvenement(employe, "Changement de poste", "l'employé passe de " + employe.getPoste().getLibelle() + " à " + poste.getLibelle());
        employe.setPoste(poste);
        return employeRepository.save(employe);
    }

    public Map<Integer, List<Retraite>> prevoirRetraitesParAnnee(int intervalleMax) {
        LocalDate today = LocalDate.now();
        // Créer une structure pour stocker les employés par année (clé : années restantes avant retraite)
        Map<Integer, List<Retraite>> retraitesParAnnee = new HashMap<>();
        // Initialiser les années 1 à intervalleMax (ex. 1 à 5)
        for (int i = 1; i <= intervalleMax; i++) {
            retraitesParAnnee.put(i, new ArrayList<>());
        }
        // Parcourir tous les employés
        for (Employe employe : employeRepository.findAll()) {
            if (employe.getDateNaissance() != null) {
                // Calculer l'âge actuel de l'employé
                int age = Period.between(employe.getDateNaissance(), today).getYears();

                // Calculer le nombre d'années restantes avant retraite
                int anneesRestantes = 60 - age;
                var retraite = new Retraite();
                retraite.setId(employe.getId());
                retraite.setNom(employe.getNom());
                retraite.setAge(employe.getAge());
                retraite.setPrenom(employe.getPrenom());
                retraite.setPoste(employe.getPoste().getLibelle());
                // Ajouter l'employé à la liste si son départ est prévu dans 1-5 ans
                if (anneesRestantes >= 1 && anneesRestantes <= intervalleMax) {
                    retraitesParAnnee.get(anneesRestantes).add(retraite);
                }
            }
        }
        // Retourner les employés regroupés par nombre d'années avant retraite
        return retraitesParAnnee;
    }

    //création d'un événement
    public void enregistrerEvenement(Employe employe, String typeEvenement, String description) {
        employe.getEvenements().add(Evenement.builder().typeEvenement(typeEvenement).description(description).date(LocalDate.now()).build());
        employeRepository.save(employe);
    }

    public ByteArrayInputStream exportEmployeToExcel() throws IOException {
        String[] columns = {"Nom", "Prenom", "Téléphone", "Adresse", "Sexe", "Situation Familiale", "Date de Naissance", "Âge", "Date d'Embauche", "Date de Départ", "CSP", "Secteur", "Poste", "Type de Contrat"};

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Liste du personnel");
            // Entête
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < columns.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(columns[col]);
            }
            // Data rows
            List<Employe> employes = employeRepository.findAll();
            int rowIdx = 1;
            for (Employe e : employes) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(e.getNom());
                row.createCell(1).setCellValue(e.getPrenom());
                row.createCell(2).setCellValue(e.getTel());
                row.createCell(3).setCellValue(e.getAdresse());
                row.createCell(4).setCellValue(e.getSexe());
                row.createCell(5).setCellValue(e.getSituationFamiliale());
                row.createCell(6).setCellValue(e.getDateNaissance());
                row.createCell(7).setCellValue(e.getAge());
                row.createCell(8).setCellValue(e.getDateEmbauche());
                row.createCell(9).setCellValue(e.getDateDepart());
//                row.createCell(10).setCellValue(e.getCsp());
//                row.createCell(11).setCellValue(e.getSecteur().getLibelle());
//                row.createCell(12).setCellValue(e.getContrat().toString());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

//    public void importDataFromExcel(String filePath){
//        try (FileInputStream fileInputStream = new FileInputStream(filePath);
//             Workbook workbook = new XSSFWorkbook(fileInputStream)) {
//
//            Sheet sheet = workbook.getSheetAt(0); // On suppose que les données sont dans la première feuille
//            List<Employe> employes = new ArrayList<>();
//
//            for (Row row : sheet) {
//                // On ignore la première ligne si elle contient les en-têtes
//                if (row.getRowNum() == 0) {
//                    continue;
//                }
//
//                Employe employe = new Employe();
//
//                // Récupération des données depuis chaque cellule
//                employe.setNom(getCellValue(row.getCell(0)));
//                employe.setPrenom(getCellValue(row.getCell(1)));
//               // employe.setCsp(getCellValue(row.getCell(2)));
//                employe.setAdresse(getCellValue(row.getCell(3)));
//                //employe.setDateEmbauche(getCellValue(row.getCell(4)));
//
//
//                employes.add(employe);
//            }
//
//            // Enregistrer tous les employés dans la base de données
//            for (Employe employe : employes) {
//                employeRepository.save(employe);
//            }
//
//        } catch (IOException e) {
//            e.printStackTrace();
//            // Log et gérer l'exception selon les besoins
//        }
//    }

    private String getCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf(cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }

    private List<Employe> parseExcelFile(InputStream inputStream) throws IOException {
        List<Employe> employes = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {  // Commence à la ligne 1 pour ignorer l'entête
                Row row = sheet.getRow(i);

                if (row != null) {
                    Employe employe = new Employe();
                    employe.setNom(getCellValues(row, 0));
                    employe.setPrenom(getCellValues(row, 1));
                    employe.setTel(getCellValues(row, 2));
                    employe.setAdresse(getCellValues(row, 3));
                    employe.setSexe(getCellValues(row, 4));
                    employe.setSituationFamiliale(getCellValues(row, 5));
                    employe.setDateNaissance(LocalDate.parse(getCellValues(row, 6)));
                    employe.setAge(Integer.parseInt(getCellValues(row, 7)));
                    employe.setDateEmbauche(LocalDate.parse(getCellValues(row, 8)));
//                    employe.setCsp(getCellValues(row, 9));

                    employes.add(employe);
                }
            }
        }

        return employes;
    }

    public void importEmployeesFromExcel(MultipartFile file) throws IOException {
        List<Employe> employes = parseExcelFile(file.getInputStream());
        employeRepository.saveAll(employes);
    }

    private String getCellValues(Row row, int cellIndex) {
        Cell cell = row.getCell(cellIndex);
        return cell != null ? cell.toString().trim() : "";
    }

    //vérifier si l'employé a plus de 60 ans pour le mettre à la retraite
    @Scheduled(cron = "0 0 9 * * ?")
    @Transactional
    public String verifierAge() {
        for (Employe employe : employeRepository.findAll()) {
            if (employe.getAge() >= 60) {
                Depart depart = new Depart();
                depart.setRaison("RETRAITE");
                depart.setEmploye(employe);
                depart.setDateDepart(LocalDate.now());
                departRepository.save(depart);
                employe.getContrat().setEtat(false);
                employeRepository.save(employe);
                enregistrerEvenement(employe, "Retraite", "l'employé a atteint l'âge de la retraite");
                String message = String.format("l'employé %s %s a atteint l'âge de la retraite,il a été désactivé", employe.getNom(), employe.getPrenom());
                notificationService.envoyerNotification(message, "info");
                return "l'employé" + employe.getNom() + " " + employe.getPrenom() + " a atteint l'âge de la retraite";
            }
        }
        return "";
    }

    @Scheduled(cron = "0 0 10 * * ?")
    @Transactional
    public List<String> traiterFinDeContrats() {

        List<String> messages = new ArrayList<>();

        // Récupérer uniquement les employés dont le contrat se termine aujourd'hui
        List<Employe> employesFinContrat = employeRepository.findByContratDateFinAndContratEtatTrue(LocalDate.now());

        for (Employe employe : employesFinContrat) {
            try {
                // Vérifications de sécurité
                if (employe.getContrat() == null || employe.getContrat().getDateFin() == null) {
                    continue;
                }

                // Créer le départ
                Depart depart = new Depart();
                depart.setRaison("FIN DE CONTRAT");
                depart.setEmploye(employe);
                depart.setDateDepart(LocalDate.now());
                departRepository.save(depart);

                // Mettre à jour le contrat
                employe.getContrat().setEtat(false);
                employe.setActif(false);
                employeRepository.save(employe);

                // Enregistrer l'événement
                String message = String.format("L'employé %s %s a atteint la fin de son contrat", employe.getNom(), employe.getPrenom());

                enregistrerEvenement(employe, "Fin de contrat", message);

               notificationService.envoyerNotification(message, "info");

                messages.add(message);

            } catch (Exception e) {
                logger.error("Erreur lors du traitement de fin de contrat pour l'employé {}: {}", employe.getId(), e.getMessage());
                messages.add(String.format("Erreur pour l'employé %s %s: %s", employe.getNom(), employe.getPrenom(), e.getMessage()));
            }
        }

        return messages;
    }

    //vérifier l'état des employés en fonction de l'absence
    @Scheduled(cron = "0 0 11 * * ?")
    public void verifierEtatDeTousLesEmployes() {

        List<Employe> employes = employeRepository.findAll();

        // Pour chaque employé, vérifie s'il a une absence en cours
        for (Employe employe : employes) {

            if (absenceRepository.existsByEmployeAndDateDebutBeforeAndDateFinAfter(employe, LocalDate.now(), LocalDate.now())) {
                if (employe.isActif()) {
                    employe.setActif(false); // Si l'employé est absent, il est inactif
                    employeRepository.save(employe); // Mise à jour de l'état actif/inactif
                }

            } else if (!absenceRepository.existsByEmployeAndDateDebutBeforeAndDateFinAfter(employe, LocalDate.now(), LocalDate.now())) {
                if (!employe.isActif()) {
                    employe.setActif(true); // Si l'employé est absent, il est inactif
                    employeRepository.save(employe); // Mise à jour de l'état actif/inactif
                }
            }


        }
    }


}
