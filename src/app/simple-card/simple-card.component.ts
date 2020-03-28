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

  @Input() cover: boolean = false;

  @Input() isPreview: boolean = false;

  backgroundImage: string;

  backgroundSprite: number[];

  constructor(
    private previewService: PreviewService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.card) {
      this.backgroundImage = this.cover ? 'assets/rftg/rftg_50q_7.jpg' : this.card.image;
      this.backgroundSprite = this.cover ? [1, 1] : this.card.sprite;
    }
  }

  preview() {
    this.previewService.nextCard(this.card, this.cover);
  }

}
