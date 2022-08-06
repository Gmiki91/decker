import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable, map, filter } from 'rxjs';
import { Deck } from '../models/Deck';
import { DeckService } from '../services/deck.service';
import { NewDeckComponent } from './new-deck.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list!: Deck[];
  search:string="";
  toggle:boolean=true;
  
  constructor(private deckService: DeckService,public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.deckService.getDecks()
      .subscribe(decks =>{this.list = decks; console.log(this.list)})
    this.deckService.updateDecks();
  }

  toggleChanges(event:MatSlideToggleChange):void{
    this.toggle=event.checked;
    this.deckService.updateDecks(event.checked);

  }
  onNewDeck():void{
    this.dialog.open(NewDeckComponent);
  }
}