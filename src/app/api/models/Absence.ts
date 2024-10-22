import { Employe } from './employe';

export interface Absence {
  id?: number;
  type?: string;
  dateDebut?: string;
  dateFin?: string;
  employe?: Employe;
}
