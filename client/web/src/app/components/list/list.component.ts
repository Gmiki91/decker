import { Component, Input, OnInit } from '@angular/core';
import { Deck } from 'src/app/models/Deck';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() decks!:Deck[];

  ngOnInit(): void {
  }

  onClick(deck:Deck){
    console.log(deck);
  }
}
