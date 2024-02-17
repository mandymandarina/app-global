import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private apiUrl = 'https://gateway.marvel.com:443/v1/public/series';
  private apiKey = '9b092613ddc32e3e870abfe3c1f745c6';
  private privateKey = 'a13de1628d9451d856f0f8aa93e47db6b8d0be8a';

  constructor(private http: HttpClient) {}

  private generateHash(): string {
    const currentDate = new Date().toISOString().split('T')[0];
    return Md5.hashStr(currentDate + this.privateKey + this.apiKey).toString();
  }

  getMarvelData(): Observable<any> {
    const hash = this.generateHash();
    const finalUrl = `${this.apiUrl}?apikey=${this.apiKey}&hash=${hash}&ts=${new Date().toISOString().split('T')[0]}`;

    return this.http.get(finalUrl);
  }

  saveDataToLocal(data: any): void {
    localStorage.setItem('datosMarvel', JSON.stringify(data));
    console.log('Datos de Marvel guardados en el localStorage:', data);
  }
}