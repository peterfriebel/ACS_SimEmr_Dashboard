import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/shared-data.service';
import { IOrders } from 'src/orders';
import { Subscription } from 'rxjs';
import { ResultService } from '../result.service';

declare var bootstrap: any;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {

  value: string = '';
  orders: IOrders[] = [];
  private subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private _resultService: ResultService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.subscription = this.sharedDataService.currentData.subscribe(
      data => {
        if (data) {
          this.value = data;
          this.loadDocuments();
        }
      }
    );

       // Initial load using route params
       this.route.params.subscribe(params => {
        this.value = params['value'];
        this.loadDocuments();
      });
  }
  loadDocuments(): void {
    if (this.value) {
      this._resultService.getResults(parseInt(this.value)).subscribe(
        data => this.orders = data,
        error => console.error("Error fetching documents:", error)
      );
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }  

  SetOrderDtm(orderGuid: number, orderDtm: string): void {
    this._resultService.setDate(orderGuid, orderDtm).subscribe({
      next: (response) => {
        // Handle the response if needed
      },
      error: (error) => {
        console.error('Error setting order:', error);
      },
      complete: () => {
        this.showDoneToast();
      }
    });
  }
  showDoneToast() {
    const toastEl = document.getElementById('doneToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}

