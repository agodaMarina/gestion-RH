import { Poste } from "./Poste";

export interface Candidature {
  id?: number;
  nom?: String;
  prenom?: String;
  email?: String;
  telephone?: String;
  adresse?: String;
  prochaineAction?:String;
  dateEntretien1?:String;
  dateEntretien2?:String;
  dateEntretien3?:String;
  stadeDeRecrutement?: String;
  noteExperience?: number;
  noteCompetence?: number;
  moyenne?: number;
  noteSavoirEtre?: number;
  apreciationGlobale?: number;
  poste?:Poste;
}
