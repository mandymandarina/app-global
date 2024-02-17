import { Component, OnInit } from '@angular/core';
import { Modifications } from 'src/app/models/modifications';
import { MoviesDataService } from 'src/app/services/movies-data.service';

@Component({
  selector: 'app-table-movie',
  templateUrl: './table-movie.component.html',
  styleUrls: ['./table-movie.component.css']
})
export class TableMovieComponent implements OnInit {
modifications: Modifications[] | undefined;

  constructor(public moviesDataService: MoviesDataService) { }

  ngOnInit(): void {
    this.modifications = this.moviesDataService.getModifications()
  }

  addModifications(modifications: Modifications){
    this.moviesDataService.addModification(modifications)
  }

}
