import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {
  email: string = '';
  description: string = '';
  message: string = '';
  isModalOpen!: boolean;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.modalTrigger$.subscribe((state) => {
      this.isModalOpen = state;
    });
  }

  sendReport() {
    if (!this.email || !this.description) {
      this.message = 'Veuillez remplir tous les champs.';
      return;
    }

    // Simuler l'envoi du rapport (remplace par ton service)
    this.message = 'Bug report envoyé avec succès !';
    this.resetForm();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  resetForm() {
    this.email = '';
    this.description = '';
  }
}
