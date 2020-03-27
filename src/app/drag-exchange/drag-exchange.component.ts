import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GameService } from '../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-drag-exchange',
  templateUrl: './drag-exchange.component.html',
  styleUrls: ['./drag-exchange.component.css']
})
export class DragExchangeComponent implements OnInit {

  // reserve
  // pile.draw
  // pile.discard
  // pile.vp
  pile: any;

  // to play
  preview = [];

  // player
  // player.vp
  // player.plateau
  // player.hand
  player: any;

  // opponnent
  // opponnent.vp
  // opponnent.plateau
  // opponnent.hand
  opponnent: any;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {

    this.route.paramMap.pipe(
      map((params) => this.gameService.joinRoom(params.get('room')))
    ).subscribe();

    this.gameService.room.subscribe((data) => {
      console.log('room', data);
      this.pile = {
        draw: data.draw,
        discard: data.discard,
        vp: data.stock.vp
      };

      this.player = data.players.find((pl) => pl.username === this.gameService.getUsername());

      this.opponnent = data.players.find((pl) => pl.username !== this.gameService.getUsername());

      this.cd.markForCheck();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('drop', event, event.container, event.container.id);
    if (event.container.id === 'discard') {
      this.discard(event.item.element.nativeElement.id);
    }
    if (event.container.id === 'hand') {
      this.pick(event.item.element.nativeElement.id);
    }
    if (event.container.id === 'plateau') {
      this.play(event.item.element.nativeElement.id);
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  pick(cardid) {
    this.gameService.pick(parseInt(cardid));
  }

  discard(cardid) {
    this.gameService.discard(parseInt(cardid));
  }

  play(cardid) {
    this.gameService.play(parseInt(cardid));
  }

}
