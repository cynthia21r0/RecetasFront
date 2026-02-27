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

  bebidas: any[] = [];
  definicionDiccionario: string | null = null;
  palabraBuscada: string = '';

  // Función auxiliar para leer la respuesta de Google Translate
  parsearTraduccion(res: any): string {
    let textoTraducido = '';
    if (res && res[0]) {
      res[0].forEach((item: any) => {
        if (item[0]) textoTraducido += item[0];
      });
    }
    return textoTraducido;
  }

  buscar() {
    if(!this.ingrediente) return;

    // Limpiamos pantalla
    this.recetas = []; this.bebidas = [];
    this.definicionDiccionario = null; this.consejo = '';
    this.palabraBuscada = this.ingrediente;

    // 1. TRADUCIR DE ESPAÑOL A INGLÉS (Para que las APIs entiendan)
    this.api.traducir(this.ingrediente, 'en', 'es').subscribe(resTrad => {
      const ingredienteIngles = this.parsearTraduccion(resTrad).trim();

      // 2. Buscar Comida
      this.api.buscarRecetasExternas(ingredienteIngles).subscribe({
        next: (res) => {
          this.recetas = res.recetas || [];
          if(res.consejo) {
            // Traducir el consejo al español
            this.api.traducir(res.consejo, 'es', 'en').subscribe(t => this.consejo = this.parsearTraduccion(t));
          }
        }
      });

      // 3. Buscar Cócteles
      this.api.buscarBebida(ingredienteIngles).subscribe({
        next: (res) => this.bebidas = res.drinks ? res.drinks.slice(0, 4) : []
      });

      // 4. Buscar Diccionario y Traducirlo
      this.api.buscarSignificado(ingredienteIngles).subscribe({
        next: (res) => {
          if (res && res.length > 0) {
            const defEn = res[0].meanings[0].definitions[0].definition;
            this.api.traducir(defEn, 'es', 'en').subscribe(t => {
              this.definicionDiccionario = this.parsearTraduccion(t);
            });
          }
        },
        error: () => this.definicionDiccionario = null
      });
    });
  }

  verDetalle(idMeal: string) {
    this.api.obtenerDetalleExterna(idMeal).subscribe({
      next: (res) => {
        this.recetaSeleccionada = res;
        this.recetaSeleccionada.instruccionesTraducidas = "Traduciendo al español... ⏳"; // Mensaje de carga

        // Traducir las instrucciones largas de la receta al español
        if(res.strInstructions) {
          this.api.traducir(res.strInstructions, 'es', 'en').subscribe(t => {
            this.recetaSeleccionada.instruccionesTraducidas = this.parsearTraduccion(t);
          });
        }
      },
      error: (err) => alert('Error al cargar la receta completa')
    });
  }

  // NUEVA FUNCIÓN: Para ver y traducir las instrucciones de la bebida
  verDetalleBebida(bebida: any) {
    // Engañamos un poco al modal pasándole los datos de la bebida
    // pero con los nombres que espera la comida (strMeal, etc.)
    this.recetaSeleccionada = {
      strMeal: bebida.strDrink,
      strMealThumb: bebida.strDrinkThumb,
      strInstructions: bebida.strInstructions,
      instruccionesTraducidas: "Traduciendo al español... ⏳" // Mensaje de carga
    };

    // Traducimos las instrucciones de la bebida
    if (bebida.strInstructions) {
      this.api.traducir(bebida.strInstructions, 'es', 'en').subscribe({
        next: (t) => {
          this.recetaSeleccionada.instruccionesTraducidas = this.parsearTraduccion(t);
        },
        error: () => this.recetaSeleccionada.instruccionesTraducidas = "Error al traducir."
      });
    } else {
      this.recetaSeleccionada.instruccionesTraducidas = "No hay instrucciones para esta bebida.";
    }
  }

  cerrarDetalle() {
    this.recetaSeleccionada = null;
  }
}
