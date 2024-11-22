import { Candidature } from "./Candidature";
import { Poste } from "./Poste";
import { Recruteur } from "./recruteur";

export interface Recrutement {
    id?: number;
    poste?:Poste;
    candidats?:Candidature[];
    recruteur?: Recruteur;
    statut?:string;
    dateDebut?: string;
    dateFin?: string;
    
}