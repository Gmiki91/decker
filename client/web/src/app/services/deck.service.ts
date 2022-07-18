import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Deck } from "../models/Deck";
import { environment } from "src/environments/environment";
import { Observable,map,BehaviorSubject } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class DeckService {
    private decks=new BehaviorSubject<Deck[]>([]);
    constructor(private http: HttpClient) { }

    addDeck(deck:Deck):void{
        this.http.post(`${environment.url}/decks/`,  deck ).subscribe(result=>{
            console.log(result);
        })
    }

    updateDecks(){
        this.http.get<{status:string, data:Deck[]}>(`${environment.url}/decks/`)
        .subscribe(result=>this.decks.next(result.data));
    }
    getDecks(){
        return this.decks.asObservable();
    }
}