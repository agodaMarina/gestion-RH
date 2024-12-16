import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BodyComponent } from './body/body.component';
import { NavbarComponent } from './body/navbar/navbar.component';
import { FooterComponent } from './body/footer/footer.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { RapportComponent } from './body/pages/rapport/rapport.component';
import { DepartComponent } from './body/pages/depart/depart.component';
import { AbsenceComponent } from './body/pages/absence/absence.component';
import { PosteComponent } from './body/pages/poste/poste.component';
import { AddCandidatComponent } from './body/pages/add-candidat/add-candidat.component';
import { AddemployeComponent } from './body/pages/addemploye/addemploye.component';
import { ListecandidaturesComponent } from './body/pages/listecandidatures/listecandidatures.component';
import { ListeemployeComponent } from './body/pages/listeemploye/listeemploye.component';
import { DetailemployeComponent } from './body/pages/detailemploye/detailemploye.component';
import { RecrutementComponent } from './body/pages/recrutement/recrutement.component';

import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { ChartModule } from 'angular-highcharts';
import { TabViewModule } from 'primeng/tabview';
import { StepsModule } from 'primeng/steps';
import { BadgeModule } from 'primeng/badge';
import { SecteurComponent } from './body/pages/secteur/secteur.component';
import { CspComponent } from './body/pages/csp/csp.component';
import { RecruteurComponent } from './body/pages/recruteur/recruteur.component';
import { AddPosteComponent } from './body/pages/recrutement/etapes/add-poste/add-poste.component';
import { EvaluationComponent } from './body/pages/recrutement/etapes/evaluation/evaluation.component';
import { SelectionComponent } from './body/pages/recrutement/etapes/selection/selection.component';


import { PaginationComponent } from './body/pagination/pagination.component';
import { ListprocessusComponent } from './body/pages/listprocessus/listprocessus.component';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    BodyComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    RapportComponent,
    DepartComponent,
    AbsenceComponent,
    PosteComponent,
    AddCandidatComponent,
    AddemployeComponent,
    ListecandidaturesComponent,
    ListeemployeComponent,
    DetailemployeComponent,
    RecrutementComponent,
    SecteurComponent,
    CspComponent,
    RecruteurComponent,
    AddPosteComponent,
    EvaluationComponent,
    SelectionComponent,
    PaginationComponent,
    ListprocessusComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    ChartModule,
    TabViewModule,
    StepsModule,
    BadgeModule,
    DividerModule,
    FullCalendarModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class MainModule {}
