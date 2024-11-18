package com.safer.RH.auth;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticateRequest {
    @NotEmpty(message = "veuillez entrer votre email ")
    private String email;

    @NotEmpty(message = "veuillez entrer un mot de passe ")
    private String password;
}
