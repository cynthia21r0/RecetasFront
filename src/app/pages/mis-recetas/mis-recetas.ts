import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecetaPropia } from '../../models/receta.model';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-mis-recetas',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-recetas.html',
  styleUrl: './mis-recetas.scss',
})
export class MisRecetas implements OnInit {
  private api = inject(ApiService);
  recetas: RecetaPropia[] = [];
  usuarioId = 1; // Fijo por ahora

  ngOnInit() { this.cargarMisRecetas(); }

  cargarMisRecetas() {
    this.api.getMisRecetas(this.usuarioId).subscribe(data => this.recetas = data);
  }

  borrar(id: number) {
    if(confirm('¿Seguro que deseas eliminar esta receta permanentemente?')) {
      this.api.eliminarReceta(id).subscribe(() => this.cargarMisRecetas());
    }
  }
}
