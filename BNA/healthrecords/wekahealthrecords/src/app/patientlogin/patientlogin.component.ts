import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patientlogin',
  templateUrl: './patientlogin.component.html',
  styleUrls: ['./patientlogin.component.css']
})
export class PatientloginComponent implements OnInit {patientSignupForm: FormGroup;
  providerData: any;
  identityData: any;
  networkIdentity: any;
  loginForm: FormGroup;
  loginData: any;
  loggedin: boolean;
  userAction = true;
  networkExtension = '@healthrecords';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupService: SignupService,
    private data: CommonService) {

    // Defining the signup form
    this.patientSignupForm = this.fb.group({
      firstName: [],
      lastName: [],
      email: [],
      phoneNo: [],
      specialization:[],
      
      
    });


        // Defining login form
    this.loginForm = this.fb.group({
      email: [],
      password: []
    });
  }

  toggleUserAction() {
    this.userAction = !this.userAction;
  }


  onLogin() {
    // get Login Credentials
    this.loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // Login User
    const hit = true;
    if (hit) {
      this.signupService.setCardAsDefault(this.loginData.email + this.networkExtension)
      .then((res) => {
        console.log(res);
        this.loggedin = true;
        this.data.changeMessage(this.loginData.email);
        this.router.navigate(['/provider']);
      });
    }
  }


  onSignup() {

    this.providerData = {
      "$class": "org.healthrecords.network.Doctor",
      "doctorId": this.patientSignupForm.value.email,
      "firstName": this.patientSignupForm.value.firstName,
      "lastName": this.patientSignupForm.value.lastName,
      "phoneNo": this.patientSignupForm.value.phoneNo,
      "emailAddress": this.patientSignupForm.value.email,
      "hospital": {
        "$class": "org.healthrecords.network.Hospital",
        "Name": this.patientSignupForm.value.hospitalname,
        "address": {
          "$class": "org.healthrecords.network.Address",
          "street": this.patientSignupForm.value.hospitalstreet,
          "town": this.patientSignupForm.value.hospitaltown,
          "country": "Kenya"
        },
        "emailAddress": ""
      },
      "specialization": this.patientSignupForm.value.specialization
    };
    

    this.identityData = {
      participant: 'org.jphr.network.CareProvider#' + this.providerData.email,
      userID: this.providerData.email,
      options: {}
    };

    this.signupService.signUp(this.providerData, this.identityData, 'Doctor')
    .then(() => {
      this.signupService.getCurrentUser()
      .then(() => {
        this.signupService.setCardAsDefault(this.providerData.email + this.networkExtension);
        this.userAction = true;
      });
    });
  }


  ngOnInit() {
  }

}
