import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Card } from 'src/app/models/Card';
import { Deck } from 'src/app/models/Deck';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-deckform',
  templateUrl: './deckform.component.html',
  styleUrls: ['./deckform.component.scss']
})
export class DeckformComponent implements OnInit {

  // @ViewChild('title') title!: ElementRef;
  // @ViewChild('description') description!: ElementRef;
  title:FormControl =new FormControl("",[Validators.required]);
  description:FormControl =new FormControl();
  isCardFormVisible:boolean = false;
  cards:Card[] = [];
  constructor(private deckService:DeckService) { }

  ngOnInit(): void {
  }
  onSave(): void {
    const title = this.title.value;
    const description = this.description.value;
    const deck: Deck = {
      title, description,owner:2,favorite:false, cards: []
    }
    this.deckService.addDeck(deck);
  }
  showCardForm():void{
    this.isCardFormVisible =  !this.isCardFormVisible;

  }
  saveCard(card:Card):void {
    this.isCardFormVisible=false;
    this.cards.push(card);
  }
}
