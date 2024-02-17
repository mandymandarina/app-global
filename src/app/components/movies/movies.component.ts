import { Component, OnInit, Input } from '@angular/core';
import { Modifications } from 'src/app/models/modifications';
import { MoviesDataService } from 'src/app/services/movies-data.service';
import { MarvelService } from 'src/app/srcappservices/marvel.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  @Input('modifications') modifications:Modifications | undefined
  constructor( public moviesDataService: MoviesDataService,
              public marvelService: MarvelService) { }

  ngOnInit(): void {
  }
  DeleteMovie(modifications: Modifications) {
    this.marvelService.deteleDataLocal();
  }
}
