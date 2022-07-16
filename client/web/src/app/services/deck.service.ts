import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Deck } from "../models/Deck";
import { environment } from "src/environments/environment";
import { Observable,map } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class DeckService {
    constructor(private http: HttpClient) { }

    addDeck(deck:Deck):void{
        this.http.post(`${environment.url}/decks/`,  deck ).subscribe(result=>{
            console.log(result);
        })
    }

    getDecks():Observable<Deck[]>{
        return this.http.get<{status:string, data:Deck[]}>(`${environment.url}/decks/`).pipe(map(result=>result.data));
    }
}