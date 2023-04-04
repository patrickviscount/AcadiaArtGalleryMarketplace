import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ArtService } from './art.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private service: ArtService, private router: Router) {}

  logIn(username: any, password: any) {
    sessionStorage.setItem('loggedIn', 'false');
    sessionStorage.setItem('manager', 'false');
    this.service.getCheckUser(username, password).subscribe((data) => {
      console.log(data);
      if (data) {
        console.log('sucessfull Login');
        sessionStorage.setItem('loggedIn', 'true');
        
        if (data.role_name.toUpperCase() === 'MANAGER') {
          sessionStorage.setItem('manager', 'true');
          this.router.navigate(['./add']);
        }
        else{
          this.router.navigate(['./artists']);
        }
      }
      else {
        alert('Wrong user and Password Combination');
      }
      (error: any) => {
        console.log(error);
      };
    });
  }

  isManager(){
    return sessionStorage.getItem('manager') === 'true';
  }

  isLoggedIn(){
    return sessionStorage.getItem('loggedIn') === 'true';
  }

  logout() {
    sessionStorage.setItem('loggedIn', 'false');
    sessionStorage.setItem('manager', 'false');
    this.router.navigate(['./login']);
  }
}
