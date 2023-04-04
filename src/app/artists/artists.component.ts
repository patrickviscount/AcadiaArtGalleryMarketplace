import { Component, Input, OnInit } from '@angular/core';
import { ArtService } from '../art.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
})
export class ArtistsComponent implements OnInit {
  artistsData: any;
  constructor(private artistService: ArtService) {}

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists() {
    this.artistService.getArtists().subscribe(
      (data) => {
        console.log('artistData', this.artistsData);
        this.artistsData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
