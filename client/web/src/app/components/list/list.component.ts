import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() title:string;
  @Input() deck:string[];
  constructor() { 
    this.title='';
    this.deck = [];
  }

  ngOnInit(): void {
  }

  onClick(item:string){
    console.log(item);
  }
}
