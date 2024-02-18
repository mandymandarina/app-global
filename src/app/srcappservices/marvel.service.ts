import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Md5 } from 'ts-md5';
import { Modifications } from '../models/modifications';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private apiUrl = 'https://gateway.marvel.com:443/v1/public/series';
  private apiKey = '9b092613ddc32e3e870abfe3c1f745c6';
  private privateKey = 'a13de1628d9451d856f0f8aa93e47db6b8d0be8a';
  private modiSubject: BehaviorSubject<Modifications[]>;

  private _modifications: Modifications[] = [];

  constructor(private http: HttpClient) {
    this.modiSubject = new BehaviorSubject<Modifications[]>([]);
  }

  set modifications(value: Modifications[]) {
    this._modifications = value;
  }

  get modifications() {
    return this._modifications;
  }

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

  /* addDataToLocal(data: any): void {
    const existingDataString = localStorage.getItem('datosMarvel');
    let existingData: any[] = [];

    if (existingDataString) {
      existingData = JSON.parse(existingDataString);
    }

    existingData.push(data);
    localStorage.setItem('datosMarvel', JSON.stringify(existingData));
    console.log('Nuevo dato de Marvel agregado al localStorage:', data);
    console.log(existingData);
  } */

  addData(modifications: Modifications): void {
    const currentModi = this.modiSubject.value;
    currentModi.unshift(modifications);
   

    let modi;

    const storedData = localStorage.getItem('modi');

    if (storedData === null) {
      modi = [];
    } else {
      modi = JSON.parse(storedData);
    }

    modi.unshift(modifications);
    this._modifications.push(modi);
    localStorage.setItem('modi', JSON.stringify(modi));
    console.log(modi);
    this.modiSubject.next(this._modifications);
  }

  setDataSubscrip(modifications: Modifications[]) {
     this.modiSubject.next(modifications);
  }

  getModiObservable(): Observable<Modifications[]> {
    return this.modiSubject.asObservable();
  }

  deteleDataLocal(): void {
    localStorage.removeItem('datosMarvel');
    console.log('Datos de Marvel eliminados del localStorage');
  }
}