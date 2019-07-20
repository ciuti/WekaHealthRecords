import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'app works!';
  private authenitcated  = false;
  private loggedIn = false;

  private myRecords;
  private myDoctors;

  private signUp = {
    email: '',
    firstName: '',
    lastName: '',
    bloodGroup: '',
    Height: '',
    Weight: '',
    phoneNo: '',
    dob: '',
    address: '',
    nextofKin: '',
    authorizedProviders: ''
  };
  ngOnInit() {
   /* this.route
      .queryParams
      .subscribe((queryParams) => {
        const loggedIn = queryParams['loggedIn'];
        if (loggedIn) {
          this.authenticated = true;
          return this.router.navigate(['/'])
            .then(() => {
              return this.checkWallet();
            });
        }
      });
  }
*/
}
}
/*
  ngAfterViewInit() {
    $('.nav a').on('click', function(){
      $('.nav').find('.active').removeClass('active');
      $(this).parent().addClass('active');
    });

    $('.dropdown').on('show.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('.dropdown').on('hide.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });

    $('.dropdown-menu li').on('click', function(){
      $(this).parent().parent().addClass('active');
    });
  }
}
*/