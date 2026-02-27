import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hero">
      <h1>Bienvenido a SmartChef Hub</h1>
      <p>Tu plataforma inteligente para organizar tus propias recetas y descubrir nuevas ideas con ingredientes de todo el mundo.</p>
      <button routerLink="/buscar" class="btn-primary">Explorar Recetas</button>
    </div>
  `,
  styles: [`
    .hero { text-align: center; padding: 50px 20px; background: #ecf0f1; border-radius: 10px; margin-top: 20px; }
    h1 { color: #2c3e50; }
    .btn-primary { background: #3498db; color: white; border: none; padding: 10px 20px; font-size: 1.2rem; cursor: pointer; border-radius: 5px; margin-top: 15px; }
  `]
})
export class Home {}
