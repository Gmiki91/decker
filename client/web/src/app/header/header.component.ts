import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDeckComponent } from '../components/create-deck/create-deck.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  onNewDeck(): void {
    const dialogRef = this.dialog.open(CreateDeckComponent);
    // dialogRef.afterClosed().subscribe(rate => {
    //   if (rate !== undefined) {
    //     this.storyService.rateLevel(this.story._id, rate)
    //   }
    // });
  }

}

