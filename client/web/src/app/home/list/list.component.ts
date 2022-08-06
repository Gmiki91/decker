import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from 'src/app/models/Deck';
import { CardService } from 'src/app/services/card.service';
import { DeckService } from 'src/app/services/deck.service';
import { DeckDataSource } from './decks.datasource';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

  @Input() decks!:Deck[];
  @Input() active!:boolean;
  updatedAt:"Last played" | "Last updated" = "Last played";
  displayedColumns = ["title", "owner","status", "updatedAt","favorite"];
  dataSource!: DeckDataSource;
  constructor(private router: Router, private cardService:CardService, private deckService:DeckService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.updatedAt = this.active ?  "Last played" : "Last updated";    
  }
  
  ngOnInit(): void {
    // this.cardService.getCards().subscribe(cards=>console.log(cards))
    this.dataSource = new DeckDataSource(this.deckService);
    this.dataSource.loadLessons();
  }

  onRowClick(deck:Deck){
    this.router.navigate([`/deck/${deck.id}`], { state: deck })
   
  }
 
  onStoryClicked(): void {
  
  }
}
