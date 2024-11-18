package com.safer.RH.controllers;

import com.safer.RH.auth.AuthenticationService;
import com.safer.RH.auth.ChangePasswordRequest;
import com.safer.RH.auth.UpdateProfilRequest;
import com.safer.RH.models.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/utilisateur")
@RequiredArgsConstructor
public class ProfileController {
    private final AuthenticationService service;

    @GetMapping("/profile")
    public User getProfile(){
        return service.getProfile();
    }


    @PostMapping("/change-password")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<String> changePassword(@Valid
                                                 @RequestBody ChangePasswordRequest request, Principal utilisateurConnecte
    ) {
        service.changePassword(request,utilisateurConnecte);
        return ResponseEntity.accepted().body("Mot de passe modifié avec succès");
    }

    @PostMapping("/updateProfile")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<String> updateProfile(@Valid
                                                @RequestBody UpdateProfilRequest user, Principal utilisateurConnecte
    ) {
        service.updateProfile(user,utilisateurConnecte);
        return ResponseEntity.accepted().body("Profil modifié avec succès");
    }



}
