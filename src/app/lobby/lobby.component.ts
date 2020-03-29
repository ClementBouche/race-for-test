import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  rooms: String[];

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

  newRoom() {
    this.gameService.createRoom();
  }

  deleteRooms() {
    this.gameService.leaveAll();
  }

}
