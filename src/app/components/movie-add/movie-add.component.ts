import { Component, OnInit } from '@angular/core';
import { Modifications } from 'src/app/models/modifications';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {
  title: string | undefined;
  description: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }


  addMovie(){
    debugger;
   console.log(this.title, this.description);
   
  }

}
