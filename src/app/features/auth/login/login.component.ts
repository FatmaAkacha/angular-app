import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  // ⚡ Injecter le service
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private dataService: DataService  // ✅ Ici
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  login() {
    if (this.form.invalid) return;

    const email = this.form.value.email;

    // ⚡ Utiliser l'instance injectée, pas le nom de classe
    this.dataService.login(email);

    localStorage.setItem('userEmail', email);
    this.router.navigate(['/tasks']);
  }

  submit() {
    if (this.form.valid) {
      const userEmail = this.form.value.email;
      console.log('Email saisi:', userEmail);

      // On peut sauvegarder l'email dans le localStorage ou dans un service
      localStorage.setItem('userEmail', userEmail);

      // Redirection vers la liste des tâches
      this.router.navigate(['/tasks']);
    }
  }
}
