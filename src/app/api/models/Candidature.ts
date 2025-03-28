import { Evaluation } from './evaluation';
import { Recrutement } from './recrutement';

export interface Candidature {
  id?: number;
  nom?: String;
  prenom?: String;
  email?: String;
  telephone?: String;
  adresse?: String;
  prochaineAction?: String;
  dateEntretien1?: String;
  dateEntretien2?: String;
  dateEntretien3?: String;
  stadeDeRecrutement?: String;
  moyenne?: number;
  apreciationGlobale?: string;
  recrutement?: Recrutement;
  evaluation?: Evaluation;
  estRetenu?: boolean;
}

export interface CandidatureCreation {
  id?: number;
  nom: String;
  prenom: String;
  email: String;
  telephone: String;
  adresse: String;
  dateEntretien1: string;
  notePresentation?: number;
  noteExperience?: number;
  noteCompetenceEtAtout?: number;
  noteSavoirEtre?: number;
  noteQualiteEtDefaut?: number;
  prochaineAction: String;
  apreciationGlobale: string;
  moyenne?: number;
  estRetenu?: boolean;
}
