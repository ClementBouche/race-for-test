import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragTestComponent } from './drag-test/drag-test.component';
import { SimpleDragComponent } from './simple-drag/simple-drag.component';
import { DragListComponent } from './drag-list/drag-list.component';
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

import { BackgroundImageDirective } from './directives/background-image.directive';
import { LeaveRoomComponent } from './leave-room/leave-room.component';
import { LobbyComponent } from './lobby/lobby.component';

const config: SocketIoConfig = { url: 'http://localhost:4040', options: {} };
 
@NgModule({
  declarations: [
    AppComponent,
    DragTestComponent,
    SimpleDragComponent,
    DragListComponent,
    DragExchangeComponent,
    BackgroundImageDirective,
    LeaveRoomComponent,
    LobbyComponent,
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
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
