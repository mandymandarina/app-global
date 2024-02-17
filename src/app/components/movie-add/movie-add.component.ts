import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Modifications } from 'src/app/models/modifications';


@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {
  title: string | undefined;
  endYear: string | undefined;

  @Output() movieAdded = new EventEmitter<Modifications>();

  constructor() { }

  ngOnInit(): void {
  }


  addMovie(){
    console.log(this.title, this.endYear);
    
    debugger;
  this.movieAdded.emit({
    title: this.title,
    endYear: this.endYear,
    description: true

  })

  this.title = '';
  this.endYear= '';
   
  }

}
