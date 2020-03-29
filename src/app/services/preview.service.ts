import { Injectable } from '@angular/core';
import { Card } from '../model/card.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  cardSelection: Subject<{card: Card, cover: boolean}> = new Subject<{card: Card, cover: boolean}>();

  currentSelection;

  constructor() { }

  nextCard(card: Card, cover: boolean) {
    if (this.currentSelection == card.id) {
      this.cardSelection.next(null);
      this.currentSelection = null;
    } else {
      this.cardSelection.next({card: card, cover: cover});
      this.currentSelection = card.id;
    }
  }

}
