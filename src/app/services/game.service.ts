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

  rooms = this.socket.fromEvent<Room[]>('rooms').pipe(
    map((data) => data.map((item) => new Room().deserialize(item)))
  );

  mouseMoved = this.socket.fromEvent<any>('mouse_moved').pipe(
    map((data) => data)
  );

  private rooms__: Room[];

  private idRoom: string;

  constructor(
    private socket: Socket
  ) { }

  getUsername() {
    return localStorage.getItem('username');
  }

  // rooms controller

  getRooms() {
    return this.rooms__;
  }

  setRooms(rooms) {
    this.rooms__ = rooms;
  }

  createRoom(game: string) {
    this.socket.emit('create', {
      username: this.getUsername(),
      game: game
    });
  }

  deleteRoom(idRoom) {
    this.socket.emit('delete', {
      username: this.getUsername(),
      room: idRoom
    });
  }

  deleteAll() {
    this.socket.emit('delete_all', {
      username: this.getUsername()
    });
  }

  joinRoom(id: string) {
    this.socket.emit('join', {
      room: id,
      username: this.getUsername()
    });
    this.idRoom = id;
  }

  // game controller

  doAction(msg) {
    const action = Object.assign(msg, {
      room: this.idRoom,
      username: this.getUsername(),
    });
    this.socket.emit('game_action', action);
  }

  mouseMove(event) {
    this.socket.emit('move', {
      room: this.idRoom,
      username: this.getUsername(),
      mouse_event: {
        x: event.clientX,
        y: event.clientY
      }
    });
  }

}
