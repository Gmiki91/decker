import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Deck } from "../models/Deck";
import { environment } from "src/environments/environment";
import { BehaviorSubject, map, Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})


export class DeckService {

    private decks = new BehaviorSubject<Deck[]>([]);
    constructor(private http: HttpClient) { }

    addDeck(deck: Deck): void {
        this.http.post(`${environment.SERVER_URL}/decks/`, deck).subscribe(result => {
        })
    }

    updateDecks(isActive: boolean = true) {
        this.http.get<{ status: string, data: Deck[] }>(`${environment.SERVER_URL}/decks/`)
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
    
    getDeck(id: string): Observable<Deck> {
        return this.http.get<{ status: string, data: Deck }>(`${environment.SERVER_URL}/decks/${id}`).pipe(map(result => {
            if (result.status === 'success')
                return result.data;
            return {} as Deck;
        }))
    }
}