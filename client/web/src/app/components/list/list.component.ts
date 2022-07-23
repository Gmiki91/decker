import { Component, Input, OnInit } from '@angular/core';
import { Deck } from 'src/app/models/Deck';
import { Card } from 'src/app/models/Card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() decks!:Deck[];


  constructor(private cardService:CardService){}
  ngOnInit(): void {
    this.cardService.getCards().subscribe(cards=>console.log(cards))
  }

  onClick(deck:Deck){
    const card :Card={
      front:`question${deck.cards.length+1}`,
      back:`answer${deck.cards.length+1}`,
    }
    this.cardService.addCard(card,deck.id!)
  }

  onLog(deck:Deck){
    this.cardService.updateCardsById(deck.id!);
  }
}
