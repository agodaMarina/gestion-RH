package com.safer.RH.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    MANAGER_READ("comptable:read"),
    MANAGER_UPDATE("comptable:update"),
    MANAGER_CREATE("comptable:create"),
    MANAGER_DELETE("comptable:delete")


    ;
    private final String permission;
}


