import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalTrigger = new BehaviorSubject<boolean>(false); // Par défaut, le modal est fermé
  modalTrigger$ = this.modalTrigger.asObservable(); // Observable pour écouter les changements

  openModal() {
    this.modalTrigger.next(true); // Active l'affichage du modal
  }

  closeModal() {
    this.modalTrigger.next(false); // Désactive l'affichage du modal
  }
}
