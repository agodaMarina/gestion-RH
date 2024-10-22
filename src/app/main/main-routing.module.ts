import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { AbsenceComponent } from './body/pages/absence/absence.component';
import { DepartComponent } from './body/pages/depart/depart.component';
import { PosteComponent } from './body/pages/poste/poste.component';
import { AddCandidatComponent } from './body/pages/add-candidat/add-candidat.component';
import { ListecandidaturesComponent } from './body/pages/listecandidatures/listecandidatures.component';
import { ListeemployeComponent } from './body/pages/listeemploye/listeemploye.component';
import { DetailemployeComponent } from './body/pages/detailemploye/detailemploye.component';
import { AddemployeComponent } from './body/pages/addemploye/addemploye.component';
import { RapportComponent } from './body/pages/rapport/rapport.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
      { path: 'acceuil', component: DashboardComponent },
      { path: 'absence', component: AbsenceComponent },
      { path: 'depart', component: DepartComponent },
      { path: 'poste', component: PosteComponent },
      { path: 'candidats', component: ListecandidaturesComponent },
      { path: 'add-candidat', component: AddCandidatComponent },
      { path: 'employes', component: ListeemployeComponent },
      { path: 'detail', component: DetailemployeComponent },
      { path: 'add-employe', component: AddemployeComponent },
      { path: 'rapport', component: RapportComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
