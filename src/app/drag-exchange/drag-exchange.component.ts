import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GameService } from '../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, auditTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-drag-exchange',
  templateUrl: './drag-exchange.component.html',
  styleUrls: ['./drag-exchange.component.css']
})
export class DragExchangeComponent implements OnInit, AfterViewInit {

  @ViewChild('plateau') plateau: ElementRef;

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

  opponnentMouse: any;

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
      this.pile = {
        draw: data.draw,
        discard: data.discard,
        vp: data.stock.vp
      };

      this.player = data.players.find((pl) => pl.username === this.gameService.getUsername());

      this.opponnent = data.players.find((pl) => pl.username !== this.gameService.getUsername());

      this.cd.markForCheck();
    });


    this.gameService.mouseMoved.subscribe((data) => {
      this.opponnentMouse = data['mouse_event'];
      this.cd.markForCheck();
    });
  }

  ngAfterViewInit() {
    if (this.plateau) {
      fromEvent(this.plateau.nativeElement, 'mousemove').pipe(
        auditTime(250),
        map((e) => this.gameService.mouseMove(e))
      ).subscribe();
    } else {
      console.log('no subscribe');
    }
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
