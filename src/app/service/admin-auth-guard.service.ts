import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { map  } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authService:AuthService,
    private userService:UserService
  ) { }

  canActivate():Observable<boolean>{
    // this.authService.user$
    //   .pipe(map(user=>{
    //     return this.userService.get(user.uid)
    //   }))
    //   .subscribe(x=>console.log(x));

    //switchmap switch new observable
    return this.authService.appUser$
      .pipe(
        map(appUser => appUser.isAdmin)
      )
  }
}
