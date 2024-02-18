import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Modifications } from 'src/app/models/modifications';
import { MoviesDataService } from 'src/app/services/movies-data.service';
import { MarvelService } from 'src/app/srcappservices/marvel.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnChanges {
  movies: Modifications[] = [];
  @Input('modifications') modifications!: Modifications[];
  constructor( public moviesDataService: MoviesDataService,
               public marvelService: MarvelService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['modifications'].currentValue) {
      this.movies = this.modifications;
    }
  }

  ngOnInit(): void {
  }
  DeleteMovie(modifications: Modifications) {
    this.marvelService.deteleDataLocal();
  }
}