import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-deck',
  template: `<app-deckform></app-deckform>
  <app-cardform></app-cardform>`,
})
export class NewDeckComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
