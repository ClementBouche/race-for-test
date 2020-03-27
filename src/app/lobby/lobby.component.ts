import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  
  rooms: String[];

  constructor(
    private gameService: GameService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.rooms = this.gameService.getRooms();

    this.gameService.rooms.subscribe((data) => {
      console.log('room received', data);
      this.rooms = data;
      this.gameService.setRooms(data);

      this.cd.markForCheck();
    });
  }

}
