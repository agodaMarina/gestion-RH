import { Contrat } from "./contrat";
import { Csp } from "./csp";
import { Depart } from "./Depart";
import { Evenement } from "./evenement";
import { Poste } from "./Poste";
import { Secteur } from "./secteur";

export interface Employe{
    id: number;
    nom: string;
    prenom: string;
    tel: string;
    adresse: string;
    sexe: string;
    situationFamiliale: string;
    dateNaissance: string; 
    age:number;// Stocké en chaîne de caractères (format ISO)
    dateEmbauche: string;   
    anciennete:number;
    dateDepart?: string;    // Optionnel, certains employés n'ont pas encore quitté
    csp: Csp;
    poste: Poste;        // ID du Poste
    depart?: Depart;        // L'objet Depart, optionnel
    contrat: Contrat;
    Evenements?: Evenement[];    // Tableau d'objets Evenement  
}