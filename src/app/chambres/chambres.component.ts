import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { Reservation } from '../models/reservation.model';

interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
  amenities: string[];
}

@Component({
  selector: 'app-chambres',
  templateUrl: './chambres.component.html',
  styleUrls: ['./chambres.component.css']
})
export class ChambresComponent implements OnInit {
  constructor(private panierService: PanierService) { }
  reserver(chambre: Room, dateArrivee: Date, dateDepart: Date): void {
    // Calculer le nombre de nuits
    const arrivee = new Date(dateArrivee);
    const depart = new Date(dateDepart);
    const diffTime = Math.abs(depart.getTime() - arrivee.getTime());
    const nombreNuits = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Créer l'objet réservation
    const reservation: Reservation = {
      id: 0,
      chambreId: chambre.id,
      chambreNom: chambre.name,
      dateArrivee: arrivee,
      dateDepart: depart,
      nombreNuits: nombreNuits,
      prixParNuit: chambre.price,
      image: chambre.image  // Changez 'imageUrl' en 'image' pour correspondre au modèle
    };
    
    // Ajouter au panier
    this.panierService.ajouterReservation(reservation);
    
    // Afficher confirmation
    alert('Réservation ajoutée au panier!');
  }

  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  selectedRoom: Room | null = null;
  searchTerm: string = '';
  filterCapacity: number | null = null;

  ngOnInit(): void {
    // Simuler des données de chambres
    this.rooms = [
      {
        id: 1,
        name: 'Chambre Standard',
        description: 'Une chambre confortable avec lit double, salle de bain privée et vue sur la ville.',
        price: 120,
        capacity: 2,
        image: 'assets/images/chambre1.jpg',
        amenities: ['Wi-Fi', 'TV', 'Climatisation', 'Petit-déjeuner']
      },
      {
        id: 2,
        name: 'Chambre Deluxe',
        description: 'Une chambre spacieuse avec lit king-size, salle de bain luxueuse et vue sur la mer.',
        price: 200,
        capacity: 2,
        image: 'assets/images/suite.jpeg',
        amenities: ['Wi-Fi', 'TV écran plat', 'Climatisation', 'Mini-bar', 'Petit-déjeuner']
      },
      {
        id: 3,
        name: 'Suite Familiale',
        description: 'Une suite spacieuse avec deux chambres, parfaite pour les familles.',
        price: 300,
        capacity: 4,
        image: 'assets/images/familial.jpeg',
        amenities: ['Wi-Fi', '2 TV', 'Climatisation', 'Espace salon', 'Petit-déjeuner']
      }
    ];
    
    this.filteredRooms = [...this.rooms];
  }

  filterRooms(): void {
    this.filteredRooms = this.rooms.filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                           room.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCapacity = this.filterCapacity ? room.capacity >= this.filterCapacity : true;
      return matchesSearch && matchesCapacity;
    });
  }

  selectRoom(room: Room): void {
    this.selectedRoom = room;
  }
  bookRoom(): void {
    if (this.selectedRoom) {
      // Créer des dates par défaut si elles ne sont pas encore sélectionnées
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      
      this.reserver(this.selectedRoom, today, tomorrow);
    }
  }
}