import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDeckFormComponent } from './components/new-deck-form/new-deck-form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'new-deck',component:NewDeckFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
