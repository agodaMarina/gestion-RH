import { Candidature } from "./Candidature";

export interface Evaluation{
    id?:number;
    notePresentation:number;
    noteExperience:number;
    noteCompetenceEtAtout:number;
    noteSavoirEtre:number;
    noteQualiteEtDefaut:number;
    candidat:Candidature;
}