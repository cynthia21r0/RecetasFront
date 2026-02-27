import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecetaPropia } from '../models/receta.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api';

  // === NUEVA API DE TRADUCCIÓN (Google Translate Gratuito) ===
  traducir(texto: string, idiomaDestino: string = 'es', idiomaOrigen: string = 'auto'): Observable<any> {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${idiomaOrigen}&tl=${idiomaDestino}&dt=t&q=${encodeURIComponent(texto)}`;
    return this.http.get(url);
  }

  // === APIs EXTERNAS (Frontend) ===
  buscarBebida(nombre: string): Observable<any> {
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`);
  }

  buscarSignificado(palabra: string): Observable<any> {
    return this.http.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`);
  }

  // APIs Externas
  buscarRecetasExternas(ingrediente: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/recetas/buscar?ingrediente=${ingrediente}`);
  }
  obtenerDetalleExterna(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/recetas/detalle/${id}`);
  }

  // CRUD Recetas Propias
  getMisRecetas(usuarioId: number): Observable<RecetaPropia[]> {
    return this.http.get<RecetaPropia[]>(`${this.apiUrl}/mis-recetas/${usuarioId}`);
  }

  getUnaReceta(id: number): Observable<RecetaPropia> {
    return this.http.get<RecetaPropia>(`${this.apiUrl}/mi-receta/${id}`);
  }

  crearReceta(receta: RecetaPropia): Observable<any> {
    return this.http.post(`${this.apiUrl}/mis-recetas`, receta);
  }

  actualizarReceta(id: number, receta: RecetaPropia): Observable<any> {
    return this.http.put(`${this.apiUrl}/mis-recetas/${id}`, receta);
  }

  eliminarReceta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/mis-recetas/${id}`);
  }
}
