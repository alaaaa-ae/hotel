// panier.component.ts - méthode validerPanier() modifiée
import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { Reservation } from '../models/reservation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  reservations: Reservation[] = [];
  total: number = 0;
  editingId: number | null = null;
  nouveauNombreNuits: number = 1;

  constructor(private panierService: PanierService, private router: Router) { }

  ngOnInit(): void {
    this.reservations = this.panierService.getReservations();
    this.total = this.panierService.calculerTotal();
    
    // S'abonner aux changements du panier
    this.panierService.panier$.subscribe(reservations => {
      this.reservations = reservations;
      this.total = this.panierService.calculerTotal();
    });
  }
  
  commencerEdition(reservation: Reservation): void {
    this.editingId = reservation.id;
    this.nouveauNombreNuits = reservation.nombreNuits;
  }
  
  annulerEdition(): void {
    this.editingId = null;
  }
  
  sauvegarderEdition(id: number): void {
    if (this.nouveauNombreNuits < 1) {
      alert('Le nombre de nuits doit être au moins 1.');
      return;
    }
    this.panierService.modifierReservation(id, this.nouveauNombreNuits);
    this.editingId = null;
  }
  
  // Méthode pour formater une date en français
  formaterDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }
  
  supprimerReservation(id: number): void {
    this.panierService.supprimerReservation(id);
  }

  viderPanier(): void {
    this.panierService.viderPanier();
  }
  
  continuerShopping(): void {
    this.router.navigate(['/chambres']);
  }
  
  validerPanier(): void {
    // Rediriger vers la page de paiement au lieu d'afficher une alerte
    if (this.reservations.length > 0) {
      this.router.navigate(['/paiement']);
    } else {
      alert('Votre panier est vide.');
    }
  }
}