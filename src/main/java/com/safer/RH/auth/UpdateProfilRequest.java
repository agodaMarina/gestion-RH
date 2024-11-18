package com.safer.RH.auth;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UpdateProfilRequest {


    private String firstName;


    private String lastName;


    private String email;


    private String telephone;
}
