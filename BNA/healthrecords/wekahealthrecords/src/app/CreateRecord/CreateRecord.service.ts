

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { CreateRecord } from '../org.healthrecords.network';
import { Patient } from '../org.healthrecords.network';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CreateRecordService {

  

  private NAMESPACE = 'CreateRecord';

  constructor(private dataService: DataService<CreateRecord>) {
  };

  public getAll(): Observable<CreateRecord[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<CreateRecord> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<CreateRecord> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<CreateRecord> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<CreateRecord> {
    return this.dataService.delete(this.NAMESPACE, id);
  }
  /**
   * getpatient
   */
  public getpatient(patientID:any) {
    return ;
    
  }

}

