import { Component, EventEmitter, Output } from '@angular/core';
import { IVisits } from '../../visits';
import { VisitService } from '../visit.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent {
  
  public visitGuid: any = 'default';
  clientVisits: IVisits[] = [];

  @Output() visitSelected = new EventEmitter<string>();

  constructor(private _visitService: VisitService)
  {
    this._visitService.getAllSimVisits().subscribe(data => this.clientVisits = data);
  }

   VisitSelected()
   {
    this.visitSelected.emit(this.visitGuid);   
   }

}
