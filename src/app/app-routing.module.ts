import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveRoomComponent } from './leave-room/leave-room.component';
import { DragExchangeComponent } from './drag-exchange/drag-exchange.component';
import { LobbyComponent } from './lobby/lobby.component';


const routes: Routes = [
  {
    path: '',
    component: LobbyComponent
  },
  {
    path: 'leave',
    component: LeaveRoomComponent
  },
  {
    path: 'join/:room',
    component: DragExchangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
