// navigation.component.ts
import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']  // Vérifiez que le chemin est correct
})
export class NavigationComponent implements OnInit {
  nombreItems: number = 0;

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    this.panierService.getNombreItems().subscribe(nombre => {
      this.nombreItems = nombre;
    });
  }
}