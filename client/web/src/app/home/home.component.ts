import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


list1 = ['Alma', 'Körte', 'Barack'];
list2 = ['Dinnye', 'Cseresznye'];
list3 = ['Banán', 'Szilva'];

constructor(private router:Router){}
sajt() {
  this.router.navigate(['/new-deck'])
}
}