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

export interface RecrutementDto {
    id?:number;
    poste?:string;
    salaire?:number;
    niveauEtude?:string;
    recruteur?:string;
    statut?:string;
    etapeActuelle?:string;
    dateDebut?:string;
    dateFin?:string;
}