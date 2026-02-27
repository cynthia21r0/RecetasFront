import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api-service';
import { RecetaExterna } from '../../models/receta.model';

@Component({
  selector: 'app-buscador',
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.scss',
})
export class Buscador {
  private api = inject(ApiService);

  ingrediente = '';
  recetas: RecetaExterna[] = [];
  consejo = '';
  recetaSeleccionada: any = null;

  buscar() {
    if(!this.ingrediente) return;

    // Limpiamos los resultados anteriores mientras carga
    this.recetas = [];

    this.api.buscarRecetasExternas(this.ingrediente).subscribe({
      next: (res) => {
        this.recetas = res.recetas || [];
        this.consejo = res.consejo;
      },
      error: (err) => alert('Error al buscar recetas')
    });
  }

  verDetalle(idMeal: string) {
    this.api.obtenerDetalleExterna(idMeal).subscribe({
      next: (res) => {
        this.recetaSeleccionada = res;
      },
      error: (err) => alert('Error al cargar la receta completa')
    });
  }

  cerrarDetalle() {
    this.recetaSeleccionada = null;
  }
}
