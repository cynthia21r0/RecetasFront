import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RecetaPropia } from '../../models/receta.model';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-crear-receta',
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-receta.html',
  styleUrl: './crear-receta.scss',
})
export class CrearReceta implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  receta: RecetaPropia = { nombre: '', descripcion: '', ingredientes: '', instrucciones: '', usuario_id: 1 };
  esEdicion = false;
  idReceta?: number;

  ngOnInit() {
    this.idReceta = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idReceta) {
      this.esEdicion = true;
      this.api.getUnaReceta(this.idReceta).subscribe(data => this.receta = data);
    }
  }

  guardar() {
    if (this.esEdicion) {
      this.api.actualizarReceta(this.idReceta!, this.receta).subscribe(() => {
        this.router.navigate(['/mis-recetas']);
      });
    } else {
      this.api.crearReceta(this.receta).subscribe(() => {
        this.router.navigate(['/mis-recetas']);
      });
    }
  }

  cancelar() { this.router.navigate(['/mis-recetas']); }
}
