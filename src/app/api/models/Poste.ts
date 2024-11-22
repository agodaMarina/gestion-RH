import { Secteur } from "./secteur";

export interface Poste{
    id?:number;
    reference?:string;
    libelle?:string;
    niveauEtude?:string;
    description?:string;
    niveauDeSalaire?:number;
    remarque?:string;
    secteur?:Secteur;
}