import { Component, OnInit } from '@angular/core';
import { ArtService } from 'src/app/art.service';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css'],
})
export class AddArtistComponent implements OnInit {
  artistsData: any;
  artworksData: any;
  artworksImage: any;
  artist_id = '';
  artistDel: any;
  fname = '';
  lname = '';
  email = '';
  date_of_birth = '';
  date_of_death = '';
  nationality = '';
  preferred_artistic_medium = '';
  description = '';
  editFName = null;
  editLName = null;
  editEmail = null;
  editDate_of_birth = null;
  editDate_of_death = null;
  editNationality = null;
  editPreferred_artistic_medium = null;
  editDescription = null;

  artistSubmitted = false;
  artistUpdated = false;
  constructor(private artistService: ArtService) {}

  ngOnInit(): void {
    this.getArtists();
    this.getArtWorks();
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  saveArtistCheck() {
    let currentDate = this.formatDate(new Date());
    let checkDate = "2022-12-31";
    console.log(currentDate);
    console.log(this.date_of_birth);
    if (this.fname == '') {
      alert('Error: Artist first name is required');
    } else if (this.lname == '') {
      alert('Error: Artist last name is required');
    } else if (this.email.includes('@') == false) {
      alert('Error: Valid email addresses must contain character @');
    } else if (this.date_of_birth >= checkDate || this.date_of_death >= checkDate) {
      alert(
        "Error: Artist date of birth/date of death cannot be greater than, or equal to, 2022-12-31"
      );
    } else {
      this.saveArtist();
    }
  }
  saveArtist(): void {
    const data = {
      artist_id: this.artist_id,
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      date_of_birth: this.date_of_birth,
      date_of_death: this.date_of_death,
      nationality: this.nationality,
      preferred_artistic_medium: this.preferred_artistic_medium,
      description: this.description,
    };

    this.artistService.createArtist(data).subscribe(
      (response) => {
        console.log(response);
        this.artistSubmitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateArtist(): void {
    let artID = (<HTMLInputElement>document.getElementById('editArtist')).value;
    var split = artID.split(':', 2);
    artID = split[0];
    const data = {
      artist_id: artID,
      fname: this.editFName,
      lname: this.editLName,
      email: this.editEmail,
      date_of_birth: this.editDate_of_birth,
      date_of_death: this.editDate_of_death,
      nationality: this.editNationality,
      preferred_artistic_medium: this.editPreferred_artistic_medium,
      description: this.editDescription,
    };
    console.log(data);
    this.artistService.updateArtist(data).subscribe(
      (response) => {
        console.log(response);
        this.artistUpdated = true;
      },
      (error) => {
        console.log(error);
      }
    );
    alert('Artist Updated!');
    location.reload();
  }

  newArtist(): void {
    this.artistSubmitted = false;
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

  getArtWorks() {
    this.artistService.getArtWorks().subscribe(
      (data) => {
        this.artworksData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getArtistArtworks(artistId: any) {
    this.artistService.getArtWorkByArtistId(artistId).subscribe(
      (data) => {
        this.artworksData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteArtist(artistId: any): void {
    this.artistService.deleteArtist(artistId).subscribe(
      (data) => {
        data;
      },
      (error) => {
        console.log(error);
      }
    );
    alert('Artist Deleted!');
    location.reload();
  }

  deleteArtwork(artworkId: any): void {
    this.artistService.deleteArtwork(artworkId).subscribe(
      (data) => {
        data;
      },
      (error) => {
        console.log(error);
      }
    );
    alert('Artwork Deleted!');
    location.reload();
  }

  delArtist() {
    let val = (<HTMLInputElement>document.getElementById('delArtist')).value;
    var split = val.split(':', 2);
    let artistID = split[0];
    if (artistID.length > 0) {
      this.deleteArtist(artistID);
    } else {
      alert('No Artist Selected!');
    }
  }
  delArtwork() {
    let val = (<HTMLInputElement>document.getElementById('delArtwork')).value;
    var split = val.split(':', 2);
    let artworkID = split[0];
    if (artworkID.length > 0) {
      this.deleteArtwork(artworkID);
    } else {
      alert('No Artwork Selected!');
    }
  }

  mailto() {
    let artTitle = (<HTMLInputElement>document.getElementById('artTitle'))
      .value;
    let artPrice = (<HTMLInputElement>document.getElementById('artPrice'))
      .value;
    window.location.href =
      "mailto:curationteam@artgallery.com?subject=Artwork Addition Request&body=Hello, Curation Team!%0D%0A I am interested in adding a new work titled '" +
      artTitle +
      "' to the COMP3753 Art Gallery for a price of $" +
      artPrice +
      '. I look forward to hearing from you in regards to this addition, thank you.';
    console.log(artTitle);
    console.log(artPrice);
  }
  editArtistCheck() {
    let currentDate = this.formatDate(new Date());
    console.log(currentDate);
    console.log(this.date_of_birth);
    if (this.email != '' && this.email.includes('@') == false) {
      alert('Error: Valid email addresses must contain character @');
    } else if (this.date_of_birth >= currentDate) {
      alert(
        "Error: Artist date of birth cannot be greater than, or equal to, today's date"
      );
    } else if (this.date_of_death >= currentDate) {
      alert(
        "Error: Artist date of death cannot be greater than, or equal to, today's date"
      );
    } else {
      this.updateArtist();
    }
  }

  onChange(event: any) {
    let artist = this.artistsData.find(
      (a: any) => a.artist_id == event.target.value
    );
    console.log(artist);
    this.editFName = artist.fname;
    this.editLName = artist.lname;
    this.editEmail = artist.email;
    this.editDate_of_birth = artist.date_of_birth;
    this.editDate_of_death = artist.date_of_death;
    this.editNationality = artist.nationality;
    this.editPreferred_artistic_medium = artist.preferred_artistic_medium;
    this.editDescription = artist.description;
  }
}
