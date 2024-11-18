package com.safer.RH.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequest {


    @NotBlank(message = "veuillez entrer un nom d'utilisateur")
    private String username;

    @NotBlank(message = "veuillez entrer un email")
    @NotEmpty(message = "votre email doit être valide --->test@example.com")
    private String email;

    @NotBlank(message = "veuillez entrer un mot de passe ")
    private String password;


}
