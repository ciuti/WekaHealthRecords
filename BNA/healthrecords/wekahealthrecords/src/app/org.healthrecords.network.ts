import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.healthrecords.network{
   export class Address {
      street: string;
      town: string;
      country: string;
   }
   export class NextofKin {
      firstName: string;
      lastName: string;
      phoneNumber: number;
      emailAddress: string;
   }
   export class Hospital {
      Name: string;
      address: Address;
      level: number;
      emailAddress: string;
   }
   export enum RequestStatus {
      ALLOWED,
      DENIED,
      PENDING,
   }
   export class Record extends Asset {
      recordId: string;
      patientname: string;
      doctorId: string;
      times: number;
      description: string;
      medication: string[];
      owner: Patient;
   }
   export class Request extends Asset {
      requestID: string;
      patientemail: string;
      doctoremail: string;
      status: RequestStatus;
      owner: Doctor;
   }
   export class Patient extends Participant {
      email: string;
      firstName: string;
      lastName: string;
      bloodGroup: string;
      Height: number;
      Weight: number;
      phoneNo: string;
      dob: string;
      address: Address;
      nextofKin: NextofKin;
      authorizedProviders: string[];
   }
   export class Doctor extends Participant {
      doctorId: string;
      firstName: string;
      lastName: string;
      phoneNo: number;
      emailAddress: string;
      hospital: Hospital;
      specialization: string;
   }
   export class CreateRecord extends Transaction {
      patientname: string;
      doctorId: string;
      times: number;
      description: string;
      medication: string[];
      patient: Patient;
   }
   export class CreateRecordEvent extends Event {
      patientname: string;
      doctorId: string;
      times: number;
      description: string;
      medication: string[];
   }
   export class CreateRequest extends Transaction {
      patientemail: string;
      doctoremail: string;
      status: RequestStatus;
      doctor: Doctor;
   }
   export class CreateRequestEvent extends Event {
      patientemail: string;
      doctoremail: string;
      status: RequestStatus;
   }
// }
