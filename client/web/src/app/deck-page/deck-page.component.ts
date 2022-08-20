import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription,Observable } from 'rxjs';
import { LobbyComponent } from '../components/lobby/lobby.component';
import { Card } from '../models/Card';
import { Deck } from '../models/Deck';
import { DeckService } from '../services/deck.service';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-deck-page',
  templateUrl: './deck-page.component.html',
  styleUrls: ['./deck-page.component.scss']
})
export class DeckPageComponent implements OnInit, OnDestroy {

  deck!: Deck;
  roomList$!:Observable<string[]>;
  acceptedCards: Card[] = [];
  pendingCards: Card[] = [];
  isDeckActive: boolean = false;
  subscription:Subscription = Subscription.EMPTY;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private socketIo:SocketioService,
    private router: Router,
    private dialog:MatDialog, 
    private deckService: DeckService) {

    const routeData = this.router.getCurrentNavigation()!.extras.state;

    // if the deck was selected from the home page, routeData is available 
    // else we get the deck from the url param
    if (routeData) {
      this.init(this.router.getCurrentNavigation()!.extras.state as Deck)
    } else {
      const id = this.activatedRoute.snapshot.params['id'];
      this.subscription=this.deckService.getDeck(id).subscribe(deck => {
        if (deck) {
          this.init(deck);
        }
      });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.socketIo.disconnect();
  }

  onHostRoom():void{
    const roomNr = `${this.deck.title} #${Math.floor(Math.random()*10)}`;
    this.socketIo.createRoom(this.deck.title,roomNr);
    const dialogRef = this.dialog.open(LobbyComponent,{data:roomNr});
    dialogRef.afterClosed().subscribe(() => {this.socketIo.deleteRoom(this.deck.title,roomNr)})
  }

  onJoinRoom(roomNr:string):void{
    this.socketIo.joinRoom(roomNr);
 this.dialog.open(LobbyComponent,{data:roomNr});
  }

  private init(deck:Deck):void{
    this.deck=deck;
    this.isDeckActive = this.deck.cards.length > 3;
    this.acceptedCards = this.deck.cards.filter(card=> card.confirmed)
    this.pendingCards = this.deck.cards.filter(card=> !card.confirmed)
    this.roomList$=this.socketIo.getRoomList()
    this.socketIo.joinDeck(this.deck.title);
  }

}
