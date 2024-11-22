import { Employe } from './employe';

export interface Absence {
  id?: number;
  type?: string;
  motif?:string;
  dateDebut?: string;
  dateFin?: string;
  employe?: Employe;
}
