import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from '../models/Deck';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  list1: Deck[];
  // list2 = ['Dinnye', 'Cseresznye'];
  // list3 = ['Banán', 'Szilva'];

  constructor(private router: Router, private deckService: DeckService) {
    this.list1 = [];
  }
  ngOnInit(): void {
    this.deckService.getDecks().subscribe(decks => {
      console.log(decks)
      this.list1 = decks;
    })
  }

  sajt() {
    this.router.navigate(['/new-deck'])
  }
}