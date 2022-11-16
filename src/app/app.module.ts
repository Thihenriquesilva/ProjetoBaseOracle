import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { PrevisoesComponent } from './previsoes/previsoes.component';

import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MenuModule} from 'primeng/menu';



@NgModule({
  declarations: [
    AppComponent,
    PrevisoesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TabViewModule,
    ButtonModule,
    TableModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
