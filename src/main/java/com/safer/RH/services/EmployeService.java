package com.safer.RH.services;

import com.safer.RH.models.Absence;
import com.safer.RH.models.Employe;
import com.safer.RH.repositories.AbsenceRepository;
import com.safer.RH.repositories.EmployeRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeService {
    private final EmployeRepository employeRepository;
    private final AbsenceRepository absenceRepository;

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

    public  List<Employe>listeEmploye(){
        return employeRepository.getAll();
    }

    public Employe ajouterEmploye(Employe employe){
        return employeRepository.save(employe);
    }

    public Optional<Employe> getEmployeById(int id){
        return employeRepository.findById(id);
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
            List<Employe> employes = listeEmploye();
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

    public void importDataFromExcel(String filePath){
        try (FileInputStream fileInputStream = new FileInputStream(filePath);
             Workbook workbook = new XSSFWorkbook(fileInputStream)) {

            Sheet sheet = workbook.getSheetAt(0); // On suppose que les données sont dans la première feuille
            List<Employe> employes = new ArrayList<>();

            for (Row row : sheet) {
                // On ignore la première ligne si elle contient les en-têtes
                if (row.getRowNum() == 0) {
                    continue;
                }

                Employe employe = new Employe();

                // Récupération des données depuis chaque cellule
                employe.setNom(getCellValue(row.getCell(0)));
                employe.setPrenom(getCellValue(row.getCell(1)));
               // employe.setCsp(getCellValue(row.getCell(2)));
                employe.setAdresse(getCellValue(row.getCell(3)));
                //employe.setDateEmbauche(getCellValue(row.getCell(4)));


                employes.add(employe);
            }

            // Enregistrer tous les employés dans la base de données
            for (Employe employe : employes) {
                employeRepository.save(employe);
            }

        } catch (IOException e) {
            e.printStackTrace();
            // Log et gérer l'exception selon les besoins
        }
    }

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
    @Scheduled(cron = "0 0 0 * * ?")
    public String verifierAge(){
        for (Employe employe : employeRepository.findAll()) {
            if (employe.getAge() >= 60) {
               return "l'employé"+employe.getNom()+" "+employe.getPrenom()+" a atteint l'âge de la retraite";
            }
        }
        return "";
    }

    //vérifier l'état des employés en fonction de l'absence
    @Scheduled(cron = "0 0 0 * * ?")
    public void verifierEtatDeTousLesEmployes() {
        List<Employe> employes = employeRepository.findAll();

        // Pour chaque employé, vérifie s'il a une absence en cours
        for (Employe employe : employes) {

            if (absenceRepository.existsByEmployeAndDateDebutBeforeAndDateFinAfter(
                    employe, LocalDate.now(), LocalDate.now())){
                if (employe.isActif()) {
                    employe.setActif(false); // Si l'employé est absent, il est inactif
                    employeRepository.save(employe); // Mise à jour de l'état actif/inactif
                }

            } else if (!absenceRepository.existsByEmployeAndDateDebutBeforeAndDateFinAfter(
                    employe,LocalDate.now(), LocalDate.now())) {
                if (!employe.isActif()) {
                    employe.setActif(true); // Si l'employé est absent, il est inactif
                    employeRepository.save(employe); // Mise à jour de l'état actif/inactif
                }
            }


        }
    }



}
