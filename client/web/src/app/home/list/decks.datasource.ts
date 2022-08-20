import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { Deck } from "src/app/models/Deck";
import { DeckService } from "src/app/services/deck.service";
export class DeckDataSource implements DataSource<Deck> {
    private dekcsSubject = new BehaviorSubject<Deck[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private deckService: DeckService) {}

    connect(collectionViewer: CollectionViewer): Observable<Deck[]> {
        return this.dekcsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dekcsSubject.complete();
        this.loadingSubject.complete();
    }

    loadLessons() {
        this.loadingSubject.next(true);
        this.deckService.getDecks().pipe(catchError(() => of([])))
            .subscribe(decks => {
                this.dekcsSubject.next(decks);
                this.loadingSubject.next(false)
            });
        this.deckService.updateDecks();
    }
}