import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CreateRecordService } from './CreateRecord.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-createrecord',
  templateUrl: './CreateRecord.component.html',
  styleUrls: ['./CreateRecord.component.css'],
  providers: [CreateRecordService]
})
export class CreateRecordComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  patientname = new FormControl('', Validators.required);
  doctorId = new FormControl('', Validators.required);
  times = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  medication = new FormControl('', Validators.required);
  patient = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);
  
  //const currentpatient = ;

  constructor(private serviceCreateRecord: CreateRecordService, fb: FormBuilder) {
    this.myForm = fb.group({
      patientname: this.patientname,
      doctorId: this.doctorId,
      times: this.times,
      description: this.description,
      medication: this.medication,
      patient: "resource:org.healthrecords.network.patient#hosdfsfdsf",
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCreateRecord.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.healthrecords.network.CreateRecord',
      'patientname': this.patientname.value,
      'doctorId': this.doctorId.value,
      'times': this.times.value,
      'description': this.description.value,
      'medication': this.medication.value,
      'patient': "resource:org.healthrecords.network.patient#hosdfsfdsf",
      'transactionId': this.transactionId.value,
      //'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'patientname': null,
      'doctorId': null,
      'times': null,
      'description': null,
      'medication': null,
      'patient': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceCreateRecord.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'patientname': null,
        'doctorId': null,
        'times': null,
        'description': null,
        'medication': null,
        'patient': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.healthrecords.network.CreateRecord',
      'patientname': this.patientname.value,
      'doctorId': this.doctorId.value,
      'times': this.times.value,
      'description': this.description.value,
      'medication': this.medication.value,
      'patient': "resource:org.healthrecords.network.patient#hosdfsfdsf",
      'timestamp': this.timestamp.value
    };

    return this.serviceCreateRecord.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  deleteTransaction(): Promise<any> {

    return this.serviceCreateRecord.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceCreateRecord.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'patientname': null,
        'doctorId': null,
        'times': null,
        'description': null,
        'medication': null,
        'patient': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.patientname) {
        formObject.patientname = result.patientname;
      } else {
        formObject.patientname = null;
      }

      if (result.doctorId) {
        formObject.doctorId = result.doctorId;
      } else {
        formObject.doctorId = null;
      }

      if (result.times) {
        formObject.times = result.times;
      } else {
        formObject.times = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.medication) {
        formObject.medication = result.medication;
      } else {
        formObject.medication = null;
      }

      if (result.patient) {
        formObject.patient = result.patient;
      } else {
        formObject.patient = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'patientname': null,
      'doctorId': null,
      'times': null,
      'description': null,
      'medication': null,
      'patient': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
