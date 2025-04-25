// paiement.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  paiementForm: FormGroup;
  total: number = 0;
  loading: boolean = false;
  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private panierService: PanierService
  ) {
    this.paiementForm = this.fb.group({
      nomComplet: ['', [Validators.required]],
      numeroCarte: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      dateExpiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  ngOnInit(): void {
    this.total = this.panierService.calculerTotal() * 1.2; // Total avec taxes
    
    // Si le panier est vide, rediriger vers la page des chambres
    if (this.panierService.getReservations().length === 0) {
      this.router.navigate(['/chambres']);
    }
  }

  // Getter pour faciliter l'accès aux contrôles du formulaire
  get f() { return this.paiementForm.controls; }

  onSubmit(): void {
    // Si le formulaire est invalide, marquer tous les champs comme touchés pour montrer les erreurs
    if (this.paiementForm.invalid) {
      Object.keys(this.paiementForm.controls).forEach(key => {
        const control = this.paiementForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    
    // Simuler un traitement de paiement
    setTimeout(() => {
      this.loading = false;
      this.panierService.viderPanier();
      alert('Paiement effectué avec succès! Merci pour votre réservation.');
      this.router.navigate(['/home']);
    }, 2000);
  }

  retourPanier(): void {
    this.router.navigate(['/panier']);
  }
}