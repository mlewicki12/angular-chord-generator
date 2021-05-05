import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChordMenuComponent } from './components/pages/chord/chord-menu/chord-menu.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'chords', component: ChordMenuComponent},
  {path: '', redirectTo: '/chords', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
