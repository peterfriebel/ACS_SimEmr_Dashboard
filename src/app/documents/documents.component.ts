import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDocuments } from 'src/Documents';
import { DocumentService } from '../document.service';
import { SharedDataService } from 'src/shared-data.service';
import { Subscription } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  value: string = '';
  documents: IDocuments[] = [];
  private subscription: Subscription | undefined;
 
  constructor(
    private route: ActivatedRoute,
    private _documentService: DocumentService,
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadDocuments(): void {
    if (this.value) {
      this._documentService.getDocuments(parseInt(this.value)).subscribe(
        data => this.documents = data,
        error => console.error("Error fetching documents:", error)
      );
    }
  }

  SetDocumentDtm(docGuid: number, docDtm: string): void {
    this._documentService.setDate(docGuid, docDtm).subscribe({
      next: (response) => {
        // Handle the response if needed
      },
      error: (error) => {
        console.error('Error setting document:', error);
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
    this.loadDocuments();
  }
}
