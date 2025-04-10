import { Component, OnInit } from '@angular/core';

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
        image: 'assets/images/room1.jpg',
        amenities: ['Wi-Fi', 'TV', 'Climatisation', 'Petit-déjeuner']
      },
      {
        id: 2,
        name: 'Chambre Deluxe',
        description: 'Une chambre spacieuse avec lit king-size, salle de bain luxueuse et vue sur la mer.',
        price: 200,
        capacity: 2,
        image: 'assets/images/room2.jpg',
        amenities: ['Wi-Fi', 'TV écran plat', 'Climatisation', 'Mini-bar', 'Petit-déjeuner']
      },
      {
        id: 3,
        name: 'Suite Familiale',
        description: 'Une suite spacieuse avec deux chambres, parfaite pour les familles.',
        price: 300,
        capacity: 4,
        image: 'assets/images/room3.jpg',
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
      alert(`Vous avez réservé la chambre ${this.selectedRoom.name}!`);
      // Ici vous pourriez rediriger vers une page de paiement ou enregistrer la réservation
    }
  }
}