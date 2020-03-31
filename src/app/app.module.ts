import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragExchangeComponent } from './drag-exchange/drag-exchange.component'; 
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// material
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon'; 

import { BackgroundImageDirective } from './directives/background-image.directive';
import { LobbyComponent } from './lobby/lobby.component';
import { OpponentMouseDirective } from './directives/opponent-mouse.directive';
import { SimpleCardComponent } from './simple-card/simple-card.component';
import { environment } from 'src/environments/environment';
import { PlayerStatusComponent } from './player-status/player-status.component';
import { RaceForComponent } from './games/race-for/race-for.component';
import { StarReaComponent } from './games/star-rea/star-rea.component';
import { GameRoomComponent } from './game-room/game-room.component';


const config: SocketIoConfig = { url: environment.socket, options: {} };
 
@NgModule({
  declarations: [
    AppComponent,
    DragExchangeComponent,
    BackgroundImageDirective,
    LobbyComponent,
    OpponentMouseDirective,
    SimpleCardComponent,
    PlayerStatusComponent,
    RaceForComponent,
    StarReaComponent,
    GameRoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    DragDropModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
