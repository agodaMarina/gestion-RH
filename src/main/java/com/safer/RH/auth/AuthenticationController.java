package com.safer.RH.auth;
import com.safer.RH.models.User;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {
    private final AuthenticationService service;
    private final LogoutService logoutService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(@Valid
            @RequestBody  RegistrationRequest request
    ) throws MessagingException {
        service.register(request);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/activate_account")
    public void activeAccount(@RequestParam String token) throws MessagingException {
        service.activateAccount(token);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<AuthenticationResponse> login(@Valid
            @RequestBody  AuthenticateRequest request
    ) {
        return ResponseEntity.accepted().body(service.authenticate(request));
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logoutService.logout(request, response, authentication);
        return ResponseEntity.status(HttpStatus.OK).body("Logout successful");
    }

    @GetMapping("/details/{id}")
    public User getDetails(@PathVariable Long id){
        return service.getOneUser(id);
    }

    @GetMapping("/me")
    public UserDetails getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        System.out.println(userDetails.getUsername());
        return userDetails;
    }


}
