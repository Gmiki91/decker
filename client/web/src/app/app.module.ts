import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module'

import { AppComponent } from './app.component';
import { ListComponent } from './home/list/list.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AnchorComponent } from './header/anchor/anchor.component';
import { DeckformComponent } from './components/deckform/deckform.component';
import { DeckPageComponent } from './deck-page/deck-page.component';
import { CardformComponent } from './components/cardform/cardform.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HomeComponent,
    HeaderComponent,
    DeckformComponent,
    AnchorComponent,
    DeckPageComponent,
    CardformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
