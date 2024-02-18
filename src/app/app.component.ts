import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MoviesDataService } from '../app/services/movies-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieAddComponent } from './components/movie-add/movie-add.component';
import { MarvelService } from './srcappservices/marvel.service';
import { Observable } from 'rxjs';
import { Modifications } from './models/modifications';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
DeleteMovie(arg0: Observable<Modifications[]>) {
throw new Error('Method not implemented.');
}
  modifications$ = this.marvelService.getModiObservable();

  constructor(private marvelService: MarvelService) {}

 


  ngOnInit(): void {
    //this.getSeriesDetails();
  }



  /* getSeriesDetails() {
    this.movieService.getSeriesDetails(this.seriesId)
      .subscribe({
        next: (data: any) => {
          this.seriesDetails = data;
          console.log('Datos de la serie:', this.seriesDetails);
        },
        error: (error: any) => {
          if (error.status === 429) {
            console.log('Se ha alcanzado el límite de solicitudes. Esperando antes de volver a intentar.');
            setTimeout(() => {
              this.getSeriesDetails();
            }, 5000);
          } else {
            console.error('Error al obtener detalles de la serie:', error);
          }
        }
      });
    } */
    
}
