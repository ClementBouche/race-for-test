import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-leave-room',
  templateUrl: './leave-room.component.html',
  styleUrls: ['./leave-room.component.css']
})
export class LeaveRoomComponent implements OnInit {

  constructor(
    private service: GameService
  ) { }

  ngOnInit(): void {
    this.service.leaveRoom();
  }

}
