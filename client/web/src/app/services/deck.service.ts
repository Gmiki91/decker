import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Deck } from "../models/Deck";
import { environment } from "src/environments/environment";
import { BehaviorSubject, map, filter } from "rxjs";
@Injectable({
    providedIn: 'root'
})


export class DeckService {

    private decks = new BehaviorSubject<Deck[]>([]);
    constructor(private http: HttpClient) { }

    addDeck(deck: Deck): void {
        this.http.post(`${environment.SPRING_URL}/decks/`, deck).subscribe(result => {
            console.log(result);
        })
        // this.mockData.push(deck);
    }

    updateDecks(isActive: boolean = true) {
        this.http.get<{ status: string, data: Deck[] }>(`${environment.SPRING_URL}/decks/`)
            .subscribe(result => {
                if (result.data.length > 0)
                    this.decks.next(result.data);
            })
        // .pipe(
        //     map(decks =>
        //       decks.filter(deck => this.sortActive  ? deck.cards.length >= 50 : deck.cards.length < 50)))
        // const data = this.mockData.filter(deck => isActive ? deck.cards.length >= 3 : deck.cards.length < 3);
        // this.decks.next(data);
    }

    getDecks() {
        return this.decks.asObservable();
    }
    getDeck(id: string) {
        //http call
        return this.decks.pipe(map(decks => {
            return decks
                .find(deck => deck.id === id)
        }))
    }
}