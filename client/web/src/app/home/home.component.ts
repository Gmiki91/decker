import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DeckformComponent } from '../components/deckform/deckform.component';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search:string="";
  toggle:boolean=true;
  
  constructor(private deckService: DeckService,public dialog: MatDialog) {
  }
  ngOnInit(): void {
  }

  toggleChanges(event:MatSlideToggleChange):void{
    this.toggle=event.checked;
    this.deckService.updateDecks(event.checked);

  }
  onNewDeck():void{
    this.dialog.open(DeckformComponent);
  }
}