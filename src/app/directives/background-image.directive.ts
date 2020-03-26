import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBackgroundImage]'
})
export class BackgroundImageDirective implements OnInit {

  @Input('appBackgroundImage') image: string;

  @Input('appBackgroundSprite') sprite: number[];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = `grey`;
    this.el.nativeElement.style.backgroundImage = `url(${this.image})`;
    if (this.sprite) {
      const x = 1 - this.sprite[0] * 112;
      const y =     this.sprite[1] * 160;
      this.el.nativeElement.style.backgroundPosition = `${x}px ${y}px`;
    } else {
      this.el.nativeElement.style.backgroundSize = 'contain';
      this.el.nativeElement.style.backgroundRepeat = 'no-repeat';
    }
  }

}
