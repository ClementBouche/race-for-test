import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragTestComponent } from './drag-test/drag-test.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SimpleDragComponent } from './simple-drag/simple-drag.component';
import {MatCardModule} from '@angular/material/card';
import { DragListComponent } from './drag-list/drag-list.component';
import { DragExchangeComponent } from './drag-exchange/drag-exchange.component'; 
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
 

import {MatGridListModule} from '@angular/material/grid-list';
import { BackgroundImageDirective } from './directives/background-image.directive';
import { LeaveRoomComponent } from './leave-room/leave-room.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    DragDropModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
