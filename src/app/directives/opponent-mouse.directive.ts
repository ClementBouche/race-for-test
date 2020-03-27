import { Directive, OnInit, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appOpponentMouse]'
})
export class OpponentMouseDirective implements OnChanges {

  @Input('appOpponentMouse') mouseMove: any;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('appOpponentMouse', this.mouseMove);
    if (this.mouseMove) {
      this.el.nativeElement.style.left = `${this.mouseMove.x}px`;
      this.el.nativeElement.style.top = `${this.mouseMove.y}px`;
    }
  }

}
