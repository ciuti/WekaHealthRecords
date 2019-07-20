
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { RecordComponent } from './Record/Record.component';
import { RequestComponent } from './Request/Request.component';

import { PatientComponent } from './Patient/Patient.component';
import { DoctorComponent } from './Doctor/Doctor.component';

import { CreateRecordComponent } from './CreateRecord/CreateRecord.component';
import { CreateRequestComponent } from './CreateRequest/CreateRequest.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Record', component: RecordComponent },
  { path: 'Request', component: RequestComponent },
  { path: 'Patient', component: PatientComponent },
  { path: 'Doctor', component: DoctorComponent },
  { path: 'CreateRecord', component: CreateRecordComponent },
  { path: 'CreateRequest', component: CreateRequestComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
