import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { AppUser } from 'src/app/model/app-user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  appUser:AppUser;

  constructor(
    private auth: AuthService
  ) {
    auth.appUser$.subscribe(x=>this.appUser = x);
    // auth.user$.subscribe(x=>console.log(x.photoURL));
    //  afAuth.authState.subscribe(x=>this.user = x);
  }

  logout(){
    this.auth.logout();
  }
  

}
