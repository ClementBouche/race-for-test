import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';

import { Room } from 'src/app/model/room.model';
import { GameService } from 'src/app/services/game.service';
import { Card } from 'src/app/model/card.model';
import { PreviewService } from 'src/app/services/preview.service';

@Component({
  selector: 'app-star-rea',
  templateUrl: './star-rea.component.html',
  styleUrls: ['./star-rea.component.css']
})
export class StarReaComponent implements OnInit {

  @Input() room: Room;

  @ViewChild('plateau') plateau: ElementRef;

  // reserve.draw
  // reserve.discard
  // reserve.market
  reserve: any;

  // player
  // player.hand
  // player.draw
  // player.discard
  player: any;

  // opponnent
  // opponnent.hand
  // opponnent.draw
  // opponnent.discard
  opponnent: any;

  cardPreview: Subject<{
    card: Card;
    cover: string;
  }>;

  showDiscard: string = '';

  constructor(
    private gameService: GameService,
    private previewService: PreviewService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.cardPreview = this.previewService.cardSelection;
  }

  ngOnChanges() {
    if (this.room) {
      this.reserve = this.room.game.reserve;
  
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

      this.doAction({
        target: event.container.id || null,
        from: event.previousContainer.id || null,
        cardid: parseInt(event.item.element.nativeElement.id)
      });
    }
  }

  private doAction(msg) {
    this.gameService.doAction(msg);
  }

  closePreview() {
    this.previewService.cardSelection.next(null);
  }

  displayDiscard() {
    if (this.showDiscard === '') {
      this.showDiscard = 'player';
      return;
    }
    if (this.showDiscard === 'player') {
      this.showDiscard = 'opponnent';
      return;
    }
    if (this.showDiscard === 'opponnent') {
      this.showDiscard = '';
      return;
    }
  }

}
