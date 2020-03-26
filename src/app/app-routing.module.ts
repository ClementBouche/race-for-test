import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveRoomComponent } from './leave-room/leave-room.component';
import { DragExchangeComponent } from './drag-exchange/drag-exchange.component';


const routes: Routes = [
  {
    path: 'leave',
    component: LeaveRoomComponent
  },
  {
    path: 'join',
    component: DragExchangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
