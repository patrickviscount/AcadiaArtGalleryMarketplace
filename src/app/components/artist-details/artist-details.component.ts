import { Component, OnInit } from '@angular/core';
import { ArtService } from 'src/app/art.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css'],
})
export class ArtistDetailsComponent implements OnInit {
  currentArtist: any;
  artworkData: any;

  constructor(
    private artistService: ArtService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getArtist(this.route.snapshot.paramMap.get('id'));
    // this.getArtWork(this.route.snapshot.paramMap.get('id'));
  }

  getArtist(id: any): void {
    this.artistService.getArtist(id).subscribe(
      (data) => {
        this.currentArtist = data;
        console.log('get artist', data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getArtWork(id: any): void {
    this.artistService.getArtWork(id).subscribe(
      (data) => {
        this.artworkData = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
