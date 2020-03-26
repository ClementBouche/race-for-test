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

  joinRoom(name: string) {
    this.socket.emit('join', {
      room: name,
      username: localStorage.getItem('username')
    });
    this.roomName = name;
  }

  leaveRoom() {
    this.socket.emit('leave', {
      room: this.roomName,
      username: localStorage.getItem('username')
    })
  }
 
  // drawCard(msg: string){
  //     this.socket.emit("message", msg);
  // }

}
