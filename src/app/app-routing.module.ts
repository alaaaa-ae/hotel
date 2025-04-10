import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChambresComponent } from './chambres/chambres.component';
import { PanierComponent } from './panier/panier.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chambres', component: ChambresComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }