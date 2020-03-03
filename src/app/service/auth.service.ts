import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, pipe, from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from '../model/app-user';
import { switchMap } from 'rxjs/operators'
import { UserService } from './user.service';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(x=>localStorage.setItem('uid',x.uid))
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(d=>console.log(d));
  }

  logout() {
    localStorage.removeItem('uid');
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.
      pipe(switchMap(user => {
        if(user){
          return this.userService.get(user.uid).valueChanges()
        } 
        // return null;
        return of(null);  
      }))
  }

}
