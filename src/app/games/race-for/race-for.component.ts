import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { Room } from 'src/app/model/room.model';
import { GameService } from 'src/app/services/game.service';
import { PreviewService } from 'src/app/services/preview.service';

@Component({
  selector: 'app-race-for',
  templateUrl: './race-for.component.html',
  styleUrls: ['./race-for.component.css']
})
export class RaceForComponent implements OnInit, OnChanges {

  @Input() room: Room;

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
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.cardPreview = this.previewService.cardSelection;

    this.gameService.mouseMoved.subscribe((data) => {
      this.opponnentMouse = data['mouse_event'];
      this.cd.markForCheck();
    });
  }

  ngOnChanges() {
    if (this.room) {
      this.pile = {
        draw: this.room.game.reserve.draw,
        discard: this.room.game.reserve.discard,
        vp: this.room.game.reserve.vp
      };
  
      this.player = this.room.game.players.find((pl) => pl.username === this.gameService.getUsername());
  
      this.opponnent = this.room.game.players.find((pl) => pl.username !== this.gameService.getUsername());
    }
  }

  ngAfterViewInit() {
    if (this.plateau) {
      // fromEvent(this.plateau.nativeElement, 'mousemove').pipe(
      //   auditTime(250),
      //   map((e) => this.gameService.mouseMove(e))
      // ).subscribe();
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

      // changement de place === action
      this.doAction({
        target: event.container.id || null,
        from: event.previousContainer.id || null,
        cardid: parseInt(event.item.element.nativeElement.id) || null
      });
    }
  }

  private doAction(msg) {
    this.gameService.doAction(msg);
  }

  closePreview() {
    this.previewService.cardSelection.next(null);
  }

}
