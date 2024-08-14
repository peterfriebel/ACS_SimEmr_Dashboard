import { Component } from '@angular/core';
import { IClient } from './Client';
import { ClientService } from 'src/client.service';
import { SharedDataService } from 'src/shared-data.service';
import { IOrders } from 'src/orders';
import { VisitService } from './visit.service';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'ACS_SimEmr_Dashboard';
  clientDetails: IClient[] = [];
  clientDetail: IClient = {clientName: '', clientMRN: '', clientDOB: '', clientHeight: '', clientWeight: '', location: '', admitDate: ''};
  orders: IOrders[] = [];
  singleOrder: IOrders = {OrderName: '', OrderDtm: '', OrderGuid: 0}; 
  selectedVisitGuid: string = '';
  currentDateTime: string = this.formatDateTimeLocal(new Date());
  visitGuid: any = 'default';

  constructor(
    private _clientService: ClientService,
    private _visitService: VisitService,
    private sharedDataService: SharedDataService
  ) {}

  GetSelectedVisit(visitGuid: string) {
    this.selectedVisitGuid = visitGuid;
    console.log("selected visit guid: " + this.selectedVisitGuid);
    this._clientService.getVisitDetails(parseInt(this.selectedVisitGuid)).subscribe(
      data => {
        this.clientDetails = data;
        if (this.clientDetails.length > 0) {
          this.clientDetail = this.clientDetails[0];
          console.log("client name: " + this.clientDetail.clientName);
        } else {
          console.log("No client details received");
        }
        
        // Update the shared data service with the new selectedVisitGuid
        this.sharedDataService.changeData(this.selectedVisitGuid);
      },
      error => {
        console.error("Error fetching client details:", error);
      }
    );
  }
  ResetVisit()
  {
    this._visitService.ResetVisit(this.selectedVisitGuid,this.currentDateTime).subscribe({
     next: (response) => {
       // Handle the response if needed
     },
     error: (error) => {
       console.error('Error resetting visit:', error);
     },
     complete: () => {
       this.showDoneToast();
     }
   });
  }

  formatDateTimeLocal(date: Date): string {
    const ten = (i: number) => (i < 10 ? '0' : '') + i;
    const YYYY = date.getFullYear();
    const MM = ten(date.getMonth() + 1);
    const DD = ten(date.getDate());
    const HH = ten(date.getHours());
    const mm = ten(date.getMinutes());
    return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
  }
  showDoneToast() {
    const toastEl = document.getElementById('doneToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}
