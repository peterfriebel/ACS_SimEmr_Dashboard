import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { DocumentsComponent } from './documents/documents.component';
import { ResultsComponent } from './results/results.component';
import { PlaceHolderComponent } from './place-holder/place-holder.component';

const routes: Routes = [
  {path: 'orders', component: OrdersComponent},
  {path: 'documents/:value', component : DocumentsComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'place-holder', component: PlaceHolderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [OrdersComponent,DocumentsComponent,ResultsComponent,PlaceHolderComponent];