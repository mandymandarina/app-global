import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Modifications } from 'src/app/models/modifications';


@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {
  title: string | undefined;
  resume: string | undefined;

  @Output() movieAdded = new EventEmitter<Modifications>();

  constructor() { }

  ngOnInit(): void {
  }


  addMovie(){
  this.movieAdded.emit({
    title: this.title,
    resume: this.resume,
    califications: true

  })
  this.title = '',
  this.resume= ''
   
  }

}
