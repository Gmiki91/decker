import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Deck } from "../models/Deck";
import { environment } from "src/environments/environment";
import { BehaviorSubject, map, filter } from "rxjs";
@Injectable({
    providedIn: 'root'
})


export class DeckService {
    private mockData: Deck[] = (
        [
            {
                id: "1",
                title: "Sajt",
                description: "a deck for different kind of cheese",
                owner: 0,
                favorite: false, cards: [
                    {
                        front: "front1", back: [
                            {text: "back11", confirmed: true},
                            {text: "back12", confirmed: true},
                        ]
                        , confirmed: true
                    },
                    { front: "front2", back: [
                        {text: "back21", confirmed: true},
                        {text: "back22", confirmed: true},
                    ]
                    , confirmed: true },
                ]
            }, {
                id: "2",
                title: "Sajt2",
                owner: 0,
                favorite: false, cards: [
                    { front: "front1", back: [
                        {text: "back1", confirmed: true},
                        {text: "back12", confirmed: true},
                    ]
                    , confirmed: true },
                    { front: "front2", back: [
                        {text: "back21", confirmed: true},
                        {text: "back22", confirmed: true},
                    ]
                    , confirmed: true },
                    { front: "front3", back: [
                            {text: "back31", confirmed: true},
                            {text: "back32", confirmed: false},
                        ]
                        , confirmed: true },
                    { front: "front4", back: [
                            {text: "back41", confirmed: true},
                            {text: "back42", confirmed: true},
                        ]
                        , confirmed: true },
                    { front: "front5", back: [
                            {text: "back51", confirmed: true},
                            {text: "back52", confirmed: false},
                        ]
                        , confirmed: false },
                ]
            }
        ])

    private decks = new BehaviorSubject<Deck[]>([]);
    constructor(private http: HttpClient) { }

    addDeck(deck: Deck): void {
        this.http.post(`${environment.SPRING_URL}/decks/`, deck).subscribe(result => {
            console.log(result);
        })
    }

    updateDecks(isActive: boolean = true) {
        // this.http.get<{ status: string, data: Deck[] }>(`${environment.SPRING_URL}/decks/`)
        //     .subscribe(result => {
        //         if (result.data.length > 0)
        //             this.decks.next(result.data);
        //     })
        // .pipe(
        //     map(decks =>
        //       decks.filter(deck => this.sortActive  ? deck.cards.length >= 50 : deck.cards.length < 50)))
        const data = this.mockData.filter(deck => isActive ? deck.cards.length >= 3 : deck.cards.length < 3);
        this.decks.next(data);
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