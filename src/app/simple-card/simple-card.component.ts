import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Card } from '../model/card.model';
import { PreviewService } from '../services/preview.service';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.css']
})
export class SimpleCardComponent implements OnChanges {

  @Input() card: Card;

  @Input() dragDisable: boolean = false;

  @Input() cover: string;

  @Input() isPreview: boolean = false;

  @Input() mode: string;

  backgroundImage: string;

  backgroundSprite: number[];

  constructor(
    private previewService: PreviewService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.card) {
      this.backgroundImage = this.cover ? this.cover : this.card.image;
      this.backgroundSprite = this.cover ? null : this.card.sprite;
    }
  }

  preview() {
    this.previewService.nextCard(this.card, this.cover);
  }

}
