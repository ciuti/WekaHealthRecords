import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecordService } from './Record.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-record',
  templateUrl: './Record.component.html',
  styleUrls: ['./Record.component.css'],
  providers: [RecordService]
})
export class RecordComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  recordId = new FormControl('', Validators.required);
  patientname = new FormControl('', Validators.required);
  doctorId = new FormControl('', Validators.required);
  times = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  medication = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceRecord: RecordService, fb: FormBuilder) {
    this.myForm = fb.group({
      recordId: this.recordId,
      patientname: this.patientname,
      doctorId: this.doctorId,
      times: this.times,
      description: this.description,
      medication: this.medication,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceRecord.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.healthrecords.network.Record',
      'recordId': this.recordId.value,
      'patientname': this.patientname.value,
      'doctorId': this.doctorId.value,
      'times': this.times.value,
      'description': this.description.value,
      'medication': this.medication.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'recordId': null,
      'patientname': null,
      'doctorId': null,
      'times': null,
      'description': null,
      'medication': null,
      'owner': null
    });

    return this.serviceRecord.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'recordId': null,
        'patientname': null,
        'doctorId': null,
        'times': null,
        'description': null,
        'medication': null,
        'owner': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.healthrecords.network.Record',
      'patientname': this.patientname.value,
      'doctorId': this.doctorId.value,
      'times': this.times.value,
      'description': this.description.value,
      'medication': this.medication.value,
      'owner': this.owner.value
    };

    return this.serviceRecord.updateAsset(form.get('recordId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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


  deleteAsset(): Promise<any> {

    return this.serviceRecord.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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

    return this.serviceRecord.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'recordId': null,
        'patientname': null,
        'doctorId': null,
        'times': null,
        'description': null,
        'medication': null,
        'owner': null
      };

      if (result.recordId) {
        formObject.recordId = result.recordId;
      } else {
        formObject.recordId = null;
      }

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

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
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
      'recordId': null,
      'patientname': null,
      'doctorId': null,
      'times': null,
      'description': null,
      'medication': null,
      'owner': null
      });
  }

}
