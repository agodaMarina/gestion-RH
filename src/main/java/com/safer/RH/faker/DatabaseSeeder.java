package com.safer.RH.faker;

import com.safer.RH.services.CandidatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final PosteDataInjector secteurPosteDataInjector;
    private final EmployeDataInjector employeDataInjector;
    private final CandidatureDataInjector candidatureDataInjector;

    @Override
   public void run(String... args) throws Exception {
        // Injecter les secteurs et postes
       //secteurPosteDataInjector.injectFakeSecteurs(10);
        //secteurPosteDataInjector.injectFakePostes(20);
       // Injecter les employés
        //employeDataInjector.injectFakeEmployes(100);

        // Injecter les candidatures
//        candidatureDataInjector.injectCandidatureData(20);
    }
}