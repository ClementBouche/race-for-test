import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-drag-exchange',
  templateUrl: './drag-exchange.component.html',
  styleUrls: ['./drag-exchange.component.css']
})
export class DragExchangeComponent implements OnInit {

  room: string = 'partie-1';

  draw = [];

  discard = [];

  preview = [];

  board = [];

  hand = [];

  constructor(
    private gameService: GameService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.gameService.joinRoom(this.room);

    this.gameService.room.subscribe((data) => {
      console.log(data);
      this.draw = data.draw;
      this.draw = data.draw;
      this.discard = data.discard;

      this.cd.markForCheck();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  pick() {

  }

  renew() {
    this.draw = this.draw.concat(this.discard);
    this.discard = [];
    this.shuffle(this.draw);
  }

  shuffle(array__: any[]) {
    for (let i = array__.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array__[i], array__[j]] = [array__[j], array__[i]];
    }
  }

}
