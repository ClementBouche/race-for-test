import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { GameService } from '../services/game.service';
import { Room } from '../model/room.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {

  rooms: Room[];

  username;

  private subscription: Subscription;

  constructor(
    private gameService: GameService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.rooms = this.gameService.getRooms();
    this.cd.markForCheck();

    this.subscription = this.gameService.rooms.subscribe((data) => {
      this.rooms = data;
      this.gameService.setRooms(data);
      console.log('rooms', data);
      this.cd.markForCheck();
    });

    if (localStorage.getItem('username') === null) {
    } else {
      this.username = localStorage.getItem('username');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
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
