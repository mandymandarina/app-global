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
  modifications: Modifications[] = [];
  marvelDataSubscription: Subscription | undefined;

  constructor(
    public moviesDataService: MoviesDataService,
    public marvelService: MarvelService
  ) {}

  ngOnInit(): void {
    debugger;
    this.marvelDataSubscription = this.marvelService.getMarvelData().subscribe({
      next: (data: Modifications[]) => {
        this.modifications = data;
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

  addModifications(modifications: Modifications) {
    this.moviesDataService.addModification(modifications);
  }
}