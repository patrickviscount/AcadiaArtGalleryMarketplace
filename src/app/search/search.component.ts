import { Component, OnInit, NgModule } from '@angular/core';
import { ArtService } from '../art.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  artistsData: any;
  artistsFilteredData: any;
  constructor(private artistService: ArtService) {}
  artistFName = '';
  artistLName = '';
  medium = '';
  nation = '';
  ngOnInit(): void {
    this.onClickMe();
    this.getArtists();
  }
  onClickMe() {
    this.artistFName = (<HTMLInputElement>(
      document.getElementById('fname')
    )).value;
    this.artistLName = (<HTMLInputElement>(
      document.getElementById('lname')
    )).value;
    this.medium = (<HTMLInputElement>document.getElementById('medium')).value;
    this.nation = (<HTMLInputElement>document.getElementById('nation')).value;
    this.getFilteredArtists();
  }

  getFilteredArtists() {
    this.artistService.getArtists().subscribe(
      (data) => {
        this.artistsFilteredData = data.filter((artist: any) => {
          if (
            (artist.fname === this.artistFName || this.artistFName === '') &&
            (artist.lname === this.artistLName || this.artistLName === '') &&
            (artist.art_medium === this.medium || this.medium === 'Any') &&
            (artist.nationality === this.nation || this.nation === 'Any')
          ) {
            return true;
          }
          return false;
        });
        console.log('artistsFilteredData', this.artistsFilteredData);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getArtists() {
    this.artistService.getArtists().subscribe(
      (data) => {
        console.log(data);
        this.artistsData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
