import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Room } from '../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  room = this.socket.fromEvent<Room>('room_state').pipe(
    map((data) => new Room().deserialize(data))
  );

  rooms = this.socket.fromEvent<String[]>('rooms').pipe(
    map((data) => data)
  );

  mouseMoved = this.socket.fromEvent<any>('mouse_moved').pipe(
    map((data) => data)
  );

  private rooms__: String[];

  private roomName: string;

  constructor(
    private socket: Socket
  ) { }

  getUsername() {
    return localStorage.getItem('username');
  }

  getRooms() {
    return this.rooms__;
  }

  setRooms(rooms) {
    this.rooms__ = rooms;
  }


  createRoom() {
    this.socket.emit('create', {
      username: this.getUsername()
    });
  }


  leaveAll() {
    console.log('leaveall');
    this.socket.emit('leave_all', {
      username: this.getUsername()
    });
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

  mouseMove(event) {
    console.log(event);
    this.socket.emit('move', {
      room: this.roomName,
      username: this.getUsername(),
      mouse_event: {
        x: event.clientX,
        y: event.clientY
      }
    });
  }

}
