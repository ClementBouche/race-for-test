import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../services/game.service';
import { Room } from '../model/room.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  rooms: Room[];

  username;

  constructor(
    private gameService: GameService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.rooms = this.gameService.getRooms();

    this.gameService.rooms.subscribe((data) => {
      this.rooms = data;
      this.gameService.setRooms(data);

      this.cd.markForCheck();
    });

    if (localStorage.getItem('username') === null) {
    } else {
      this.username = localStorage.getItem('username');
    }
  }

  newRoom(game: string) {
    this.gameService.createRoom(game);
  }

  deleteRoom(name) {
    this.gameService.deleteRoom(name);
  }

  deleteRooms() {
    this.gameService.deleteAll();
  }

}
