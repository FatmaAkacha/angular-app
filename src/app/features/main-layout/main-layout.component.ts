import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Récupère l'email de l'utilisateur
    this.userEmail = localStorage.getItem('userEmail');
    if (!this.userEmail) {
      // Si pas connecté, rediriger vers login
      this.router.navigate(['/login']);
    }
  }

  logout() {
    // Supprime l'email et redirige vers login
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}
