import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Md5 } from 'ts-md5';

import { Modifications } from '../models/modifications';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {
  private apiUrl = 'https://gateway.marvel.com:443/v1/public/series';
  private publicKey = '9b092613ddc32e3e870abfe3c1f745c6';
  private privateKey = 'a13de1628d9451d856f0f8aa93e47db6b8d0be8a';
  private localStorageKey = 'modifications';
  modifications: Modifications[] = [];

  constructor(private http: HttpClient) {}

  //muestra la fa
  getModificationsFromAPI(): Observable<Modifications[]> {
    const ts = new Date().getTime();
    const hash = Md5.hashStr(`${ts}${this.privateKey}${this.publicKey}`);

    const params = {
      apikey: this.publicKey,
      ts: ts,
      hash: hash
    };

    return this.http.get<Modifications[]>(this.apiUrl, { params: params })
      .pipe(
        tap(data => this.saveToLocalStorage(data)),
        catchError(this.handleError)
      );
  }

  private saveToLocalStorage(data: Modifications[]): void {
    debugger;
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    this.modifications = data;
  }

  getModifications(): Modifications[] {
    const storedData = localStorage.getItem(this.localStorageKey);

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

  addModification(modificacion: Modifications): void {
    this.modifications.push(modificacion);
    const datosAlmacenados = localStorage.getItem(this.localStorageKey);
    const arregloModificaciones = datosAlmacenados ? JSON.parse(datosAlmacenados) : [];
    arregloModificaciones.push(modificacion);
    localStorage.setItem(this.localStorageKey, JSON.stringify(arregloModificaciones));
  }

  deleteMovie(modificacion: Modifications) {
    const index = this.modifications.findIndex(m => m === modificacion);

    if (index !== -1) {
      this.modifications.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.modifications));
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('Error fetching modifications from API:', error);
    return new Observable<never>();
  }
}