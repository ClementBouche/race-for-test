import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Card } from '../model/card.model';
import { Room } from '../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  room = this.socket.fromEvent<Room>('room_state').pipe(
    map((data) => new Room().deserialize(data))
  );

  private roomName: string;

  constructor(
    private socket: Socket
  ) { }

  getUsername() {
    return localStorage.getItem('username');
  }

  joinRoom(name: string) {
    this.socket.emit('join', {
      room: name,
      username: this.getUsername()
    });
    this.roomName = name;
  }

  leaveRoom() {
    this.socket.emit('leave', {
      room: this.roomName,
      username: this.getUsername()
    });
  }
  
  pick(cardid: number) {
    this.socket.emit('draw', {
      room: this.roomName,
      username: this.getUsername(),
      cardid: cardid
    });
  }

  discard(cardid: number) {
    this.socket.emit('discard', {
      room: this.roomName,
      username: this.getUsername(),
      cardid: cardid
    });
  }

  play(cardid: number) {
    this.socket.emit('play', {
      room: this.roomName,
      username: this.getUsername(),
      cardid: cardid
    });
  }

}
