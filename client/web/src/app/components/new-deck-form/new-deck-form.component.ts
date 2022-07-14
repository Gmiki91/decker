import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/app/models/Card';

@Component({
  selector: 'app-new-deck-form',
  templateUrl: './new-deck-form.component.html',
  styleUrls: ['./new-deck-form.component.scss']
})
export class NewDeckFormComponent implements OnInit {

  @ViewChild('title') title!: ElementRef;
  @ViewChild('description') description!: ElementRef;
  @ViewChild('question') question!: ElementRef;
  @ViewChild('answer') answer!: ElementRef;
  _cards:Card[];

  constructor() { 
    this._cards=[];
  }

  ngOnInit(): void {
  }

  onAddCard(): void {
    const question = this.question.nativeElement.value.toLowerCase().trim();
    const answer = this.answer.nativeElement.value.toLowerCase().trim();
    if (question!== '' && answer!== '') {
      this._cards.push({question, answer});
    }
  }

  onSave():void{
    console.log(this._cards);
    console.log(this.title.nativeElement.value);
  }

}
