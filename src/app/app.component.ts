import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MoviesDataService } from '../app/services/movies-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieAddComponent } from './components/movie-add/movie-add.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any;
  seriesId = '%7BseriesId%7D'; 
  seriesDetails: any; 

  constructor(private movieService: MoviesDataService, 
              private _dialog:MatDialog) { }

  ngOnInit(): void {
    //this.getSeriesDetails();
  }

 openAddMovie() {
    const dialogRef = this._dialog.open(MovieAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMovie();
        }
      },
    });
  } 

  getMovie() {
    
  }

  DeleteMovie(){

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
