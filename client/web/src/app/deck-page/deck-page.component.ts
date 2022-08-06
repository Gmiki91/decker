import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from '../models/Card';
import { Deck } from '../models/Deck';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-deck-page',
  templateUrl: './deck-page.component.html',
  styleUrls: ['./deck-page.component.scss']
})
export class DeckPageComponent implements OnInit {

  deck!: Deck;
  acceptedCards: Card[] = [];
  pendingCards: Card[] = [];
  isDeckActive: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private deckService: DeckService) {
    const routeData = this.router.getCurrentNavigation()!.extras.state;
    if (routeData) {
      this.init(this.router.getCurrentNavigation()!.extras.state as Deck)
    } else {
      const id = this.activatedRoute.snapshot.params['id'];
      this.deckService.getDeck(id).subscribe(deck => {
        if (deck) {
          this.init(deck);
        }
      });
    }
  }

  ngOnInit(): void {

    this.deckService.updateDecks();
  }

  private init(deck:Deck):void{
    this.deck=deck;
    this.isDeckActive = this.deck.cards.length > 3;
    this.acceptedCards = this.deck.cards.filter(card=> card.confirmed)
    this.pendingCards = this.deck.cards.filter(card=> !card.confirmed)
  }

}
