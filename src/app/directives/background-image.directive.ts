import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBackgroundImage]'
})
export class BackgroundImageDirective implements OnInit {

  @Input('appBackgroundImage') image: string;

  @Input('appBackgroundSprite') sprite: number[];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    console.log(this.el);
    console.log(this.image);
    console.log(this.sprite);
    this.el.nativeElement.style.backgroundColor = `grey`;
    this.el.nativeElement.style.backgroundImage = `url(${this.image})`;
    const x = 1 - this.sprite[0] * 112;
    const y =     this.sprite[1] * 160;
    this.el.nativeElement.style.backgroundPosition = `${x}px ${y}px`;
  }

}
