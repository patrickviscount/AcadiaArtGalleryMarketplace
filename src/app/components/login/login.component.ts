import { Component, Input, OnInit } from '@angular/core';
import { ArtService } from 'src/app/art.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardGuard } from 'src/app/auth-guard.guard';
import { UserService } from 'src/app/user-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService) {}
  user: any;
  userCheck: any;
  username = '';
  password = '';
  checkSubmitted = false;

  login() {
    this.userService.logIn(this.username, this.password);
  }
}
