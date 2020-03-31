import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { GameService } from '../services/game.service';
import { Observable } from 'rxjs';
import { Room } from '../model/room.model';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})
export class GameRoomComponent implements OnInit {

  room$: Observable<Room>;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

    this.route.paramMap.pipe(
      map((params) => this.gameService.joinRoom(params.get('room')))
    ).subscribe();

    this.room$ = this.gameService.room.pipe(
      map(data => {
        console.log('game_state', data);
        return data;
      })
    );
  }

}
