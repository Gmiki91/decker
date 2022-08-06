import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Deck } from 'src/app/models/Deck';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-deckform',
  templateUrl: './deckform.component.html',
  styleUrls: ['./deckform.component.scss']
})
export class DeckformComponent implements OnInit {

  @ViewChild('title') title!: ElementRef;
  @ViewChild('description') description!: ElementRef;
  constructor(private deckService:DeckService) { }

  ngOnInit(): void {
  }
  onSave(): void {
    const title = this.title.nativeElement.value;
    const description = this.description.nativeElement.value;
    const deck: Deck = {
      title, description,owner:2,favorite:false, cards: []
    }
    this.deckService.addDeck(deck);
  }
}
