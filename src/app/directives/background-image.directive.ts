import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

const deltaX = [[-9, 7, 20], [-15, 15, 40]];
const deltaY = [[-11, 13, 30], [-23, 25, 55]];

@Directive({
  selector: '[appBackgroundImage]'
})
export class BackgroundImageDirective implements OnChanges {

  @Input('appBackgroundImage') image: string;

  @Input('appBackgroundSprite') sprite: number[];

  @Input('appBackgroundPreview') previewed: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    // this.el.nativeElement.style.backgroundColor = `grey`;
    this.el.nativeElement.style.backgroundImage = `url(${this.image})`;
    // reset
    this.el.nativeElement.style.backgroundPosition = 'inherit';
    this.el.nativeElement.style.backgroundSize = 'inherit';
    this.el.nativeElement.style.backgroundRepeat = 'inherit';

    if (this.sprite) {
      const x = this.previewed ? 
          this.sprite[0] + '00% + ' + deltaX[1][this.sprite[0]] + 'px' :
          this.sprite[0] + '00% + ' + deltaX[0][this.sprite[0]] + 'px'
      ;
      const y =  this.previewed ? 
          this.sprite[1] + '00% + ' + deltaY[1][this.sprite[1]] + 'px' : 
          this.sprite[1] + '00% + ' + deltaY[0][this.sprite[1]] + 'px'
      ;
      this.el.nativeElement.style.backgroundPosition = `calc(${x}) calc(${y})`;
    } else {
      this.el.nativeElement.style.backgroundSize = 'contain';
      this.el.nativeElement.style.backgroundRepeat = 'no-repeat';
    }
  }

}
