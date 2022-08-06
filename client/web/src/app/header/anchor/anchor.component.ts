import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anchor',
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.scss']
})
export class AnchorComponent implements OnInit {

  @Input() img!:string;
  @Input() route!:string;
  constructor() { }

  ngOnInit(): void {
  }

}
