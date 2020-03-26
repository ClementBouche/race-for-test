import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';

const usernames = [
  'Cléopatre', 
  'Vercingétorix',
  'Pikachu',
  'Dauphin de Martinique',
  'PhillipOdile',
  'Poussin doré',
  'Disco éléphant',
  'Girage trapéziste'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  username: string;

  constructor(
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    if (!window.localStorage) {
      //
      alert('Votre navigateur ne permet pas d\'acceder au localStorage')
    }
    if (localStorage.getItem('username') === null) {
      const name = usernames[Math.floor(Math.random() * usernames.length)];
      localStorage.setItem('username', name);
      this.username = name;
    } else {
      this.username = localStorage.getItem('username');
    }
    this.cd.markForCheck();
  }

}
