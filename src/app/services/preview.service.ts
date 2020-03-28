import { Injectable } from '@angular/core';
import { Card } from '../model/card.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  cardSelection: Subject<{card: Card, cover: boolean}> = new Subject<{card: Card, cover: boolean}>();

  constructor() { }

  nextCard(card: Card, cover: boolean) {
    this.cardSelection.next({card: card, cover: cover});
  }

}
