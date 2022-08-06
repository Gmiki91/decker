import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckPageComponent } from './deck-page/deck-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'deck/:id',component:DeckPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
