import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { Card } from "../models/Card";
@Injectable({
    providedIn: 'root'
})
export class CardService {
    private cards = new BehaviorSubject<Card[]>([]);
    constructor(private http: HttpClient) { }

    addCard(card: Card,deckId: string) : void {
        this.http.post(`${environment.SERVER_URL}/cards/${deckId}`, card).subscribe(result => {
        })
    }

    updateCardsById(deckId:string) {
        this.http.get<{status:string, data:Card[]}>(`${environment.SERVER_URL}/cards/${deckId}`)
            .subscribe(result => {
                if (result.data.length > 0)
                    this.cards.next(result.data);
            })
    }

    getCards() {
        return this.cards.asObservable();
    }
}