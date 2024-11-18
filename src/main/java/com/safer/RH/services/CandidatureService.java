package com.safer.RH.services;

import com.safer.RH.models.Candidature;
import com.safer.RH.models.Employe;
import com.safer.RH.repositories.CandidatureRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CandidatureService {
    private final CandidatureRepository candidatureRepository;

    public void deleteCandidature(Long id){
        candidatureRepository.deleteById(id);
    }

    public Candidature ajouter(Candidature candidature){
        return candidatureRepository.save(candidature);
    }

    public Candidature modifier(Candidature candidature){
        return candidatureRepository.save(candidature);
    }

    public Candidature getCandidature(Long id){
        return candidatureRepository.findById(id).orElse(null);
    }

    public List<Candidature> getListCandidature(){
        return candidatureRepository.getListeAsc();
    }

    public ByteArrayInputStream exportCandidatToExcel() throws IOException {
        String[] columns = {"Nom", "Prenom", "Email", "Téléphone", "Adresse", "Stade de Recrutement",  "Moyenne", "Poste concerné"};
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Liste des candidatures");
            // Entête
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < columns.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(columns[col]);
            }
            // Data rows
            List<Candidature> candidatures = getListCandidature();
            int rowIdx = 1;
            for (Candidature c : candidatures) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(c.getNom());
                row.createCell(1).setCellValue(c.getPrenom());
                row.createCell(2).setCellValue(c.getEmail());
                row.createCell(3).setCellValue(c.getTelephone());
                row.createCell(4).setCellValue(c.getAdresse());
                row.createCell(6).setCellValue(c.getStadeDeRecrutement());
                row.createCell(7).setCellValue(c.getMoyenne());
                row.createCell(8).setCellValue(c.getRecrutement().getPoste().getLibelle());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}
