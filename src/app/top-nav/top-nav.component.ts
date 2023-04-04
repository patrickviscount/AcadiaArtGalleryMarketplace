import { Component, OnInit } from '@angular/core';
import { ArtService } from '../art.service';
import { AuthGuardGuard } from '../auth-guard.guard';
import { UserService } from '../user-service.service';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  artistsData: any;
  constructor(
    private artistService: ArtService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getArtists();
  }

  isManager() {
    return this.userService.isManager();
  }
  getArtists() {
    this.artistService.getArtists().subscribe(
      (data) => {
        this.artistsData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  logout(){
    this.userService.logout();
  }
}
