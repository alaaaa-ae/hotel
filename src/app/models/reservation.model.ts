export interface Reservation {
  id: number;
  chambreId: number;
  chambreNom: string;
  hotelNom?: string; // Facultatif avec "?"
  dateArrivee: Date;
  dateDepart: Date;
  nombreNuits: number;
  prixParNuit: number;
  image: string;
}