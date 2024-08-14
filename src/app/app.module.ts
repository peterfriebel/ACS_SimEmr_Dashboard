import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routingComponents } from './app-routing.module';
import { DocumentsComponent } from './documents/documents.component';
import { VisitComponent } from './visit/visit.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultsComponent } from './results/results.component';
import { PlaceHolderComponent } from './place-holder/place-holder.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DocumentsComponent,
    VisitComponent,
    ResultsComponent,
    PlaceHolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
