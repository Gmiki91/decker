import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Deck } from 'src/app/models/Deck';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() active!:boolean;
  subscriptions: Subscription = Subscription.EMPTY;
  updatedAt:"Last played" | "Last updated" = "Last played";
  displayedColumns = ["title", "owner","status", "updatedAt","favorite"];
  dataSource!:Deck[];
  loading:boolean = false;
  constructor(private router: Router, private deckService:DeckService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.updatedAt = this.active ?  "Last played" : "Last updated";    
  }
  
  ngOnInit(): void {
    this.loading=true;
   this.subscriptions =  this.deckService.getDecks()
    .subscribe(decks=>{
      this.dataSource=decks;
      this.loading=false;
    })
    this.deckService.updateDecks();
  }

  ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }
  onRowClick(deck:Deck){
    this.router.navigate([`/deck/${deck._id}`], { state: deck })
  }

}
