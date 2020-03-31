import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GameService } from '../services/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, auditTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { PreviewService } from '../services/preview.service';

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

  cardPreview;

  constructor(
    private gameService: GameService,
    private previewService: PreviewService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {

    this.cardPreview = this.previewService.cardSelection;

    this.route.paramMap.pipe(
      map((params) => this.gameService.joinRoom(params.get('room')))
    ).subscribe();

    this.gameService.room.subscribe((data) => {

      this.pile = {
        draw: data.game.reserve.draw,
        discard: data.game.reserve.discard,
        vp: data.game.reserve.vp
      };

      this.player = data.game.players.find((pl) => pl.username === this.gameService.getUsername());

      this.opponnent = data.game.players.find((pl) => pl.username !== this.gameService.getUsername());

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
    }
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

  closePreview() {
    this.previewService.cardSelection.next(null);
  }

}
