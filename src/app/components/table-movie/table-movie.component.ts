import { Component, OnInit } from '@angular/core';
import { Modifications } from 'src/app/models/modifications';
import { MoviesDataService } from 'src/app/services/movies-data.service';
import { MarvelService } from 'src/app/srcappservices/marvel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-movie',
  templateUrl: './table-movie.component.html',
  styleUrls: ['./table-movie.component.css']
})
export class TableMovieComponent implements OnInit {
  //modifications: Modifications[] = [];
  marvelDataSubscription: Subscription | undefined;

  constructor(
    public moviesDataService: MoviesDataService,
    public marvelService: MarvelService
  ) {}

  ngOnInit(): void {
    this.marvelDataSubscription = this.marvelService.getMarvelData().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data.results)) {
          this.marvelService.modifications = response.data.results;
          if(!this.validateData()){
            localStorage.setItem('modi', JSON.stringify(response.data.results));
          }else {

            let arrModi;
            
            const arr = localStorage.getItem('modi');

            if (arr === null) {
              arrModi = [];
            } else {
              arrModi = JSON.parse(arr);
            }

            
            
            this.marvelService.setDataSubscrip(arrModi);
          }
          console.log(response.data.results);
        }else {
          console.error('Los datos recibidos no son un array:', response.data.results);
        }
      },
      error: (error) => {
        console.error('Error al obtener datos de Marvel:', error);
      }
    });

    
  }

  ngOnDestroy(): void {
    // Importante: desuscribirse para evitar posibles fugas de memoria
    if (this.marvelDataSubscription) {
      this.marvelDataSubscription.unsubscribe();
    }
  }

  /* addModifications(modifications: Modifications) {
    this.moviesDataService.addModification(modifications);
  } */

  addMarvel(modifications: Modifications) {
    this.marvelService.addData(modifications);
  }

  
  validateData(){
      return localStorage.getItem('modi');
  }

 
}