export interface RecetaPropia {
  id?: number;
  usuario_id?: number;
  nombre: string;
  descripcion: string;
  ingredientes: string;
  instrucciones: string;
  fecha?: string;
}

export interface RecetaExterna {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}
