import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/models/Card';
import { Answer } from 'src/app/models/Answer';
@Component({
  selector: 'app-cardform',
  templateUrl: './cardform.component.html',
  styleUrls: ['./cardform.component.scss']
})
export class CardformComponent implements OnInit {

  @Output() cardEmitter: EventEmitter<Card> = new EventEmitter();
  error: boolean = false;

  form: FormGroup = new FormGroup({
    question: new FormControl("", [Validators.required, Validators.minLength(3)]),
  });
  answers: string[] = [''];

  ngOnInit(): void {
  }

  onAnswerChange(text: string, i: number, event: KeyboardEvent): void {
    if (event.code !== 'Tab') {
      console.log(event);
      if (text.trim().length > 0) {
        //new answer
        if (i === this.answers.length - 1) {
          this.answers.push(text.trim());
        }
      } else {
        this.answers.splice(i, 1);
      }
    }
  }

  onSave(): void {
    const question = this.form.controls['question'].value;
    //removing first empty element
    this.answers.shift();
    const answers: Answer[] = this.answers.map((answer: string) => {
      return { text: answer, confirmed: true }
    });
    const card: Card = {
      front: question,
      back: answers,
      confirmed: true
    }
    this.cardEmitter.emit(card);
  }

  getErrorMessage(): string {
    if (this.form.controls['question'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.controls['question'].hasError('minlength') ? 'Min lenght is 3 characters' : 'Error';
  }

}
