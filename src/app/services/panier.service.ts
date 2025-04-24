import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { BehaviorSubject, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private reservations: Reservation[] = [];
  private panierSubject = new BehaviorSubject<Reservation[]>([]);
  
  public panier$ = this.panierSubject.asObservable();
  private isBrowser: boolean;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    if (this.isBrowser) {
      // Récupérer les réservations du localStorage si elles existent et si on est dans un navigateur
      const savedReservations = localStorage.getItem('reservations');
      if (savedReservations) {
        this.reservations = JSON.parse(savedReservations);
        this.panierSubject.next(this.reservations);
      }
    }
  }
  modifierReservation(id: number, nombreNuits: number): void {
    const reservation = this.reservations.find(res => res.id === id);
    if (reservation) {
      // Mettre à jour le nombre de nuits
      reservation.nombreNuits = nombreNuits;
      
      // Recalculer les dates
      const dateArrivee = new Date(reservation.dateArrivee);
      const dateDepart = new Date(dateArrivee);
      dateDepart.setDate(dateArrivee.getDate() + nombreNuits);
      reservation.dateDepart = dateDepart;
      
      // Mettre à jour le panier
      this.panierSubject.next([...this.reservations]);
      
      // Sauvegarder dans localStorage si on est dans un navigateur
      if (this.isBrowser) {
        localStorage.setItem('reservations', JSON.stringify(this.reservations));
      }
    }
  }
  ajouterReservation(reservation: Reservation): void {
    // Générer un ID unique pour la réservation
    reservation.id = Date.now();
    
    this.reservations.push(reservation);
    this.panierSubject.next(this.reservations);
    
    // Sauvegarder dans localStorage si on est dans un navigateur
    if (this.isBrowser) {
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }
  
  supprimerReservation(id: number): void {
    this.reservations = this.reservations.filter(res => res.id !== id);
    this.panierSubject.next(this.reservations);
    
    // Mettre à jour localStorage si on est dans un navigateur
    if (this.isBrowser) {
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }
  
  getReservations(): Reservation[] {
    return this.reservations;
  }
  
  calculerTotal(): number {
    return this.reservations.reduce((total, res) => 
      total + (res.prixParNuit * res.nombreNuits), 0);
  }
  
  viderPanier(): void {
    this.reservations = [];
    this.panierSubject.next(this.reservations);
    
    // Supprimer du localStorage si on est dans un navigateur
    if (this.isBrowser) {
      localStorage.removeItem('reservations');
    }
  }
  
  getNombreItems() {
    return this.panierSubject.pipe(
      map(reservations => reservations.length)
    );
  }
}