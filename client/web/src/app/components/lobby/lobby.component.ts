import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

 
  playerList$!:Observable<string[]>;
  constructor(private socketIo:SocketioService,
    public dialogRef: MatDialogRef<LobbyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  ngOnInit(): void {
    this.playerList$ = this.socketIo.getUserList();
  }
 

}
