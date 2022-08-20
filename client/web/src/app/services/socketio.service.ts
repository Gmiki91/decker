import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;
  roomList: BehaviorSubject<string[]> = new BehaviorSubject(['']);
  userList: BehaviorSubject<string[]> = new BehaviorSubject(['']);
  constructor() { }

  joinDeck(deckTitle: string) {
    if (!this.socket) {
      this.socket = io(environment.SERVER_URL);
    }
    this.socket.emit('join_deck', deckTitle);
    this.listenToDeck();
    
  }

  createRoom(deckTitle: string, roomNr: string) {
    this.listenToLobby();
    if (!this.socket) {
      this.socket = io(environment.SERVER_URL);
    }
    this.socket.emit('create_room', { deckTitle, roomNr });
  }

  deleteRoom(deckTitle: string, roomNr: string) {
    this.socket.emit('delete_room', { deckTitle, roomNr });
  }

  joinRoom(roomNr: string) {
    this.listenToLobby();
    this.socket.emit('join_room', roomNr);
  }

  getRoomList() {
    return this.roomList.asObservable();
  }

  getUserList() {
    return this.userList.asObservable();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private listenToDeck(): void {
    this.socket.on("room_list", (roomList: string[]) => {
      if (Array.isArray(roomList))
        this.roomList.next(roomList);
    });
  }

  private listenToLobby(): void {
    this.socket.on("user_list", (userList: string[]) => {
      if (Array.isArray(userList)) {
        this.userList.next(userList);
      }
    });
  }
}
