import { Contrat } from "./contrat";
import { Depart } from "./Depart";

export interface Employe{
    id: number;
    nom: string;
    prenom: string;
    tel: string;
    adresse: string;
    sexe: string;
    situationFamiliale: string;
    dateNaissance: string; // Stocké en chaîne de caractères (format ISO)
    dateEmbauche: string;   // Stocké en chaîne de caractères (format ISO)
    dateDepart?: string;    // Optionnel, certains employés n'ont pas encore quitté
    csp: string;
    secteurId: number;      // ID du Secteur
    posteId: number;        // ID du Poste
    depart?: Depart;        // L'objet Depart, optionnel
    contrat: Contrat;  
}