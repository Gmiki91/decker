import { Component, OnInit } from '@angular/core';
import { Observable, map, filter } from 'rxjs';
import { Deck } from '../models/Deck';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list!: Deck[];
  currentSort: 'active' | 'inactive';
  constructor(private deckService: DeckService) {
    this.currentSort = 'active';
  }
  ngOnInit(): void {
    this.deckService.getDecks().pipe(
      map(decks =>
        decks.filter(deck => this.currentSort == 'active' ? deck.cards.length >= 50 : deck.cards.length < 50)))
      .subscribe(decks => this.list = decks)
    this.deckService.updateDecks();
  }

  toggleSort(): void {
    this.currentSort = this.currentSort === 'active' ? 'inactive' : 'active';
    this.deckService.updateDecks();
  }
}