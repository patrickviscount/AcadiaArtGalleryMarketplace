import { Component, OnInit } from '@angular/core';
import { ArtService } from 'src/app/art.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
})
export class ArtistListComponent implements OnInit {
  constructor(private artistService: ArtService) {}
  ngOnInit() {
    console.log(this.artistService.getArtist(2));
  }
}
