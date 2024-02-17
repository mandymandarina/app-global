import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Modifications } from '../models/modifications';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {
  modifications: Modifications[] //
  private apiUrl = 'https://moviesdatabase.p.rapidapi.com/titles/series/{seriesId}';
  private apiKey = 'b023143cb5msh89dba369a5132a8p19fdcajsn1eb072b7436d';

  

  constructor(private http: HttpClient) {
    this.modifications = []
   }

   getModifications(): Modifications[]  {
  
    const storedData = localStorage.getItem('modifications');

    if (storedData === null) {
      this.modifications = [];
    } else {
      try {
        this.modifications = JSON.parse(storedData);
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        this.modifications = [];
      }
    }
  
    return this.modifications;
   }

   /* addModification(modification: Modifications): void {

    this.modifications.push(modification);
    let modificationsAdd;

    const storedData = localStorage.getItem('modifications');

    if (storedData === null) {
      modificationsAdd = [];
      modificationsAdd.push(modification);
      localStorage.setItem('modificationsAdd', JSON.stringify(modificationsAdd))
    } else {
      modificationsAdd = JSON.parse(localStorage.getItem('modificationsAdd'));
      modificationsAdd.push(modification);
      localStorage.setItem('modificationsAdd', JSON.stringify(modificationsAdd))
    }
   } */

    addModification(modificacion: Modifications): void {
    this.modifications.push(modificacion);

  // Obtiene las modificaciones existentes de localStorage
  const datosAlmacenados = localStorage.getItem('modifications');

  // Crea un nuevo array o parsea el existente
  const arregloModificaciones = datosAlmacenados ? JSON.parse(datosAlmacenados) : [];

  // Añade la nueva modificación al array
  arregloModificaciones.push(modificacion);

  // Actualiza localStorage con el array modificado
  localStorage.setItem('modifications', JSON.stringify(arregloModificaciones));
   } 
 
    deleteMovie(modificacion: Modifications) {
      for(let i= 0; this.modifications.length; i++){
        if(modificacion == this.modifications[i]){
          this.modifications.splice(i, 1);
          localStorage.setItem('modifications', JSON.stringify(this.modifications))
        } 

      }
   } 

  /* getSeriesDetails(seriesId: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    });

    const url = `${this.apiUrl.replace('{seriesId}', seriesId)}`;

    return this.http.get(url, { headers });
  } */
}

